import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Search,
  SortAsc,
  BookmarkX,
  Bookmark,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  LayoutGrid,
} from 'lucide-react';
import { libraryApi, categoriesApi, topicsApi, tagsApi } from '../lib/api';
import { cn, formatDate } from '../lib/utils';
import ArticleCard from '../components/ArticleCard';
import type { Article, Category, Topic, Tag } from '../types';

type SortOption = 'bookmarkedAt' | 'title' | 'createdAt';
type ReadFilter = 'all' | 'read' | 'unread';

const LIMIT = 20;

export default function LibraryPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('bookmarkedAt');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() =>
    (localStorage.getItem('kh_view_mode') as 'list' | 'grid') || 'list'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Debounced search param
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimeout = useMemo(() => ({ id: 0 }), []);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimeout.id);
    searchTimeout.id = window.setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 300);
  };

  const params = useMemo(
    () => ({
      page,
      limit: LIMIT,
      search: debouncedSearch || undefined,
      sortBy,
    }),
    [page, LIMIT, debouncedSearch, sortBy]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ['library', params],
    queryFn: () => libraryApi.list(params),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const { data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagsApi.list(),
  });

  const removeMutation = useMutation({
    mutationFn: (articleId: string) => libraryApi.remove(articleId),
    onSuccess: () => {
      toast.success('Removed from library');
      queryClient.invalidateQueries({ queryKey: ['library'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: () => toast.error('Failed to remove from library'),
  });

  // Client-side filters (category, topic, tag, read status) applied on top of API results
  const filteredArticles = useMemo(() => {
    let articles: Article[] = data?.data ?? [];

    if (selectedCategory) {
      articles = articles.filter(
        (a) => a.categoryId && (a.categoryId as Category)._id === selectedCategory
      );
    }
    if (selectedTopic) {
      articles = articles.filter((a) =>
        a.topicIds?.some((t) => (t as Topic)._id === selectedTopic)
      );
    }
    if (selectedTag) {
      articles = articles.filter((a) =>
        a.tagIds?.some((t) => (t as Tag).name === selectedTag)
      );
    }
    if (readFilter === 'read') articles = articles.filter((a) => a.isRead);
    if (readFilter === 'unread') articles = articles.filter((a) => !a.isRead);

    return articles;
  }, [data, selectedCategory, selectedTopic, selectedTag, readFilter]);

  const pagination = data?.pagination;
  const hasFilters = selectedCategory || selectedTopic || selectedTag || readFilter !== 'all';

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTopic('');
    setSelectedTag('');
    setReadFilter('all');
  };

  const categories: Category[] = categoriesData?.data ?? [];
  const topics: Topic[] = topicsData?.data ?? [];
  const tags: Tag[] = tagsData?.data ?? [];

  return (
    <div className="flex h-full min-h-0">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-56 flex-shrink-0 border-r border-border bg-card/50 overflow-y-auto p-4 space-y-5">
          {/* Read Status */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Read Status
            </p>
            <div className="space-y-1">
              {(['all', 'unread', 'read'] as ReadFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setReadFilter(s)}
                  className={cn(
                    'w-full text-left text-sm px-2 py-1 rounded transition-colors',
                    readFilter === s
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          {categories.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Category
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={cn(
                    'w-full text-left text-sm px-2 py-1 rounded transition-colors',
                    !selectedCategory
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    className={cn(
                      'w-full text-left text-sm px-2 py-1 rounded transition-colors truncate',
                      selectedCategory === cat._id
                        ? 'bg-primary/15 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1.5"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {topics.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Topic
              </p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                <button
                  onClick={() => setSelectedTopic('')}
                  className={cn(
                    'w-full text-left text-sm px-2 py-1 rounded transition-colors',
                    !selectedTopic
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  All Topics
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic._id}
                    onClick={() => setSelectedTopic(topic._id)}
                    className={cn(
                      'w-full text-left text-sm px-2 py-1 rounded transition-colors truncate',
                      selectedTopic === topic._id
                        ? 'bg-primary/15 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tag
              </p>
              <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag.name ? '' : tag.name)
                    }
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full border transition-colors',
                      selectedTag === tag.name
                        ? 'bg-primary/20 text-primary border-primary/30'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                    )}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded"
                title="Toggle filters"
              >
                <Filter className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-primary" />
                  Library
                </h1>
                {pagination && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {pagination.total} bookmarked article{pagination.total !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View mode */}
              <div className="flex items-center border border-border rounded overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search + Sort bar */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search bookmarks…"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <SortAsc className="w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as SortOption); setPage(1); }}
                className="bg-card border border-border rounded px-2 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
              >
                <option value="bookmarkedAt">Date Bookmarked</option>
                <option value="title">Alphabetical</option>
                <option value="createdAt">Date Created</option>
              </select>
            </div>
          </div>

          {/* Active filter pills */}
          {hasFilters && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs text-muted-foreground">Filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent px-2 py-0.5 rounded-full border border-border">
                  {categories.find((c) => c._id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedTopic && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent px-2 py-0.5 rounded-full border border-border">
                  {topics.find((t) => t._id === selectedTopic)?.name}
                  <button onClick={() => setSelectedTopic('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent px-2 py-0.5 rounded-full border border-border">
                  #{selectedTag}
                  <button onClick={() => setSelectedTag('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {readFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent px-2 py-0.5 rounded-full border border-border">
                  {readFilter}
                  <button onClick={() => setReadFilter('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className={cn('space-y-3', viewMode === 'grid' && 'grid grid-cols-2 gap-4 space-y-0')}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-card border border-border rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Failed to load library. Please try again.</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && filteredArticles.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-card border border-border">
                <Bookmark className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {data?.data.length === 0
                    ? 'Your library is empty'
                    : 'No matching bookmarks'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {data?.data.length === 0
                    ? 'Bookmark articles to save them here.'
                    : 'Try adjusting your search or filters.'}
                </p>
              </div>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Article list */}
          {!isLoading && !isError && filteredArticles.length > 0 && (
            <>
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    : 'space-y-2'
                )}
              >
                {filteredArticles.map((article) => (
                  <div key={article._id} className="relative group">
                    <ArticleCard
                      article={article}
                      isBookmarked={true}
                      viewMode={viewMode}
                    />
                    {/* Bookmarked date + remove */}
                    <div className="mt-1 flex items-center justify-between px-1">
                      {article.bookmarkedAt && (
                        <span className="text-xs text-muted-foreground/60">
                          Saved {formatDate(article.bookmarkedAt)}
                        </span>
                      )}
                      <button
                        onClick={() => removeMutation.mutate(article._id)}
                        disabled={removeMutation.isPending}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-auto"
                      >
                        <BookmarkX className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.pages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={pagination.page <= 1}
                      className="p-1.5 rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(pagination.pages, 7) }).map((_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={cn(
                            'w-8 h-8 rounded border text-sm transition-colors',
                            page === p
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                          )}
                        >
                          {p}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                      disabled={pagination.page >= pagination.pages}
                      className="p-1.5 rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
