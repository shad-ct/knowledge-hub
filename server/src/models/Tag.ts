import { Schema, model, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;         // normalized lowercase
  displayName: string;  // original casing (first use)
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

TagSchema.index({ name: 'text' });

export const Tag = model<ITag>('Tag', TagSchema);

