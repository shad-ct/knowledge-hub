import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  CheckCircle2,
  Layers,
  FolderOpen,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  RefreshCw,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { articlesApi, topicsApi, activityApi } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import {
  formatRelativeDate,
  activityActionLabel,
  cn,
} from '../lib/utils';
import type { DashboardStats, Topic, ActivityLog } from '../types';

// ─── Skeleton helpers ──────────────────────────────────────────────────────────
function StatCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-md bg-muted" />
        <div className="w-16 h-4 rounded bg-muted" />
      </div>
      <div className="w-12 h-7 rounded bg-muted mb-1" />
      <div className="w-24 h-3 rounded bg-muted" />
    </div>
  );
}

function ArticleRowSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-start gap-4 animate-pulse">
      <div className="w-2 h-2 rounded-full bg-muted mt-1.5 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex gap-2">
          <div className="w-16 h-4 rounded bg-muted" />
          <div className="w-20 h-4 rounded bg-muted" />
        </div>
        <div className="w-3/4 h-4 rounded bg-muted" />
        <div className="w-1/2 h-3 rounded bg-muted" />
        <div className="flex gap-3">
          <div className="w-16 h-3 rounded bg-muted" />
          <div className="w-12 h-3 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

function TopicRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 animate-pulse">
      <div className="w-8 h-8 rounded-md bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="w-32 h-3.5 rounded bg-muted" />
        <div className="w-48 h-3 rounded bg-muted" />
      </div>
      <div className="w-12 h-5 rounded bg-muted" />
    </div>
  );
}

function ActivityRowSkeleton() {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0 animate-pulse">
      <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="w-48 h-3.5 rounded bg-muted" />
        <div className="w-32 h-3 rounded bg-muted" />
      </div>
      <div className="w-16 h-3 rounded bg-muted" />
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  to: string;
  accent?: string;
  description?: string;
}

function StatCard({ label, value, icon, to, accent = 'text-primary', description }: StatCardProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-card border border-border rounded-lg p-4 text-left hover:border-primary/40 hover:bg-accent/30 transition-all duration-200 group w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn('p-2 rounded-md bg-muted', accent)}>
          {icon}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className={cn('text-2xl font-bold tabular-nums', accent)}>
        {value ?? '—'}
      </div>
      <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground/60 mt-1">{description}</div>
      )}
    </button>
  );
}

// ─── Activity icon helper ─────────────────────────────────────────────────────
function activityIcon(action: string) {
  if (action.includes('created')) return '✦';
  if (action.includes('updated')) return '✎';
  if (action.includes('deleted') || action.includes('permanently')) return '✕';
  if (action.includes('read')) return '◎';
  if (action.includes('bookmark')) return '⊹';
  if (action.includes('published')) return '⚡';
  if (action.includes('restored')) return '↩';
  if (action.includes('backup')) return '◈';
  return '·';
}

function activityIconColor(action: string) {
  if (action.includes('created') || action.includes('published')) return 'text-green-400 bg-green-500/10';
  if (action.includes('updated')) return 'text-blue-400 bg-blue-500/10';
  if (action.includes('deleted') || action.includes('permanently')) return 'text-red-400 bg-red-500/10';
  if (action.includes('bookmark')) return 'text-yellow-400 bg-yellow-500/10';
  if (action.includes('restored')) return 'text-orange-400 bg-orange-500/10';
  return 'text-muted-foreground bg-muted';
}

