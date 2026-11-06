import { Schema, model, Document, Types } from 'mongoose';

export type TopicStatus = 'active' | 'paused' | 'archived';
export type TopicPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ITopic extends Document {
  name: string;
  slug: string;
  description: string;
  instructions: string;
  keywords: string[];
  categoryIds: Types.ObjectId[];
  suggestedTags: string[];
  priority: TopicPriority;
  status: TopicStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    instructions: { type: String, default: '', trim: true },
    keywords: [{ type: String, trim: true, lowercase: true }],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    suggestedTags: [{ type: String, trim: true, lowercase: true }],
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    status: { type: String, enum: ['active', 'paused', 'archived'], default: 'active' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TopicSchema.index({ status: 1 });
TopicSchema.index({ priority: -1 });
TopicSchema.index({ name: 'text', description: 'text', instructions: 'text' });

export const Topic = model<ITopic>('Topic', TopicSchema);

