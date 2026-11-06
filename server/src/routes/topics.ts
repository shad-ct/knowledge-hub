import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Topic } from '../models/Topic.js';
import { Article } from '../models/Article.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { validate } from '../middleware/validate.js';
import { logActivity } from '../utils/activityLogger.js';
import { Types } from 'mongoose';
import slugify from 'slugify';

const router = Router();

const TopicSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  instructions: z.string().default(''),
  keywords: z.array(z.string()).default([]),
  suggestedTags: z.array(z.string()).default([]),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  status: z.enum(['active', 'paused', 'archived']).default('active'),
});

const makeSlug = (name: string) =>
  slugify(name, { lower: true, strict: true, trim: true });

// GET /topics
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { status, priority } = req.query as Record<string, string>;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const topics = await Topic.find(filter).sort({ priority: -1, name: 1 }).lean();

    // Add article counts
    const topicsWithCounts = await Promise.all(
      topics.map(async (topic) => {
        const count = await Article.countDocuments({
          topicIds: topic._id,
          deletedAt: null,
          status: 'published',
        });
        const lastArticle = await Article.findOne(
          { topicIds: topic._id, deletedAt: null },
          { publishedAt: 1 }
        ).sort({ publishedAt: -1 });
        return { ...topic, articleCount: count, lastContribution: lastArticle?.publishedAt };
      })
    );

    res.json({ success: true, data: topicsWithCounts });
  })
);

// GET /topics/active
router.get(
  '/active',
  asyncHandler(async (_req: Request, res: Response) => {
    const topics = await Topic.find({ status: 'active' }).sort({ priority: -1, name: 1 }).lean();
    res.json({ success: true, data: topics });
  })
);

// GET /topics/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
      $or: [{ _id: req.params.id.match(/^[0-9a-f]{24}$/) ? req.params.id : null }, { slug: req.params.id }],
    });
    if (!topic) throw createError('Topic not found', 404);

    const articleCount = await Article.countDocuments({
      topicIds: topic._id,
      deletedAt: null,
    });

    const recentArticles = await Article.find({ topicIds: topic._id, deletedAt: null })
      .sort({ publishedAt: -1 })
      .limit(10)
      .populate('categoryId', 'name slug color')
      .populate('tagIds', 'name displayName')
      .lean();

    res.json({ success: true, data: { ...topic.toObject(), articleCount, recentArticles } });
  })
);

// POST /topics
router.post(
  '/',
  apiKeyMiddleware,
  validate(TopicSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const slug = makeSlug(data.name);

    const existing = await Topic.findOne({ slug });
    if (existing) throw createError(`Topic with slug "${slug}" already exists`, 409);

    const topic = await Topic.create({ ...data, slug });

    await logActivity({
      action: 'topic.created',
      entityType: 'topic',
      entityId: topic._id as Types.ObjectId,
      entityTitle: topic.name,
      actor: 'user',
    });

    res.status(201).json({ success: true, data: topic });
  })
);

// PATCH /topics/:id
router.patch(
  '/:id',
  apiKeyMiddleware,
  validate(TopicSchema.partial()),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    if (data.name) {
      data.slug = makeSlug(data.name);
    }

    const topic = await Topic.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
    if (!topic) throw createError('Topic not found', 404);

    await logActivity({
      action: 'topic.updated',
      entityType: 'topic',
      entityId: topic._id as Types.ObjectId,
      entityTitle: topic.name,
      actor: 'user',
    });

    res.json({ success: true, data: topic });
  })
);

// DELETE /topics/:id
router.delete(
  '/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) throw createError('Topic not found', 404);

    await logActivity({
      action: 'topic.deleted',
      entityType: 'topic',
      entityId: req.params.id,
      entityTitle: topic.name,
      actor: 'user',
    });

    res.json({ success: true, message: 'Topic deleted' });
  })
);

export default router;

