import { ActivityLog, ActivityAction, EntityType } from '../models/ActivityLog.js';
import { Types } from 'mongoose';

interface LogActivityParams {
  action: ActivityAction;
  entityType: EntityType;
  entityId?: Types.ObjectId | string;
  entityTitle?: string;
  actor?: string;
  metadata?: Record<string, unknown>;
}

export const logActivity = async (params: LogActivityParams): Promise<void> => {
  try {
    await ActivityLog.create({
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      entityTitle: params.entityTitle,
      actor: params.actor || 'user',
      metadata: params.metadata,
      timestamp: new Date(),
    });
  } catch (error) {
    // Activity logging failure should not break the main operation
    console.error('Activity logging failed:', error);
  }
};

