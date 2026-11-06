import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, maxlength: 500 },
    color: { type: String, trim: true, default: '#6366f1' },
  },
  { timestamps: true }
);

CategorySchema.index({ name: 'text' });

export const Category = model<ICategory>('Category', CategorySchema);

