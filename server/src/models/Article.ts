import { Schema, model, Document, Types } from 'mongoose';

export type ContentType =
  | 'article'
  | 'research-note'
  | 'observation'
  | 'tutorial'
  | 'explanation'
  | 'experiment'
  | 'reference'
  | 'other';

export type ArticleStatus = 'draft' | 'published';

export interface IArticle extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  contentType: ContentType;
  categoryId: Types.ObjectId | null;
  topicIds: Types.ObjectId[];
  tagIds: Types.ObjectId[];
  author: string;
  sourceUrl?: string;
  references: string[];
  featuredImage?: string;
  status: ArticleStatus;
  isRead: boolean;
  readingTime: number;
  publishedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true, maxlength: 500 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    content: { type: String, required: true },
    contentType: {
      type: String,
      enum: ['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'],
      default: 'article',
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    topicIds: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: String, required: true, trim: true, default: 'Unknown' },
    sourceUrl: { type: String, trim: true },
    references: [{ type: String, trim: true }],
    featuredImage: { type: String, trim: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    isRead: { type: Boolean, default: false },
    readingTime: { type: Number, default: 1 },
    publishedAt: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text search index
ArticleSchema.index(
  { title: 'text', description: 'text', content: 'text', author: 'text' },
  { weights: { title: 10, description: 5, content: 1, author: 3 }, name: 'article_text_search' }
);

// Performance indexes
ArticleSchema.index({ deletedAt: 1 });
ArticleSchema.index({ status: 1, deletedAt: 1 });
ArticleSchema.index({ categoryId: 1, deletedAt: 1 });
ArticleSchema.index({ topicIds: 1, deletedAt: 1 });
ArticleSchema.index({ tagIds: 1, deletedAt: 1 });
ArticleSchema.index({ isRead: 1, deletedAt: 1 });
ArticleSchema.index({ author: 1, deletedAt: 1 });
ArticleSchema.index({ publishedAt: -1, deletedAt: 1 });
ArticleSchema.index({ createdAt: -1 });

export const Article = model<IArticle>('Article', ArticleSchema);

