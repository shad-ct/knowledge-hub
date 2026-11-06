import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Edit3,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  Clock,
  User,
  Calendar,
  Tag,
  ChevronRight,
  ChevronLeft,
  List,
  AlertTriangle,
} from 'lucide-react';
import { articlesApi, libraryApi } from '../lib/api';
import { cn, formatDate, formatReadingTime, contentTypeColor, contentTypeLabel } from '../lib/utils';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../types';

// ─── Heading Parser ──────────────────────────────────────────────────────────
interface TocItem {
  level: 2 | 3;
  text: string;
  slug: string;
}

function parseToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const items: TocItem[] = [];
  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    if (h2) {
      const text = h2[1].replace(/[*_`~]/g, '');
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      items.push({ level: 2, text, slug });
    } else if (h3) {
      const text = h3[1].replace(/[*_`~]/g, '');
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      items.push({ level: 3, text, slug });
    }
  }
  return items;
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function ArticleDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-32" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-24" />
        <div className="h-9 bg-muted rounded w-3/4" />
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-5 bg-muted rounded w-2/3" />
      </div>
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-6 bg-muted rounded w-20" />)}
      </div>
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-4 bg-muted rounded" style={{ width: `${70 + (i % 3) * 10}%` }} />)}
      </div>
    </div>
  );
}

