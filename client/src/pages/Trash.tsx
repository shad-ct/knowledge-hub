import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Trash2,
  RotateCcw,
  Flame,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from 'lucide-react';
import { articlesApi } from '../lib/api';
import { formatDate, formatRelativeDate, truncate } from '../lib/utils';
import type { Article } from '../types';

export default function TrashPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data: trashData, isLoading } = useQuery({
    queryKey: ['trash', page],
    queryFn: () => articlesApi.getTrash(page, 20),
  });

  const restoreMutation = useMutation({
    mutationFn: articlesApi.restore,
    onSuccess: () => {
      toast.success('Article restored to repository');
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: () => toast.error('Failed to restore article'),
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: articlesApi.permanentDelete,
    onSuccess: () => {
      toast.success('Article permanently deleted');
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: () => toast.error('Failed to delete permanently'),
  });

  const handlePermanentDelete = (id: string, title: string) => {
    if (window.confirm(`Permanently delete "${title}"? This action cannot be undone.`)) {
      permanentDeleteMutation.mutate(id);
    }
  };

  const handleEmptyTrash = async () => {
    const articles = trashData?.data || [];
    if (articles.length === 0) return;

    if (
      window.confirm(
        `Are you sure you want to permanently delete all ${articles.length} articles in trash? This cannot be undone.`
      )
    ) {
      for (const a of articles) {
        await articlesApi.permanentDelete(a._id);
      }
      toast.success('Trash emptied');
      queryClient.invalidateQueries({ queryKey: ['trash'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    }
  };

  const articles = trashData?.data || [];
  const total = trashData?.pagination.total || 0;
  const totalPages = trashData?.pagination.pages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trash</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Soft-deleted articles can be restored or permanently removed
          </p>
        </div>

        {articles.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-xs font-medium hover:bg-destructive/20 transition-colors"
          >
            <Flame className="w-3.5 h-3.5" />
            Empty Trash
          </button>
        )}
      </div>

      {/* Articles in trash */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-card border border-border rounded-lg animate-pulse" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {article.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author}
                  </span>
                  <span>·</span>
                  <span className="text-destructive/80">
                    Deleted {formatRelativeDate(article.deletedAt || undefined)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => restoreMutation.mutate(article._id)}
                  disabled={restoreMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-primary" />
                  Restore
                </button>
                <button
                  onClick={() => handlePermanentDelete(article._id, article.title)}
                  disabled={permanentDeleteMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-medium transition-colors"
                >
                  <Flame className="w-3.5 h-3.5" />
                  Delete Forever
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/40">
          <Trash2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-sm">Trash is empty</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Deleted articles will appear here for recovery before permanent removal.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
          <span className="text-muted-foreground">
            Page {page} of {totalPages} ({total} trashed items)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-border disabled:opacity-40 hover:bg-muted"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-border disabled:opacity-40 hover:bg-muted"
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
