import { Schema, model, Document, Types } from 'mongoose';

export type ActivityAction =
  | 'article.created'
  | 'article.updated'
  | 'article.deleted'
  | 'article.restored'
  | 'article.permanently_deleted'
  | 'article.read'
  | 'article.unread'
  | 'article.bookmarked'
  | 'article.unbookmarked'
  | 'article.published_by_ai'
  | 'article.draft'
  | 'article.published'
  | 'topic.created'
  | 'topic.updated'
  | 'topic.deleted'
  | 'category.created'
  | 'category.updated'
  | 'category.deleted'
  | 'tag.created'
  | 'tag.deleted'
  | 'backup.created'
  | 'backup.restored';

export type EntityType = 'article' | 'topic' | 'category' | 'tag' | 'system';

export interface IActivityLog extends Document {
  action: ActivityAction;
  entityType: EntityType;
  entityId?: Types.ObjectId | string;
  entityTitle?: string;
  actor: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, required: true },
    entityType: { type: String, enum: ['article', 'topic', 'category', 'tag', 'system'], required: true },
    entityId: { type: Schema.Types.Mixed },
    entityTitle: { type: String, trim: true },
    actor: { type: String, required: true, default: 'system', trim: true },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

ActivityLogSchema.index({ timestamp: -1 });
ActivityLogSchema.index({ action: 1 });
ActivityLogSchema.index({ entityType: 1 });
ActivityLogSchema.index({ actor: 1 });
ActivityLogSchema.index({ entityId: 1 });

export const ActivityLog = model<IActivityLog>('ActivityLog', ActivityLogSchema);