// ─── Priority badge ───────────────────────────────────────────────────────────
const priorityBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  low: 'bg-muted text-muted-foreground border-border',
};

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  title,
  icon,
  to,
  linkLabel = 'View all',
}: {
  title: string;
  icon: React.ReactNode;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{title}</h2>
      </div>
      {to && (
        <Link
          to={to}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {linkLabel}
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function Dashboard() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => articlesApi.getStats(),
  });

  const { data: recentData, isLoading: recentLoading } = useQuery({
    queryKey: ['articles', 'recent'],
    queryFn: () =>
      articlesApi.list({
        limit: 6,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
        status: 'published',
      }),
  });

  const { data: updatedData, isLoading: updatedLoading } = useQuery({
    queryKey: ['articles', 'recently-updated'],
    queryFn: () =>
      articlesApi.list({
        limit: 4,
        sortBy: 'updatedAt',
        sortOrder: 'desc',
        status: 'published',
      }),
  });

  const { data: topicsData, isLoading: topicsLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['activity'],
    queryFn: () => activityApi.list({ limit: 8 }),
  });

  const stats: DashboardStats | undefined = statsData?.data;
  const recentArticles = recentData?.data ?? [];
  const updatedArticles = updatedData?.data ?? [];
  const topics: Topic[] = (topicsData?.data ?? [])
    .slice()
    .sort((a, b) => (b.articleCount ?? 0) - (a.articleCount ?? 0))
    .slice(0, 8);
  const activities: ActivityLog[] = activityData?.data ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your knowledge hub
        </p>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────────────── */}
      <section>
        {statsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard
              label="Total Articles"
              value={stats?.total}
              icon={<FileText className="w-4 h-4" />}
              to="/articles"
              accent="text-foreground"
            />
            <StatCard
              label="Unread"
              value={stats?.unread}
              icon={<BookOpen className="w-4 h-4" />}
              to="/articles?isRead=false"
              accent="text-primary"
            />
            <StatCard
              label="Read"
              value={stats?.read}
              icon={<CheckCircle2 className="w-4 h-4" />}
              to="/articles?isRead=true"
              accent="text-green-400"
            />
            <StatCard
              label="Topics"
              value={stats?.topics}
              icon={<Layers className="w-4 h-4" />}
              to="/topics"
              accent="text-blue-400"
            />
            <StatCard
              label="Categories"
              value={stats?.categories}
              icon={<FolderOpen className="w-4 h-4" />}
              to="/categories"
              accent="text-orange-400"
            />
            <StatCard
              label="Contributors"
              value={stats?.contributors}
              icon={<Users className="w-4 h-4" />}
              to="/articles"
              accent="text-purple-400"
            />
          </div>
        )}
      </section>

      {/* ── Main grid: 2/3 + 1/3 ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recently Published */}
          <section>
            <SectionHeader
              title="Recently Published"
              icon={<TrendingUp className="w-4 h-4" />}
              to="/articles?sortBy=publishedAt&sortOrder=desc"
              linkLabel="All articles"
            />
            {recentLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ArticleRowSkeleton key={i} />
                ))}
              </div>
            ) : recentArticles.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No published articles yet.</p>
                <Link
                  to="/articles/new"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Create the first article
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} viewMode="list" />
                ))}
              </div>
            )}
          </section>

          {/* Recently Updated */}
          <section>
            <SectionHeader
              title="Recently Updated"
              icon={<RefreshCw className="w-4 h-4" />}
              to="/articles?sortBy=updatedAt&sortOrder=desc"
              linkLabel="Browse"
            />
            {updatedLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ArticleRowSkeleton key={i} />
                ))}
              </div>
            ) : updatedArticles.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground">No updated articles found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {updatedArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} viewMode="list" />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Topic Activity */}
          <section>
            <SectionHeader
              title="Topic Activity"
              icon={<Layers className="w-4 h-4" />}
              to="/topics"
              linkLabel="All topics"
            />
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              {topicsLoading ? (
                <div className="p-4 space-y-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TopicRowSkeleton key={i} />
                  ))}
                </div>
              ) : topics.length === 0 ? (
                <div className="p-6 text-center">
                  <Layers className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No topics created yet.</p>
                  <Link
                    to="/topics"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Create topics
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                topics.map((topic) => (
                  <Link
                    key={topic._id}
                    to={`/topics/${topic._id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {topic.name}
                        </span>
                        <span
                          className={cn(
                            'text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0',
                            priorityBadge[topic.priority] ?? priorityBadge.low
                          )}
                        >
                          {topic.priority}
                        </span>
                      </div>
                      {topic.lastContribution && (
                        <p className="text-xs text-muted-foreground">
                          Updated {formatRelativeDate(topic.lastContribution)}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-sm font-semibold tabular-nums text-primary">
                        {topic.articleCount ?? 0}
                      </span>
                      <p className="text-[10px] text-muted-foreground">articles</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <SectionHeader
              title="Recent Activity"
              icon={<Activity className="w-4 h-4" />}
              to="/activity"
              linkLabel="Full log"
            />
            <div className="bg-card border border-border rounded-lg">
              {activityLoading ? (
                <div className="p-4 space-y-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ActivityRowSkeleton key={i} />
                  ))}
                </div>
              ) : activities.length === 0 ? (
                <div className="p-6 text-center">
                  <Activity className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No activity recorded yet.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {activities.map((log) => (
                    <li key={log._id} className="flex items-start gap-3 px-4 py-3">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5',
                          activityIconColor(log.action)
                        )}
                      >
                        {activityIcon(log.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium leading-snug">
                          {activityActionLabel[log.action] ?? log.action}
                        </p>
                        {log.entityTitle && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {log.entityId && log.entityType === 'article' ? (
                              <Link
                                to={`/articles/${log.entityId}`}
                                className="hover:text-primary transition-colors"
                              >
                                {log.entityTitle}
                              </Link>
                            ) : (
                              log.entityTitle
                            )}
                          </p>
                        )}
                        {log.actor && (
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                            by {log.actor}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{formatRelativeDate(log.timestamp)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
