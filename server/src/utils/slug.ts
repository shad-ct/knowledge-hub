import slugify from 'slugify';
import { Article } from '../models/Article.js';

export const generateSlug = (title: string): string => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
    replacement: '-',
  });
};

export const ensureUniqueSlug = async (
  baseSlug: string,
  excludeId?: string
): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, unknown> = { slug, deletedAt: null };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existing = await Article.findOne(query);
    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

