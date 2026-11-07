import { Router, Request, Response } from 'express';
import { ActivityLog } from '../models/ActivityLog.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';

const router = Router();

router.delete(
  '/',
  apiKeyMiddleware,
  asyncHandler(async (_req: Request, res: Response) => {
    const result = await ActivityLog.deleteMany({});
    res.json({ success: true, deletedCount: result.deletedCount });
  }),
);

// GET /activity
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const {
      page = '1',
      limit = '50',
      action,
      entityType,
      actor,
      search,
      dateFrom,
      dateTo,
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(200, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, unknown> = {};
    if (action) filter.action = action;
    if (entityType) filter.entityType = entityType;
    if (actor) filter.actor = new RegExp(actor, 'i');
    if (search) filter.entityTitle = new RegExp(search, 'i');
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, Date> = {};
      if (dateFrom) dateFilter.$gte = new Date(dateFrom);
      if (dateTo) dateFilter.$lte = new Date(dateTo);
      filter.timestamp = dateFilter;
    }

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limitNum).lean(),
      ActivityLog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  })
);

// GET /activity/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const log = await ActivityLog.findById(req.params.id);
    if (!log) throw createError('Activity log not found', 404);
    res.json({ success: true, data: log });
  })
);

export default router;
