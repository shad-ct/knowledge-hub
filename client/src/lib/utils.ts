import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format } from 'date-fns';
import type { ContentType } from '../types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return 'Unknown date';
  try {
    return format(new Date(date), 'MMM d, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatRelativeDate = (date: string | Date | undefined): string => {
  if (!date) return 'Unknown';
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return 'Unknown';
  }
};

export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) return '< 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

export const contentTypeLabel: Record<ContentType, string> = {
  article: 'Article',
  'research-note': 'Research Note',
  observation: 'Observation',
  tutorial: 'Tutorial',
  explanation: 'Explanation',
  experiment: 'Experiment',
  reference: 'Reference',
  other: 'Other',
};

export const contentTypeColor: Record<ContentType, string> = {
  article: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'research-note': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  observation: 'bg-green-500/10 text-green-400 border-green-500/20',
  tutorial: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  explanation: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  experiment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  reference: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  other: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export const priorityColor = {
  low: 'text-muted-foreground',
  medium: 'text-blue-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

export const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
};

export const activityActionLabel: Record<string, string> = {
  'article.created': 'Article created',
  'article.updated': 'Article updated',
  'article.deleted': 'Article deleted',
  'article.restored': 'Article restored',
  'article.permanently_deleted': 'Article permanently deleted',
  'article.read': 'Marked as read',
  'article.unread': 'Marked as unread',
  'article.bookmarked': 'Bookmarked',
  'article.unbookmarked': 'Bookmark removed',
  'article.published_by_ai': 'Published by AI agent',
  'topic.created': 'Topic created',
  'topic.updated': 'Topic updated',
  'topic.deleted': 'Topic deleted',
  'category.created': 'Category created',
  'category.updated': 'Category updated',
  'category.deleted': 'Category deleted',
  'tag.created': 'Tag created',
  'backup.created': 'Backup created',
  'backup.restored': 'Backup restored',
};

