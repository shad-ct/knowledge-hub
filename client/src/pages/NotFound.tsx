import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        <BookOpen className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">404</h1>
      <h2 className="text-lg font-semibold text-foreground mt-2">Document or Page Not Found</h2>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm">
        The knowledge artifact or section you requested does not exist or may have been archived.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Overview
      </Link>
    </div>
  );
}

