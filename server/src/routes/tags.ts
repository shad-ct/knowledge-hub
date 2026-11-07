import { Router, Request, Response } from 'express';
import { Tag } from '../models/Tag.js';
import { Article } from '../models/Article.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { logActivity } from '../utils/activityLogger.js';

const router = Router();

router.delete(
  '/',
  apiKeyMiddleware,
  asyncHandler(async (_req: Request, res: Response) => {
    const result = await Tag.deleteMany({});
    res.json({ success: true, deletedCount: result.deletedCount });
  }),
);

// GET /tags
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const tags = await Tag.find().sort({ name: 1 }).lean();
    const tagsWithCounts = await Promise.all(
      tags.map(async (tag) => {
        const count = await Article.countDocuments({ tagIds: tag._id, deletedAt: null });
        return { ...tag, articleCount: count };
      })
    );
    res.json({ success: true, data: tagsWithCounts });
  })
);

// GET /tags/:name — get tag + its articles
router.get(
  '/:name',
  asyncHandler(async (req: Request, res: Response) => {
    const normalizedName = req.params.name.toLowerCase().replace(/^#/, '');
    const tag = await Tag.findOne({ name: normalizedName });
    if (!tag) throw createError('Tag not found', 404);

    const articles = await Article.find({ tagIds: tag._id, deletedAt: null })
      .sort({ publishedAt: -1 })
      .populate('categoryId', 'name slug color')
      .populate('tagIds', 'name displayName')
      .lean();

    res.json({ success: true, data: { tag, articles } });
  })
);

router.delete(
  '/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) throw createError('Tag not found', 404);

    await logActivity({
      action: 'tag.deleted',
      entityType: 'tag',
      entityId: tag._id,
      entityTitle: tag.displayName,
      actor: 'user',
    });

    res.json({ success: true, message: 'Tag deleted' });
  }),
);

export default router;
