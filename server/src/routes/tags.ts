import { Router, Request, Response } from 'express';
import { Tag } from '../models/Tag.js';
import { Article } from '../models/Article.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';

const router = Router();

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

export default router;

