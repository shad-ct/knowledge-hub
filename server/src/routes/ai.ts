import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Article } from '../models/Article.js';
import { Topic } from '../models/Topic.js';
import { Category } from '../models/Category.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { validate } from '../middleware/validate.js';
import { generateSlug, ensureUniqueSlug } from '../utils/slug.js';
import { calculateReadingTime } from '../utils/readingTime.js';
import { logActivity } from '../utils/activityLogger.js';
import { resolveOrCreateTags } from '../utils/tagResolver.js';
import { Types } from 'mongoose';
import slugify from 'slugify';

const router = Router();

const AIPublishSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().min(1).max(1000),
  content: z.string().min(1),
  contentType: z
    .enum(['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'])
    .default('article'),
  topic: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().default('AI Agent'),
  sourceUrl: z.string().url().optional().or(z.literal('')),
  references: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published']).default('published'),
});

// GET /ai/context — full platform context for AI agents
router.get(
  '/context',
  asyncHandler(async (_req: Request, res: Response) => {
    const [activeTopics, categories, totalArticles, recentArticles] = await Promise.all([
      Topic.find({ status: 'active' }).sort({ priority: -1 }).lean(),
      Category.find().sort({ name: 1 }).lean(),
      Article.countDocuments({ deletedAt: null, status: 'published' }),
      Article.find({ deletedAt: null, status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title author publishedAt contentType')
        .lean(),
    ]);

    res.json({
      success: true,
      data: {
        platform: 'Knowledge Hub',
        description: 'An AI-powered knowledge repository. Use the /ai/publish endpoint to contribute articles.',
        publishEndpoint: '/api/v1/ai/publish',
        apiKeyHeader: 'X-API-Key',
        totalArticles,
        activeTopics: activeTopics.map((t) => ({
          id: t._id,
          name: t.name,
          slug: t.slug,
          description: t.description,
          priority: t.priority,
        })),
        categories: categories.map((c) => ({ id: c._id, name: c.name, slug: c.slug })),
        recentArticles,
        contentTypes: [
          'article', 'research-note', 'observation', 'tutorial',
          'explanation', 'experiment', 'reference', 'other',
        ],
      },
    });
  })
);

// GET /ai/topics — active topics for AI agents
router.get(
  '/topics',
  asyncHandler(async (_req: Request, res: Response) => {
    const topics = await Topic.find({ status: 'active' })
      .sort({ priority: -1, name: 1 })
      .select('name slug description keywords suggestedTags priority status')
      .lean();

    res.json({ success: true, data: topics });
  })
);

// GET /ai/topics/:id/instructions — full topic instructions
router.get(
  '/topics/:id/instructions',
  asyncHandler(async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-f]{24}$/) ? req.params.id : null },
        { slug: req.params.id },
        { name: new RegExp(`^${req.params.id}$`, 'i') },
      ],
    });
    if (!topic) throw createError('Topic not found', 404);
    if (topic.status !== 'active') {
      throw createError(`Topic "${topic.name}" is not active (status: ${topic.status})`, 400);
    }

    res.json({
      success: true,
      data: {
        id: topic._id,
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
        instructions: topic.instructions,
        keywords: topic.keywords,
        suggestedTags: topic.suggestedTags,
        priority: topic.priority,
      },
    });
  })
);

// POST /ai/publish — AI article publishing
router.post(
  '/publish',
  apiKeyMiddleware,
  validate(AIPublishSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    // Resolve topic
    let topicIds: Types.ObjectId[] = [];
    if (data.topic) {
      const topic = await Topic.findOne({
        name: new RegExp(`^${data.topic}$`, 'i'),
        status: 'active',
      });
      if (topic) topicIds = [topic._id as Types.ObjectId];
    }

    // Resolve or create category
    let categoryId: Types.ObjectId | null = null;
    if (data.category) {
      const catSlug = slugify(data.category, { lower: true, strict: true });
      let category = await Category.findOne({ slug: catSlug });
      if (!category) {
        category = await Category.create({ name: data.category, slug: catSlug });
        await logActivity({
          action: 'category.created',
          entityType: 'category',
          entityId: category._id as Types.ObjectId,
          entityTitle: category.name,
          actor: data.author,
        });
      }
      categoryId = category._id as Types.ObjectId;
    }

    // Resolve/create tags
    const tagIds = await resolveOrCreateTags(data.tags || []);

    const baseSlug = generateSlug(data.title);
    const slug = await ensureUniqueSlug(baseSlug);
    const readingTime = calculateReadingTime(data.content);

    const article = await Article.create({
      title: data.title,
      slug,
      description: data.description,
      content: data.content,
      contentType: data.contentType,
      categoryId,
      topicIds,
      tagIds,
      author: data.author,
      sourceUrl: data.sourceUrl,
      references: data.references,
      featuredImage: data.featuredImage,
      status: data.status,
      readingTime,
      publishedAt: data.status === 'published' ? new Date() : undefined,
    });

    await logActivity({
      action: 'article.published_by_ai',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: data.author,
      metadata: {
        topic: data.topic,
        category: data.category,
        tags: data.tags,
        contentType: data.contentType,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Article published successfully',
      data: {
        id: article._id,
        slug: article.slug,
        title: article.title,
        url: `/articles/${article.slug}`,
        apiUrl: `/api/v1/articles/${article._id}`,
      },
    });
  })
);

// PATCH /ai/articles/:id — AI article update
router.patch(
  '/articles/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOne({ _id: req.params.id, deletedAt: null });
    if (!article) throw createError('Article not found', 404);

    const data = req.body;
    if (data.content) data.readingTime = calculateReadingTime(data.content);
    if (data.tags) {
      data.tagIds = await resolveOrCreateTags(data.tags);
      delete data.tags;
    }

    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );

    await logActivity({
      action: 'article.updated',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: updated?.title || article.title,
      actor: data.author || article.author,
    });

    res.json({ success: true, data: updated });
  })
);

// GET /ai/recent-articles
router.get(
  '/recent-articles',
  asyncHandler(async (req: Request, res: Response) => {
    const limit = Math.min(50, parseInt((req.query.limit as string) || '10'));
    const articles = await Article.find({ deletedAt: null, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title slug description author publishedAt contentType')
      .lean();

    res.json({ success: true, data: articles });
  })
);

export default router;

