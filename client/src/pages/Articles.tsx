import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  LayoutList,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Eye,
  EyeOff,
  X,
  FileText,
} from 'lucide-react';
import { articlesApi, categoriesApi, topicsApi, libraryApi } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import { cn } from '../lib/utils';
import type { ContentType, ArticleStatus } from '../types';

const contentTypes: ContentType[] = [
  'article',
  'research-note',
  'observation',
  'tutorial',
  'explanation',
  'experiment',
  'reference',
  'other',
];

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [selectedContentType, setSelectedContentType] = useState<ContentType | ''>(
    (searchParams.get('contentType') as ContentType) || ''
  );
  const [readStatus, setReadStatus] = useState<string>(searchParams.get('isRead') ?? 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  );
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(
    () => (localStorage.getItem('kh_view_mode') as 'list' | 'grid') || 'list'
  );

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Sync state to URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedTopic) params.topic = selectedTopic;
    if (selectedTag) params.tag = selectedTag;
    if (selectedContentType) params.contentType = selectedContentType;
    if (readStatus !== 'all') params.isRead = readStatus;
    if (sortBy !== 'publishedAt') params.sortBy = sortBy;
    if (sortOrder !== 'desc') params.sortOrder = sortOrder;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategory, selectedTopic, selectedTag, selectedContentType, readStatus, sortBy, sortOrder, page, setSearchParams]);

  // Queries
  const { data: articlesData, isLoading } = useQuery({
    queryKey: [
      'articles',
      {
        page,
        limit: 20,
        search: debouncedSearch || undefined,
        category: selectedCategory || undefined,
        topic: selectedTopic || undefined,
        tag: selectedTag || undefined,
        contentType: selectedContentType || undefined,
        isRead: readStatus === 'all' ? undefined : readStatus === 'true',
        sortBy,
        sortOrder,
        status: 'published' as ArticleStatus,
      },
    ],
    queryFn: () =>
      articlesApi.list({
        page,
        limit: 20,
        search: debouncedSearch || undefined,
        category: selectedCategory || undefined,
        topic: selectedTopic || undefined,
        tag: selectedTag || undefined,
        contentType: selectedContentType || undefined,
        isRead: readStatus === 'all' ? undefined : readStatus === 'true',
        sortBy,
        sortOrder,
        status: 'published',
      }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const { data: libraryData } = useQuery({
    queryKey: ['library'],
    queryFn: () => libraryApi.list({ limit: 100 }),
  });

  const bookmarkedSet = new Set((libraryData?.data || []).map((a) => a._id));

  // Bulk actions
  const bulkReadMutation = useMutation({
    mutationFn: (isRead: boolean) => articlesApi.bulkReadStatus(selectedIds, isRead),
    onSuccess: (_, isRead) => {
      toast.success(`Marked ${selectedIds.length} articles as ${isRead ? 'read' : 'unread'}`);
      setSelectedIds([]);
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: () => toast.error('Bulk update failed'),
  });

  const toggleSelectAll = () => {
    const currentIds = (articlesData?.data || []).map((a) => a._id);
    if (selectedIds.length === currentIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentIds);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedTopic('');
    setSelectedTag('');
    setSelectedContentType('');
    setReadStatus('all');
    setSortBy('publishedAt');
    setSortOrder('desc');
    setPage(1);
  };

  const hasActiveFilters =
    debouncedSearch ||
    selectedCategory ||
    selectedTopic ||
    selectedTag ||
    selectedContentType ||
    readStatus !== 'all';

  const articles = articlesData?.data || [];
  const total = articlesData?.pagination.total || 0;
  const totalPages = articlesData?.pagination.pages || 1;

  return (
    <div className="space-y-6">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Articles</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {total} {total === 1 ? 'article' : 'articles'} in repository
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-md p-0.5 border border-border">
            <button
              onClick={() => {
                setViewMode('list');
                localStorage.setItem('kh_view_mode', 'list');
              }}
              className={cn(
                'p-1.5 rounded transition-colors',
                viewMode === 'list'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                localStorage.setItem('kh_view_mode', 'grid');
              }}
              className={cn(
                'p-1.5 rounded transition-colors',
                viewMode === 'grid'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-card border border-border rounded-lg p-3 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, description, content or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-md pl-9 pr-8 py-1.5 text-sm outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary text-foreground"
          >
            <option value="">All Categories</option>
            {(categoriesData?.data || []).map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Quick Topic filter */}
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary text-foreground"
          >
            <option value="">All Topics</option>
            {(topicsData?.data || []).map((top) => (
              <option key={top._id} value={top.slug}>
                {top.name}
              </option>
            ))}
          </select>
        </div>

        {/* Second Row of Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60 text-xs text-muted-foreground">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>

          {/* Content Type */}
          <select
            value={selectedContentType}
            onChange={(e) => {
              setSelectedContentType(e.target.value as ContentType | '');
              setPage(1);
            }}
            className="bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary text-foreground capitalize"
          >
            <option value="">All Types</option>
            {contentTypes.map((t) => (
              <option key={t} value={t}>
                {t.replace('-', ' ')}
              </option>
            ))}
          </select>

          {/* Read Status */}
          <div className="flex items-center bg-muted/60 rounded border border-border p-0.5">
            <button
              onClick={() => {
                setReadStatus('all');
                setPage(1);
              }}
              className={cn(
                'px-2 py-0.5 rounded text-xs transition-colors',
                readStatus === 'all'
                  ? 'bg-background text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            <button
              onClick={() => {
                setReadStatus('false');
                setPage(1);
              }}
              className={cn(
                'px-2 py-0.5 rounded text-xs transition-colors',
                readStatus === 'false'
                  ? 'bg-background text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Unread
            </button>
            <button
              onClick={() => {
                setReadStatus('true');
                setPage(1);
              }}
              className={cn(
                'px-2 py-0.5 rounded text-xs transition-colors',
                readStatus === 'true'
                  ? 'bg-background text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Read
            </button>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary text-foreground ml-auto"
          >
            <option value="publishedAt">Published Date</option>
            <option value="createdAt">Date Created</option>
            <option value="updatedAt">Recently Updated</option>
            <option value="title">Alphabetical (Title)</option>
          </select>

          {/* Sort Direction */}
          <button
            onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
            className="px-2 py-1 bg-background border border-border rounded text-xs text-foreground hover:bg-muted"
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-destructive hover:underline ml-2"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bulk action toolbar */}
      {articles.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              {selectedIds.length === articles.length ? (
                <CheckSquare className="w-4 h-4 text-primary" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span>Select all ({articles.length})</span>
            </button>

            {selectedIds.length > 0 && (
              <span className="font-medium text-foreground">
                {selectedIds.length} selected
              </span>
            )}
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => bulkReadMutation.mutate(true)}
                disabled={bulkReadMutation.isPending}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Mark as Read
              </button>
              <button
                onClick={() => bulkReadMutation.mutate(false)}
                disabled={bulkReadMutation.isPending}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                <EyeOff className="w-3.5 h-3.5" />
                Mark as Unread
              </button>
            </div>
          )}
        </div>
      )}

      {/* Articles List / Grid */}
      {isLoading ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-card border border-border rounded-lg animate-pulse p-4"
            />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {articles.map((article) => (
            <div key={article._id} className="relative group">
              {/* Card Selection Checkbox */}
              <button
                onClick={() => toggleSelect(article._id)}
                className="absolute top-3 left-1 z-10 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded bg-card/90"
              >
                {selectedIds.includes(article._id) ? (
                  <CheckSquare className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
              <ArticleCard
                article={article}
                isBookmarked={bookmarkedSet.has(article._id)}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/30">
          <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-sm">No articles found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No articles matched your active filters. Try adjusting your search query or reset the filters.'
              : 'The repository is currently empty. AI agents can publish articles or you can create one manually.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages} ({total} items)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-xs disabled:opacity-40 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-xs disabled:opacity-40 hover:bg-muted transition-colors"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

