import axios from 'axios';
import type {
  Article,
  ArticleFilters,
  PaginatedResponse,
  ApiResponse,
  DashboardStats,
  HomeResponse,
  Category,
  Tag,
  Topic,
  ActivityLog,
  ArticleNote,
  CreateArticlePayload,
  CreateTopicPayload,
} from '../types';

const RAILWAY_API_ORIGIN = 'https://knowledge-hub-production-b1d6.up.railway.app';
const BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? `${RAILWAY_API_ORIGIN}/api/v1` : '/api/v1');

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add API key from localStorage settings if present
client.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('kh_api_key');
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  return config;
});

// ─── Articles ─────────────────────────────────────────────────────────────────
export const articlesApi = {
  list: (filters?: ArticleFilters) =>
    client.get<PaginatedResponse<Article>>('/articles', { params: filters }).then((r) => r.data),

  get: (id: string) =>
    client.get<ApiResponse<Article>>(`/articles/${id}`).then((r) => r.data),

  getStats: () =>
    client.get<ApiResponse<DashboardStats>>('/articles/stats').then((r) => r.data),

  getHome: (timeZone: string) =>
    client.get<ApiResponse<HomeResponse>>('/articles/home', { params: { tz: timeZone } }).then((r) => r.data),

  getTrash: (page = 1, limit = 20) =>
    client.get<PaginatedResponse<Article>>('/articles/trash', { params: { page, limit } }).then((r) => r.data),

  getVersions: (id: string) =>
    client.get<ApiResponse<unknown[]>>(`/articles/${id}/versions`).then((r) => r.data),

  getRelated: (id: string) =>
    client.get<ApiResponse<Article[]>>(`/articles/${id}/related`).then((r) => r.data),

  create: (payload: CreateArticlePayload) =>
    client.post<ApiResponse<Article>>('/articles', payload).then((r) => r.data),

  update: (id: string, payload: Partial<CreateArticlePayload>) =>
    client.patch<ApiResponse<Article>>(`/articles/${id}`, payload).then((r) => r.data),

  setReadStatus: (id: string, isRead: boolean) =>
    client.patch<ApiResponse<{ isRead: boolean }>>(`/articles/${id}/read-status`, { isRead }).then((r) => r.data),

  delete: (id: string) =>
    client.delete<ApiResponse<null>>(`/articles/${id}`).then((r) => r.data),

  restore: (id: string) =>
    client.post<ApiResponse<Article>>(`/articles/${id}/restore`).then((r) => r.data),

  permanentDelete: (id: string) =>
    client.delete<ApiResponse<null>>(`/articles/${id}/permanent`).then((r) => r.data),

  bulkReadStatus: (ids: string[], isRead: boolean) =>
    client.post<ApiResponse<null>>('/articles/bulk-read', { ids, isRead }).then((r) => r.data),
};

// ─── Topics ───────────────────────────────────────────────────────────────────
export const topicsApi = {
  list: (status?: string) =>
    client.get<ApiResponse<Topic[]>>('/topics', { params: { status } }).then((r) => r.data),

  get: (id: string) =>
    client.get<ApiResponse<Topic & { recentArticles: Article[] }>>(`/topics/${id}`).then((r) => r.data),

  create: (payload: CreateTopicPayload) =>
    client.post<ApiResponse<Topic>>('/topics', payload).then((r) => r.data),

  update: (id: string, payload: Partial<CreateTopicPayload>) =>
    client.patch<ApiResponse<Topic>>(`/topics/${id}`, payload).then((r) => r.data),

  delete: (id: string) =>
    client.delete<ApiResponse<null>>(`/topics/${id}`).then((r) => r.data),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoriesApi = {
  list: () =>
    client.get<ApiResponse<Category[]>>('/categories').then((r) => r.data),

  get: (id: string) =>
    client.get<ApiResponse<Category>>(`/categories/${id}`).then((r) => r.data),

  create: (payload: { name: string; description?: string; color?: string }) =>
    client.post<ApiResponse<Category>>('/categories', payload).then((r) => r.data),

  update: (id: string, payload: { name?: string; description?: string; color?: string }) =>
    client.patch<ApiResponse<Category>>(`/categories/${id}`, payload).then((r) => r.data),

  delete: (id: string) =>
    client.delete<ApiResponse<null>>(`/categories/${id}`).then((r) => r.data),
};

// ─── Tags ─────────────────────────────────────────────────────────────────────
export const tagsApi = {
  list: () =>
    client.get<ApiResponse<Tag[]>>('/tags').then((r) => r.data),

  get: (name: string) =>
    client.get<ApiResponse<{ tag: Tag; articles: Article[] }>>(`/tags/${name}`).then((r) => r.data),
};

// ─── Library ──────────────────────────────────────────────────────────────────
export const libraryApi = {
  list: (params?: { page?: number; limit?: number; search?: string; sortBy?: string }) =>
    client.get<PaginatedResponse<Article>>('/library', { params }).then((r) => r.data),

  add: (articleId: string) =>
    client.post<ApiResponse<null>>(`/library/${articleId}`).then((r) => r.data),

  remove: (articleId: string) =>
    client.delete<ApiResponse<null>>(`/library/${articleId}`).then((r) => r.data),

  check: (articleId: string) =>
    client.get<ApiResponse<{ isBookmarked: boolean }>>(`/library/check/${articleId}`).then((r) => r.data),
};

// ─── Activity ─────────────────────────────────────────────────────────────────
export const activityApi = {
  list: (params?: {
    page?: number;
    limit?: number;
    action?: string;
    entityType?: string;
    actor?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }) =>
    client.get<PaginatedResponse<ActivityLog>>('/activity', { params }).then((r) => r.data),

  get: (id: string) =>
    client.get<ApiResponse<ActivityLog>>(`/activity/${id}`).then((r) => r.data),
};

// ─── Article Notes & Annotations ──────────────────────────────────────────────
export const notesApi = {
  list: (articleId: string) =>
    client.get<ApiResponse<ArticleNote[]>>(`/articles/${articleId}/notes`).then((r) => r.data),

  create: (articleId: string, payload: { content: string; author?: string }) =>
    client.post<ApiResponse<ArticleNote>>(`/articles/${articleId}/notes`, payload).then((r) => r.data),

  delete: (articleId: string, noteId: string) =>
    client.delete<ApiResponse<null>>(`/articles/${articleId}/notes/${noteId}`).then((r) => r.data),
};

export default client;
