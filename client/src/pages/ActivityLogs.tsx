import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  FilePlus,
  FileEdit,
  Trash2,
  RotateCcw,
  Flame,
  Eye,
  EyeOff,
  BookmarkPlus,
  BookmarkMinus,
  Bot,
  Layers,
  FolderOpen,
  Hash,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { activityApi } from '../lib/api';
import { formatRelativeDate, formatDate, activityActionLabel, cn } from '../lib/utils';
import type { ActivityLog } from '../types';

const actionIcons: Record<string, React.ReactNode> = {
  'article.created': <FilePlus className="w-4 h-4 text-emerald-400" />,
  'article.updated': <FileEdit className="w-4 h-4 text-blue-400" />,
  'article.deleted': <Trash2 className="w-4 h-4 text-orange-400" />,
  'article.restored': <RotateCcw className="w-4 h-4 text-cyan-400" />,
  'article.permanently_deleted': <Flame className="w-4 h-4 text-red-400" />,
  'article.read': <Eye className="w-4 h-4 text-indigo-400" />,
  'article.unread': <EyeOff className="w-4 h-4 text-gray-400" />,
  'article.bookmarked': <BookmarkPlus className="w-4 h-4 text-purple-400" />,
  'article.unbookmarked': <BookmarkMinus className="w-4 h-4 text-gray-400" />,
  'article.published_by_ai': <Bot className="w-4 h-4 text-violet-400" />,
  'topic.created': <Layers className="w-4 h-4 text-emerald-400" />,
  'topic.updated': <Layers className="w-4 h-4 text-blue-400" />,
  'topic.deleted': <Layers className="w-4 h-4 text-red-400" />,
  'category.created': <FolderOpen className="w-4 h-4 text-emerald-400" />,
  'category.updated': <FolderOpen className="w-4 h-4 text-blue-400" />,
  'category.deleted': <FolderOpen className="w-4 h-4 text-red-400" />,
  'tag.created': <Hash className="w-4 h-4 text-green-400" />,
};

export default function ActivityLogsPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [actorFilter, setActorFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data: activityData, isLoading } = useQuery({
    queryKey: [
      'activity',
      {
        page,
        limit: 30,
        search: search || undefined,
        action: actionFilter || undefined,
        entityType: entityFilter || undefined,
        actor: actorFilter || undefined,
      },
    ],
    queryFn: () =>
      activityApi.list({
        page,
        limit: 30,
        search: search || undefined,
        action: actionFilter || undefined,
        entityType: entityFilter || undefined,
        actor: actorFilter || undefined,
      }),
  });

  const logs = activityData?.data || [];
  const total = activityData?.pagination.total || 0;
  const totalPages = activityData?.pagination.pages || 1;

  const isAiActor = (actor: string) => {
    const lower = actor.toLowerCase();
    return lower.includes('bot') || lower.includes('claude') || lower.includes('gpt') || lower.includes('agent') || lower.includes('ai');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Audit trail of all publishing, curation, reading, and administrative operations
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-card border border-border rounded-lg p-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title or target entity..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-1.5 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by actor..."
              value={actorFilter}
              onChange={(e) => {
                setActorFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-1.5 text-xs outline-none focus:border-primary"
            />
          </div>

          <select
            value={entityFilter}
            onChange={(e) => {
              setEntityFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-border rounded-md px-2.5 py-1.5 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="">All Entities</option>
            <option value="article">Articles</option>
            <option value="topic">Topics</option>
            <option value="category">Categories</option>
            <option value="tag">Tags</option>
          </select>

          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="bg-background border border-border rounded-md px-2.5 py-1.5 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="">All Actions</option>
            <option value="article.created">Article Created</option>
            <option value="article.published_by_ai">Published by AI</option>
            <option value="article.updated">Article Updated</option>
            <option value="article.deleted">Article Deleted</option>
            <option value="article.read">Marked as Read</option>
            <option value="article.bookmarked">Bookmarked</option>
            <option value="topic.created">Topic Created</option>
          </select>
        </div>
      </div>

      {/* Logs Timeline */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 bg-card border border-border rounded-lg animate-pulse" />
          ))}
        </div>
      ) : logs.length > 0 ? (
        <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
          {logs.map((log) => {
            const isAi = isAiActor(log.actor);
            return (
              <div
                key={log._id}
                className="p-3.5 flex items-center gap-3.5 hover:bg-accent/40 transition-colors"
              >
                {/* Action Icon */}
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  {actionIcons[log.action] || <Activity className="w-4 h-4 text-muted-foreground" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-foreground">
                      {activityActionLabel[log.action] || log.action}
                    </span>
                    {log.entityTitle && (
                      <span className="text-xs text-muted-foreground truncate max-w-md font-medium">
                        "{log.entityTitle}"
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                    <span className="capitalize">{log.entityType}</span>
                    <span>·</span>
                    <span>{formatDate(log.timestamp)} ({formatRelativeDate(log.timestamp)})</span>
                  </div>
                </div>

                {/* Actor pill */}
                <div className="flex-shrink-0">
                  <span
                    className={cn(
                      'text-xs px-2.5 py-0.5 rounded-full border flex items-center gap-1.5',
                      isAi
                        ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    )}
                  >
                    {isAi ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    <span>{log.actor}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/40">
          <Activity className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-sm">No activity records</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Operations performed by you and external AI agents will be automatically logged here.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
          <span className="text-muted-foreground">
            Page {page} of {totalPages} ({total} events logged)
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

