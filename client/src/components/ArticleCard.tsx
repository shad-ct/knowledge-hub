import { Link } from 'react-router-dom';
import { BookmarkPlus, BookmarkCheck, Eye, EyeOff, Clock, User } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { articlesApi, libraryApi } from '../lib/api';
import { cn, formatRelativeDate, formatReadingTime, contentTypeColor, contentTypeLabel, truncate } from '../lib/utils';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isBookmarked?: boolean;
  viewMode?: 'list' | 'grid';
  onReadStatusChange?: () => void;
}

export default function ArticleCard({
  article,
  isBookmarked = false,
  viewMode = 'list',
  onReadStatusChange,
}: ArticleCardProps) {
  const queryClient = useQueryClient();

  const readMutation = useMutation({
    mutationFn: (isRead: boolean) => articlesApi.setReadStatus(article._id, isRead),
    onSuccess: (_, isRead) => {
      toast.success(isRead ? 'Marked as read' : 'Marked as unread');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      onReadStatusChange?.();
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: (add: boolean) =>
      add ? libraryApi.add(article._id) : libraryApi.remove(article._id),
    onSuccess: (_, add) => {
      toast.success(add ? 'Added to library' : 'Removed from library');
      queryClient.invalidateQueries({ queryKey: ['library'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  if (viewMode === 'grid') {
    return (
      <div className={cn(
        'article-card bg-card border border-border rounded-lg p-4 flex flex-col gap-3',
        !article.isRead && 'border-l-2 border-l-primary'
      )}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {!article.isRead && <span className="unread-dot" />}
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded border',
              contentTypeColor[article.contentType]
            )}>
              {contentTypeLabel[article.contentType]}
            </span>
            {article.categoryId && (
              <span className="text-xs text-muted-foreground">
                {article.categoryId.name}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); bookmarkMutation.mutate(!isBookmarked); }}
            className={cn('text-muted-foreground hover:text-primary transition-colors flex-shrink-0',
              isBookmarked && 'text-primary')}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          </button>
        </div>

        {/* Title */}
        <Link to={`/articles/${article._id}`} className="group">
          <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {article.description}
        </p>

        {/* Tags */}
        {article.tagIds && article.tagIds.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tagIds.slice(0, 4).map((tag) => (
              <Link
                key={tag._id}
                to={`/tags/${tag.name}`}
                className="text-xs text-primary/70 hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{truncate(article.author, 20)}</span>
            <span>·</span>
            <Clock className="w-3 h-3" />
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
          <button
            onClick={() => readMutation.mutate(!article.isRead)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title={article.isRead ? 'Mark unread' : 'Mark read'}
          >
            {article.isRead ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className={cn(
      'article-card bg-card border border-border rounded-lg px-4 py-3 flex items-start gap-4',
      !article.isRead && 'border-l-2 border-l-primary'
    )}>
      {/* Unread dot */}
      <div className="flex-shrink-0 mt-1.5">
        {!article.isRead ? (
          <span className="unread-dot" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-transparent flex-shrink-0 block" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <span className={cn(
            'text-xs px-1.5 py-0.5 rounded border flex-shrink-0',
            contentTypeColor[article.contentType]
          )}>
            {contentTypeLabel[article.contentType]}
          </span>
          {article.categoryId && (
            <span className="text-xs text-muted-foreground">{article.categoryId.name}</span>
          )}
          {article.topicIds && article.topicIds.length > 0 && (
            <span className="text-xs text-muted-foreground">
              · {article.topicIds[0].name}
            </span>
          )}
        </div>

        <Link to={`/articles/${article._id}`} className="group block">
          <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors mb-1">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{article.description}</p>
        </Link>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{truncate(article.author, 25)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
          <span className="text-xs text-muted-foreground">{formatRelativeDate(article.publishedAt || article.createdAt)}</span>
          {article.tagIds && article.tagIds.slice(0, 3).map((tag) => (
            <Link
              key={tag._id}
              to={`/tags/${tag.name}`}
              className="text-xs text-primary/70 hover:text-primary transition-colors hidden sm:block"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => readMutation.mutate(!article.isRead)}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded"
          title={article.isRead ? 'Mark unread' : 'Mark read'}
        >
          {article.isRead ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => bookmarkMutation.mutate(!isBookmarked)}
          className={cn(
            'p-1.5 text-muted-foreground hover:text-primary transition-colors rounded',
            isBookmarked && 'text-primary'
          )}
        >
          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