// ─── Delete Dialog ────────────────────────────────────────────────────────────
interface DeleteDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function DeleteDialog({ title, onConfirm, onCancel, isPending }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center gap-3 text-red-400">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground">Delete Article</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-medium text-foreground">"{title}"</span>?
          It will be moved to trash and can be restored later.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? 'Deleting…' : 'Delete Article'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [readProgress, setReadProgress] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeToc, setActiveToc] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Queries ─────────────────────────────────────────────────────────────────
  const { data: articleRes, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.get(id!),
    enabled: !!id,
  });

  const { data: relatedRes } = useQuery({
    queryKey: ['related', id],
    queryFn: () => articlesApi.getRelated(id!),
    enabled: !!id,
  });

  const { data: bookmarkRes } = useQuery({
    queryKey: ['bookmark', id],
    queryFn: () => libraryApi.check(id!),
    enabled: !!id,
  });

  const article = articleRes?.data;
  const related = relatedRes?.data ?? [];
  const isBookmarked = bookmarkRes?.data?.isBookmarked ?? false;

  // ── Reading progress ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Active TOC tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveToc(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
    );
    const headings = contentRef.current?.querySelectorAll('h2[id], h3[id]') ?? [];
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [article]);

  // ── Mutations ────────────────────────────────────────────────────────────────
  const bookmarkMutation = useMutation({
    mutationFn: (add: boolean) => (add ? libraryApi.add(id!) : libraryApi.remove(id!)),
    onSuccess: (_, add) => {
      toast.success(add ? 'Added to library' : 'Removed from library');
      queryClient.invalidateQueries({ queryKey: ['bookmark', id] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
    onError: () => toast.error('Failed to update bookmark'),
  });

  const readMutation = useMutation({
    mutationFn: (isRead: boolean) => articlesApi.setReadStatus(id!, isRead),
    onSuccess: (_, isRead) => {
      toast.success(isRead ? 'Marked as read' : 'Marked as unread');
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: () => toast.error('Failed to update read status'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => articlesApi.delete(id!),
    onSuccess: () => {
      toast.success('Article moved to trash');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      navigate('/articles');
    },
    onError: () => toast.error('Failed to delete article'),
  });

  // ── TOC scroll ───────────────────────────────────────────────────────────────
  const scrollToHeading = useCallback((slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // ── States ───────────────────────────────────────────────────────────────────
  if (isLoading) return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted">
        <div className="h-full bg-primary/40 animate-pulse w-1/3" />
      </div>
      <ArticleDetailSkeleton />
    </>
  );

  if (error || !article) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="text-5xl">📄</div>
      <h2 className="text-xl font-semibold">Article not found</h2>
      <p className="text-muted-foreground">This article may have been deleted or doesn't exist.</p>
      <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>
    </div>
  );

  const tocItems = parseToc(article.content);

  return (
    <>
      {/* ── Reading progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted/50">
        <div
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* ── Delete Dialog ── */}
      {showDeleteDialog && (
        <DeleteDialog
          title={article.title}
          onConfirm={() => deleteMutation.mutate()}
          onCancel={() => setShowDeleteDialog(false)}
          isPending={deleteMutation.isPending}
        />
      )}

      <div className="min-h-screen">
        {/* ── Top nav bar ── */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
            <Link
              to="/articles"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Articles</span>
            </Link>

            {/* Title truncated in nav */}
            <span className="text-sm font-medium truncate max-w-xs text-muted-foreground hidden md:block">
              {article.title}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => readMutation.mutate(!article.isRead)}
                disabled={readMutation.isPending}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  article.isRead
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
                title={article.isRead ? 'Mark as unread' : 'Mark as read'}
              >
                {article.isRead ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{article.isRead ? 'Read' : 'Unread'}</span>
              </button>

              <button
                onClick={() => bookmarkMutation.mutate(!isBookmarked)}
                disabled={bookmarkMutation.isPending}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  isBookmarked
                    ? 'text-primary bg-primary/10 hover:bg-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <Link
                to={`/articles/${id}/edit`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Link>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">

          {/* ── Article body ── */}
          <main className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">

            {/* Header */}
            <header className="mb-8 space-y-4">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                {article.categoryId && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${article.categoryId.color}15`,
                      borderColor: `${article.categoryId.color}30`,
                      color: article.categoryId.color,
                    }}
                  >
                    {article.categoryId.name}
                  </span>
                )}
                <span className={cn('text-xs px-2 py-0.5 rounded border font-medium', contentTypeColor[article.contentType])}>
                  {contentTypeLabel[article.contentType]}
                </span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded border font-medium',
                  article.status === 'published'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                )}>
                  {article.status === 'published' ? 'Published' : 'Draft'}
                </span>
                {article.isRead && (
                  <span className="text-xs px-2 py-0.5 rounded border bg-muted text-muted-foreground border-border font-medium">
                    Read
                  </span>
                )}
              </div>

              {/* Topic pills */}
              {article.topicIds && article.topicIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {article.topicIds.map((topic) => (
                    <Link
                      key={topic._id}
                      to={`/topics/${topic._id}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                {article.title}
              </h1>

              {/* Description */}
              {article.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-1 border-t border-border">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatReadingTime(article.readingTime)}
                </span>
              </div>
            </header>

            {/* ── Content ── */}
            <div ref={contentRef} className="article-content">
              <MarkdownRenderer content={article.content} />
            </div>

            {/* ── Post-content sections ── */}
            <div className="mt-10 pt-8 border-t border-border space-y-8">

              {/* Tags */}
              {article.tagIds && article.tagIds.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tagIds.map((tag) => (
                      <Link
                        key={tag._id}
                        to={`/tags/${tag.name}`}
                        className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary border border-border hover:border-primary/30 transition-colors"
                      >
                        #{tag.displayName || tag.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Source URL */}
              {article.sourceUrl && !article.sourceUrl.startsWith('file:') && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Source
                  </h3>
                  {article.sourceUrl.startsWith('http://') || article.sourceUrl.startsWith('https://') ? (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline break-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      {article.sourceUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground break-all">{article.sourceUrl}</span>
                  )}
                </section>
              )}

              {/* References */}
              {article.references && article.references.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    References
                  </h3>
                  <ol className="space-y-2">
                    {article.references.map((ref, i) => {
                      const isWebLink =
                        (ref.startsWith('http://') || ref.startsWith('https://')) &&
                        !ref.includes('file:///');
                      return (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="font-mono text-xs text-muted-foreground/60 flex-shrink-0 mt-0.5">
                            [{i + 1}]
                          </span>
                          {isWebLink ? (
                            <a href={ref} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                              {ref}
                            </a>
                          ) : (
                            <span className="break-all">{ref}</span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              )}

              {/* Related Articles */}
              {related.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-2">
                    {related.slice(0, 4).map((rel) => (
                      <ArticleCard key={rel._id} article={rel} viewMode="list" />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Prev / Next navigation ── */}
            <PrevNextNav currentId={id!} />
          </main>

          {/* ── Sidebar TOC ── */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-20">
                <div className="p-4 rounded-xl border border-border bg-card/50">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    <List className="w-3.5 h-3.5" />
                    Contents
                  </div>
                  <nav className="space-y-0.5">
                    {tocItems.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => scrollToHeading(item.slug)}
                        className={cn(
                          'block w-full text-left text-xs py-1 px-2 rounded transition-colors leading-snug',
                          item.level === 3 && 'pl-4',
                          activeToc === item.slug
                            ? 'text-primary bg-primary/10 font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Prev / Next Nav ──────────────────────────────────────────────────────────
function PrevNextNav({ currentId }: { currentId: string }) {
  const { data } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articlesApi.list({ limit: 200 }),
    staleTime: 60_000,
  });

  const articles: Article[] = data?.data ?? [];
  const idx = articles.findIndex((a) => a._id === currentId);
  if (idx === -1 || articles.length < 2) return null;

  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  return (
    <div className="mt-10 pt-6 border-t border-border flex justify-between gap-4">
      {prev ? (
        <Link
          to={`/articles/${prev._id}`}
          className="group flex items-center gap-3 max-w-[45%] text-left hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Previous</div>
            <div className="text-sm font-medium line-clamp-2 leading-snug">{prev.title}</div>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          to={`/articles/${next._id}`}
          className="group flex items-center gap-3 max-w-[45%] text-right hover:text-primary transition-colors"
        >
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Next</div>
            <div className="text-sm font-medium line-clamp-2 leading-snug">{next.title}</div>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
        </Link>
      ) : <div />}
    </div>
  );
}
