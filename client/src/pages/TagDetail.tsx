import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Hash, FileText } from 'lucide-react';
import { tagsApi } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function TagDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data: tagData, isLoading } = useQuery({
    queryKey: ['tag', name],
    queryFn: () => tagsApi.get(name!),
    enabled: !!name,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted-foreground">Loading articles for tag #{name}...</p>
      </div>
    );
  }

  const tag = tagData?.data?.tag;
  const articles = tagData?.data?.articles || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/tags')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          All Tags
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              #{tag?.displayName || name}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'} tagged with this topic
            </p>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3 pt-2">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/30">
            <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground text-sm">No articles</h3>
            <p className="text-xs text-muted-foreground mt-1">
              No articles are currently tagged with #{name}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

