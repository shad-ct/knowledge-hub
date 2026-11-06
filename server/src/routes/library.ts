import { Router, Request, Response } from 'express';
import { Bookmark } from '../models/Bookmark.js';
import { Article } from '../models/Article.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logActivity } from '../utils/activityLogger.js';
import { Types } from 'mongoose';

const router = Router();

// GET /library
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
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const sortDir = sortOrder === 'asc' ? 1 : -1;
    const bookmarks = await Bookmark.find()
      .sort({ [sortBy === 'title' ? 'createdAt' : sortBy]: sortDir })
      .lean();

    const articleIds = bookmarks.map((b) => b.articleId);
    const bookmarkMap = new Map(bookmarks.map((b) => [b.articleId.toString(), b.createdAt]));

    const filter: Record<string, unknown> = { _id: { $in: articleIds }, deletedAt: null };
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { author: regex },
        { content: regex },
      ];
    }
    if (category) filter['categoryId.slug'] = category;
    if (tag) {
      const { Tag } = await import('../models/Tag.js');
      const t = await Tag.findOne({ name: tag.toLowerCase() });
      if (t) filter.tagIds = t._id;
    }

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .skip(skip)
        .limit(limitNum)
        .populate('categoryId', 'name slug color')
        .populate('topicIds', 'name slug')
        .populate('tagIds', 'name displayName')
        .lean(),
      Article.countDocuments(filter),
    ]);

    const articlesWithBookmarkDate = articles.map((a) => ({
      ...a,
      bookmarkedAt: bookmarkMap.get(a._id.toString()),
    }));

    res.json({
      success: true,
      data: articlesWithBookmarkDate,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  })
);

// POST /library/:articleId
router.post(
  '/:articleId',
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOne({ _id: req.params.articleId, deletedAt: null });
    if (!article) throw createError('Article not found', 404);

    const existing = await Bookmark.findOne({ articleId: req.params.articleId });
    if (existing) {
      res.json({ success: true, message: 'Already bookmarked' });
      return;
    }

    await Bookmark.create({ articleId: req.params.articleId });

    await logActivity({
      action: 'article.bookmarked',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: 'user',
    });

    res.status(201).json({ success: true, message: 'Bookmarked' });
  })
);

// DELETE /library/:articleId
router.delete(
  '/:articleId',
  asyncHandler(async (req: Request, res: Response) => {
    const bookmark = await Bookmark.findOneAndDelete({ articleId: req.params.articleId });
    if (!bookmark) throw createError('Bookmark not found', 404);

    const article = await Article.findById(req.params.articleId);

    await logActivity({
      action: 'article.unbookmarked',
      entityType: 'article',
      entityId: req.params.articleId,
      entityTitle: article?.title,
      actor: 'user',
    });

    res.json({ success: true, message: 'Bookmark removed' });
  })
);

// GET /library/check/:articleId — check if article is bookmarked
router.get(
  '/check/:articleId',
  asyncHandler(async (req: Request, res: Response) => {
    const bookmark = await Bookmark.findOne({ articleId: req.params.articleId });
    res.json({ success: true, data: { isBookmarked: !!bookmark } });
  })
);

export default router;

