// Shared TypeScript types for the Knowledge Hub

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
export type TopicStatus = 'active' | 'paused' | 'archived';
export type TopicPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  articleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  displayName: string;
  articleCount?: number;
  createdAt: string;
}

export interface Topic {
  _id: string;
  name: string;
  slug: string;
  description: string;
  instructions: string;
  keywords: string[];
  categoryIds: string[];
  suggestedTags: string[];
  priority: TopicPriority;
  status: TopicStatus;
  articleCount?: number;
  lastContribution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  contentType: ContentType;
  categoryId: Category | null;
  topicIds: Topic[];
  tagIds: Tag[];
  author: string;
  sourceUrl?: string;
  references: string[];
  featuredImage?: string;
  status: ArticleStatus;
  isRead: boolean;
  readingTime: number;
  publishedAt?: string;
  deletedAt?: string | null;
  bookmarkedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  _id: string;
  action: string;
  entityType: string;
  entityId?: string;
  entityTitle?: string;
  actor: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface Bookmark {
  _id: string;
  articleId: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  total: number;
  unread: number;
  read: number;
  published: number;
  draft: number;
  recentCount: number;
  topics: number;
  categories: number;
  contributors: number;
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  topic?: string;
  tag?: string;
  contentType?: ContentType;
  author?: string;
  status?: ArticleStatus;
  isRead?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateArticlePayload {
  title: string;
  description: string;
  content: string;
  contentType?: ContentType;
  category?: string;
  topics?: string[];
  tags?: string[];
  author?: string;
  sourceUrl?: string;
  references?: string[];
  featuredImage?: string;
  status?: ArticleStatus;
  slug?: string;
}

export interface CreateTopicPayload {
  name: string;
  description: string;
  instructions?: string;
  keywords?: string[];
  suggestedTags?: string[];
  priority?: TopicPriority;
  status?: TopicStatus;
}

