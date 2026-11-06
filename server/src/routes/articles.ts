import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Types } from 'mongoose';
import { Article } from '../models/Article.js';
import { Category } from '../models/Category.js';
import { Topic } from '../models/Topic.js';
import { Tag } from '../models/Tag.js';
import { ArticleVersion } from '../models/ArticleVersion.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { validate } from '../middleware/validate.js';
import { generateSlug, ensureUniqueSlug } from '../utils/slug.js';
import { calculateReadingTime } from '../utils/readingTime.js';
import { logActivity } from '../utils/activityLogger.js';
import { resolveOrCreateTags } from '../utils/tagResolver.js';

const router = Router();

const CreateArticleSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().optional(),
  description: z.string().min(1).max(1000),
  content: z.string().min(1),
  contentType: z
    .enum(['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'])
    .default('article'),
  category: z.string().optional(),
  topics: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  author: z.string().default('Unknown'),
  sourceUrl: z.string().url().optional().or(z.literal('')),
  references: z.array(z.string()).default([]),
  featuredImage: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'published']).default('published'),
});

const UpdateArticleSchema = CreateArticleSchema.partial();

// Helper: build populated article query
const populateArticle = (query: ReturnType<typeof Article.findOne>) =>
  query
    .populate('categoryId', 'name slug color')
    .populate('topicIds', 'name slug status')
    .populate('tagIds', 'name displayName');

// Helper: resolve category
const resolveCategory = async (categoryName: string | undefined): Promise<Types.ObjectId | null> => {
  if (!categoryName) return null;
  let category = await Category.findOne({
    slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
  });
  if (!category) {
    category = await Category.findOne({ name: new RegExp(`^${categoryName}$`, 'i') });
  }
  return category ? (category._id as Types.ObjectId) : null;
};

// Helper: resolve topics
const resolveTopics = async (topicNames: string[]): Promise<Types.ObjectId[]> => {
  const ids: Types.ObjectId[] = [];
  for (const name of topicNames) {
    const topic = await Topic.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (topic) ids.push(topic._id as Types.ObjectId);
  }
  return ids;
};

// GET /articles — list articles
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const {
      page = '1',
      limit = '20',
      search,
      category,
      topic,
      tag,
      contentType,
      author,
      status,
      isRead,
      sortBy = 'publishedAt',
      sortOrder = 'desc',
      dateFrom,
      dateTo,
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, unknown> = { deletedAt: null };

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { author: regex },
        { content: regex },
      ];
    }
    if (category) {
      const cat = await Category.findOne({ $or: [{ slug: category }, { name: new RegExp(`^${category}$`, 'i') }] });
      if (cat) filter.categoryId = cat._id;
    }
    if (topic) {
      const top = await Topic.findOne({ $or: [{ slug: topic }, { name: new RegExp(`^${topic}$`, 'i') }] });
      if (top) filter.topicIds = top._id;
    }
    if (tag) {
      const t = await Tag.findOne({ name: tag.toLowerCase() });
      if (t) filter.tagIds = t._id;
    }
    if (contentType) filter.contentType = contentType;
    if (author) filter.author = new RegExp(author, 'i');
    if (status) filter.status = status;
    if (isRead !== undefined) filter.isRead = isRead === 'true';
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, Date> = {};
      if (dateFrom) dateFilter.$gte = new Date(dateFrom);
      if (dateTo) dateFilter.$lte = new Date(dateTo);
      filter.publishedAt = dateFilter;
    }

    const sortField = ['publishedAt', 'createdAt', 'updatedAt', 'title'].includes(sortBy) ? sortBy : 'publishedAt';
    const sortDir = sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, number> = { [sortField]: sortDir };

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort(sort as any)
        .skip(skip)
        .limit(limitNum)
        .populate('categoryId', 'name slug color')
        .populate('topicIds', 'name slug')
        .populate('tagIds', 'name displayName')
        .lean(),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  })
);

// GET /articles/stats — dashboard statistics
router.get(
  '/stats',
  asyncHandler(async (_req: Request, res: Response) => {
    const [
      total,
      unread,
      read,
      published,
      draft,
      recentCount,
      topics,
      categories,
      authors,
    ] = await Promise.all([
      Article.countDocuments({ deletedAt: null }),
      Article.countDocuments({ deletedAt: null, isRead: false, status: 'published' }),
      Article.countDocuments({ deletedAt: null, isRead: true, status: 'published' }),
      Article.countDocuments({ deletedAt: null, status: 'published' }),
      Article.countDocuments({ deletedAt: null, status: 'draft' }),
      Article.countDocuments({
        deletedAt: null,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
      Topic.countDocuments(),
      Category.countDocuments(),
      Article.distinct('author', { deletedAt: null }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        unread,
        read,
        published,
        draft,
        recentCount,
        topics,
        categories,
        contributors: authors.length,
      },
    });
  })
);

// GET /articles/trash — soft-deleted articles
router.get(
  '/trash',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '20' } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter = { deletedAt: { $ne: null } };
    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort({ deletedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('categoryId', 'name slug color')
        .lean(),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: articles,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  })
);

// GET /articles/:id — single article
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const article = await populateArticle(Article.findById(req.params.id));
    if (!article) throw createError('Article not found', 404);
    res.json({ success: true, data: article });
  })
);

// GET /articles/:id/versions — version history
router.get(
  '/:id/versions',
  asyncHandler(async (req: Request, res: Response) => {
    const versions = await ArticleVersion.find({ articleId: req.params.id })
      .sort({ version: -1 })
      .select('-content')
      .lean();
    res.json({ success: true, data: versions });
  })
);

