import ArticleRow from './ArticleRow';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isBookmarked?: boolean;
  viewMode?: 'list' | 'grid';
  onReadStatusChange?: () => void;
}

export default function ArticleCard({ article, isBookmarked }: ArticleCardProps) {
  return <ArticleRow article={article} isBookmarked={isBookmarked} />;
}
