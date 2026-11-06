import { Schema, model, Document, Types } from 'mongoose';

export interface IBookmark extends Document {
  articleId: Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true, unique: true },
  },
  { timestamps: true }
);

BookmarkSchema.index({ createdAt: -1 });

export const Bookmark = model<IBookmark>('Bookmark', BookmarkSchema);

