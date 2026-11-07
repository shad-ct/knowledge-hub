import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Check } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { articlesApi, libraryApi } from '../lib/api';
import { cn, formatReadingTime, formatRelativeDate, truncate } from '../lib/utils';
import type { Article } from '../types';

interface ArticleRowProps {
  article: Article;
  isBookmarked?: boolean;
}

export default function ArticleRow({ article, isBookmarked = Boolean(article.bookmarkedAt) }: ArticleRowProps) {
  const queryClient = useQueryClient();
  const readMutation = useMutation({
    mutationFn: (isRead: boolean) => articlesApi.setReadStatus(article._id, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: () => toast.error('Could not update read status'),
  });
  const bookmarkMutation = useMutation({
    mutationFn: (add: boolean) => add ? libraryApi.add(article._id) : libraryApi.remove(article._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
    onError: () => toast.error('Could not update bookmark'),
  });

  return (
    <div className="group relative flex min-h-20 items-start gap-3 border-b border-border px-2 py-4 transition-colors hover:bg-surface">
      <span className="mt-2 flex w-2 flex-shrink-0 justify-center" aria-hidden="true">
        {!article.isRead && <span className="unread-dot" />}
      </span>
      {!article.isRead && <span className="sr-only">Unread</span>}
      <Link to={`/articles/${article._id}`} className="min-w-0 flex-1 focus-visible:outline-none">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={cn(
              'text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] transition-colors',
              article.isRead ? 'text-text-faint' : 'text-foreground',
            )}>
              {article.title}
            </h3>
            <p className="mt-1 truncate text-sm text-muted-foreground">{truncate(article.description, 140)}</p>
            <p className="mt-2 text-xs text-text-faint">
              {article.author} <span aria-hidden="true">·</span> {formatRelativeDate(article.publishedAt || article.createdAt)}
            </p>
          </div>
          <span className="flex-shrink-0 pt-0.5 text-xs tabular-nums text-text-faint">
            {formatReadingTime(article.readingTime).replace(' read', '')}
          </span>
        </div>
      </Link>
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          aria-label={article.isRead ? 'Mark unread' : 'Mark read'}
          onClick={() => readMutation.mutate(!article.isRead)}
          className="icon-button"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          onClick={() => bookmarkMutation.mutate(!isBookmarked)}
          className={cn('icon-button', isBookmarked && 'text-primary')}
        >
          {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
