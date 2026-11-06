import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Category } from '../models/Category.js';
import { Article } from '../models/Article.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { validate } from '../middleware/validate.js';
import { logActivity } from '../utils/activityLogger.js';
import { Types } from 'mongoose';
import slugify from 'slugify';

const router = Router();

const CategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  color: z.string().optional(),
});

// GET /categories
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const categories = await Category.find().sort({ name: 1 }).lean();
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Article.countDocuments({ categoryId: cat._id, deletedAt: null });
        return { ...cat, articleCount: count };
      })
    );
    res.json({ success: true, data: categoriesWithCounts });
  })
);

// GET /categories/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-f]{24}$/) ? req.params.id : null },
        { slug: req.params.id },
      ],
    });
    if (!category) throw createError('Category not found', 404);
    const articleCount = await Article.countDocuments({ categoryId: category._id, deletedAt: null });
    res.json({ success: true, data: { ...category.toObject(), articleCount } });
  })
);

// POST /categories
router.post(
  '/',
  apiKeyMiddleware,
  validate(CategorySchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const slug = slugify(data.name, { lower: true, strict: true, trim: true });
    const existing = await Category.findOne({ slug });
    if (existing) throw createError(`Category "${data.name}" already exists`, 409);

    const category = await Category.create({ ...data, slug });

    await logActivity({
      action: 'category.created',
      entityType: 'category',
      entityId: category._id as Types.ObjectId,
      entityTitle: category.name,
      actor: 'user',
    });

    res.status(201).json({ success: true, data: category });
  })
);

// PATCH /categories/:id
router.patch(
  '/:id',
  apiKeyMiddleware,
  validate(CategorySchema.partial()),
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true, trim: true });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
    if (!category) throw createError('Category not found', 404);

    await logActivity({
      action: 'category.updated',
      entityType: 'category',
      entityId: category._id as Types.ObjectId,
      entityTitle: category.name,
      actor: 'user',
    });

    res.json({ success: true, data: category });
  })
);

// DELETE /categories/:id
router.delete(
  '/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw createError('Category not found', 404);

    // Remove category from articles
    await Article.updateMany({ categoryId: req.params.id }, { $set: { categoryId: null } });

    await logActivity({
      action: 'category.deleted',
      entityType: 'category',
      entityId: req.params.id,
      entityTitle: category.name,
      actor: 'user',
    });

    res.json({ success: true, message: 'Category deleted' });
  })
);

export default router;