// GET /articles/:id/related — related articles by shared tags/topics
router.get(
  '/:id/related',
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findById(req.params.id);
    if (!article) throw createError('Article not found', 404);

    const related = await Article.find({
      _id: { $ne: article._id },
      deletedAt: null,
      status: 'published',
      $or: [
        { tagIds: { $in: article.tagIds } },
        { topicIds: { $in: article.topicIds } },
        { categoryId: article.categoryId },
      ],
    })
      .limit(6)
      .populate('categoryId', 'name slug color')
      .populate('tagIds', 'name displayName')
      .lean();

    res.json({ success: true, data: related });
  })
);

// POST /articles — create article
router.post(
  '/',
  apiKeyMiddleware,
  validate(CreateArticleSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const baseSlug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);
    const slug = await ensureUniqueSlug(baseSlug);

    const categoryId = await resolveCategory(data.category);
    const topicIds = await resolveTopics(data.topics || []);
    const tagIds = await resolveOrCreateTags(data.tags || []);
    const readingTime = calculateReadingTime(data.content);

    const article = await Article.create({
      ...data,
      slug,
      categoryId,
      topicIds,
      tagIds,
      readingTime,
      publishedAt: data.status === 'published' ? new Date() : undefined,
    });

    await logActivity({
      action: 'article.created',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: data.author || 'user',
    });

    const populated = await populateArticle(Article.findById(article._id));
    res.status(201).json({ success: true, data: populated });
  })
);

// PATCH /articles/:id — update article
router.patch(
  '/:id',
  apiKeyMiddleware,
  validate(UpdateArticleSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOne({ _id: req.params.id, deletedAt: null });
    if (!article) throw createError('Article not found', 404);

    // Save version snapshot before updating
    const versionCount = await ArticleVersion.countDocuments({ articleId: article._id });
    if (versionCount >= 20) {
      const oldest = await ArticleVersion.findOne({ articleId: article._id }).sort({ version: 1 });
      if (oldest) await ArticleVersion.deleteOne({ _id: oldest._id });
    }
    await ArticleVersion.create({
      articleId: article._id,
      version: versionCount + 1,
      title: article.title,
      description: article.description,
      content: article.content,
      contentType: article.contentType,
      categoryId: article.categoryId,
      topicIds: article.topicIds,
      tagIds: article.tagIds,
      author: article.author,
      editedBy: req.body.editedBy || 'user',
    });

    const data = req.body;
    if (data.category !== undefined) {
      (data as Record<string, unknown>).categoryId = await resolveCategory(data.category);
      delete data.category;
    }
    if (data.topics !== undefined) {
      (data as Record<string, unknown>).topicIds = await resolveTopics(data.topics);
      delete data.topics;
    }
    if (data.tags !== undefined) {
      (data as Record<string, unknown>).tagIds = await resolveOrCreateTags(data.tags);
      delete data.tags;
    }
    if (data.content) {
      data.readingTime = calculateReadingTime(data.content);
    }
    if (data.status === 'published' && article.status === 'draft') {
      data.publishedAt = new Date();
    }

    const updated = (await populateArticle(
      Article.findByIdAndUpdate(req.params.id, { $set: data }, { new: true }) as any
    )) as any;

    await logActivity({
      action: 'article.updated',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: updated?.title || article.title,
      actor: req.body.editedBy || 'user',
    });

    res.json({ success: true, data: updated });
  })
);

// PATCH /articles/:id/read-status
router.patch(
  '/:id/read-status',
  asyncHandler(async (req: Request, res: Response) => {
    const { isRead } = req.body;
    if (typeof isRead !== 'boolean') {
      throw createError('isRead must be a boolean', 400);
    }

    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { $set: { isRead } },
      { new: true }
    );
    if (!article) throw createError('Article not found', 404);

    await logActivity({
      action: isRead ? 'article.read' : 'article.unread',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: 'user',
    });

    res.json({ success: true, data: { isRead: article.isRead } });
  })
);

// DELETE /articles/:id — soft delete
router.delete(
  '/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    if (!article) throw createError('Article not found', 404);

    await logActivity({
      action: 'article.deleted',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: 'user',
    });

    res.json({ success: true, message: 'Article moved to trash' });
  })
);

// POST /articles/:id/restore — restore from trash
router.post(
  '/:id/restore',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { $set: { deletedAt: null } },
      { new: true }
    );
    if (!article) throw createError('Article not found in trash', 404);

    await logActivity({
      action: 'article.restored',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: 'user',
    });

    res.json({ success: true, message: 'Article restored', data: article });
  })
);

// DELETE /articles/:id/permanent — permanent delete
router.delete(
  '/:id/permanent',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOneAndDelete({ _id: req.params.id, deletedAt: { $ne: null } });
    if (!article) throw createError('Article not found in trash', 404);

    // Also delete versions
    await ArticleVersion.deleteMany({ articleId: req.params.id });

    await logActivity({
      action: 'article.permanently_deleted',
      entityType: 'article',
      entityId: req.params.id,
      entityTitle: article.title,
      actor: 'user',
    });

    res.json({ success: true, message: 'Article permanently deleted' });
  })
);

// POST /articles/bulk-read — bulk read status update
router.post(
  '/bulk-read',
  asyncHandler(async (req: Request, res: Response) => {
    const { ids, isRead } = req.body;
    if (!Array.isArray(ids) || typeof isRead !== 'boolean') {
      throw createError('ids (array) and isRead (boolean) are required', 400);
    }

    await Article.updateMany(
      { _id: { $in: ids }, deletedAt: null },
      { $set: { isRead } }
    );

    res.json({ success: true, message: `Marked ${ids.length} articles as ${isRead ? 'read' : 'unread'}` });
  })
);

export default router;

