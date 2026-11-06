import { Tag } from '../models/Tag.js';
import { Types } from 'mongoose';

export const resolveOrCreateTags = async (tagNames: string[]): Promise<Types.ObjectId[]> => {
  const tagIds: Types.ObjectId[] = [];

  for (const rawName of tagNames) {
    const displayName = rawName.trim();
    const normalizedName = displayName.toLowerCase().replace(/^#/, '');

    if (!normalizedName) continue;

    let tag = await Tag.findOne({ name: normalizedName });
    if (!tag) {
      tag = await Tag.create({ name: normalizedName, displayName });
    }

    tagIds.push(tag._id as Types.ObjectId);
  }

  return tagIds;
};

