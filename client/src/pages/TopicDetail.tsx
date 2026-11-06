import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Layers,
  FileText,
  Calendar,
  Tag,
  Key,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { topicsApi } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ArticleCard from '../components/ArticleCard';
import { cn, formatDate, priorityColor, priorityLabel } from '../lib/utils';

export default function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: topicData, isLoading } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => topicsApi.get(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted-foreground">Loading topic details...</p>
      </div>
    );
  }

  const topic = topicData?.data;
  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-lg font-semibold">Topic not found</h2>
        <button
          onClick={() => navigate('/topics')}
          className="mt-3 text-xs text-primary hover:underline"
        >
          Return to Topics
        </button>
      </div>
    );
  }

  const recentArticles = topic.recentArticles || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/topics')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          All Topics
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {topic.status}
              </span>
              <span className={cn('text-xs font-medium', priorityColor[topic.priority])}>
                {priorityLabel[topic.priority]} Priority
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <Layers className="w-7 h-7 text-primary flex-shrink-0" />
              {topic.name}
            </h1>
            <p className="text-base text-muted-foreground mt-2">{topic.description}</p>
          </div>

          <Link
            to={`/articles?topic=${topic.slug}`}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded border border-border text-foreground transition-colors whitespace-nowrap self-start"
          >
            <FileText className="w-3.5 h-3.5" />
            View All {topic.articleCount || 0} Articles
          </Link>
        </div>
      </div>

      {/* Instructions for AI agents */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          Writing Guidelines & Instructions for AI Agents
        </div>
        <p className="text-xs text-muted-foreground">
          External AI agents retrieve these instructions programmatically via{' '}
          <code className="text-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
            GET /api/v1/ai/topics/{topic.slug}/instructions
          </code>{' '}
          before contributing research or articles.
        </p>

        <div className="pt-2 border-t border-border/60">
          {topic.instructions ? (
            <MarkdownRenderer content={topic.instructions} />
          ) : (
            <p className="text-xs text-muted-foreground italic">
              No specific instructions defined for this topic. Standard scholarly standards apply.
            </p>
          )}
        </div>
      </div>

      {/* Keywords and Suggested Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topic.keywords && topic.keywords.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Key className="w-3.5 h-3.5 text-muted-foreground" />
              Keywords
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topic.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {topic.suggestedTags && topic.suggestedTags.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
              Suggested Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topic.suggestedTags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/tags/${tag}`}
                  className="text-xs text-primary/80 hover:text-primary transition-colors bg-primary/10 border border-primary/20 px-2 py-0.5 rounded"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Contributions in this topic */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Recent Articles in {topic.name}
          </h2>
          <span className="text-xs text-muted-foreground">{recentArticles.length} recent</span>
        </div>

        {recentArticles.length > 0 ? (
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center border border-dashed border-border rounded-lg text-xs text-muted-foreground">
            No articles have been published for this topic yet.
          </div>
        )}
      </div>
    </div>
  );
}

