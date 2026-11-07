import { Schema, model, Document, Types } from 'mongoose';

export interface INote extends Document {
  articleId: Types.ObjectId;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true },
    content: { type: String, required: true, trim: true, maxlength: 10000 },
    author: { type: String, default: 'Curator', trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Note = model<INote>('Note', NoteSchema);

