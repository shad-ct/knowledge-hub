import { Schema, model, Document, Types } from 'mongoose';

export interface IArticleVersion extends Document {
  articleId: Types.ObjectId;
  version: number;
  title: string;
  description: string;
  content: string;
  contentType: string;
  categoryId: Types.ObjectId | null;
  topicIds: Types.ObjectId[];
  tagIds: Types.ObjectId[];
  author: string;
  editedBy: string;
  createdAt: Date;
}

const ArticleVersionSchema = new Schema<IArticleVersion>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    version: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    contentType: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    topicIds: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: String, required: true },
    editedBy: { type: String, default: 'user' },
  },
  { timestamps: true }
);

ArticleVersionSchema.index({ articleId: 1, version: -1 });

export const ArticleVersion = model<IArticleVersion>('ArticleVersion', ArticleVersionSchema);

