import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { articlesApi } from '../lib/api';
import ArticleRow from '../components/ArticleRow';
import { format } from 'date-fns';

function SkeletonRow() {
  return (
    <div className="animate-pulse border-b border-border px-2 py-4">
      <div className="h-5 w-3/4 rounded bg-muted" />
      <div className="mt-2 h-4 w-full rounded bg-muted" />
      <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
    </div>
  );
}

export default function Home() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['home'],
    queryFn: () => articlesApi.getHome(Intl.DateTimeFormat().resolvedOptions().timeZone),
  });
  const markAllRead = useMutation({
    mutationFn: (ids: string[]) => articlesApi.bulkReadStatus(ids, true),
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['home'] });
      toast.success('Yesterday marked as read', {
        action: {
          label: 'Undo',
          onClick: () => {
            articlesApi.bulkReadStatus(ids, false).then(() => {
              queryClient.invalidateQueries({ queryKey: ['home'] });
            }).catch(() => toast.error('Could not undo read status'));
          },
        },
      });
    },
    onError: () => toast.error('Could not mark articles as read'),
  });

  const home = data?.data;
  const today = home?.today ?? [];
  const yesterday = home?.yesterdayUnread ?? [];
  const totalNew = today.length;
  const summary = totalNew && yesterday.length
    ? `${totalNew} new today · ${yesterday.length} unread from yesterday`
    : totalNew
      ? `${totalNew} new today`
      : yesterday.length
        ? `Nothing new today · ${yesterday.length} unread from yesterday`
        : "You're all caught up.";

  return (
    <div className="home-column">
      <header className="mb-10">
        <p className="text-[13px] text-muted-foreground">{format(new Date(), 'EEEE, d MMMM')}</p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em]">Today</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">{summary}</p>
      </header>

      {isError ? (
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load. <button className="text-primary hover:underline" onClick={() => refetch()}>Retry</button>
        </p>
      ) : isLoading ? (
        <div>{[1, 2, 3].map((item) => <SkeletonRow key={item} />)}</div>
      ) : today.length === 0 && yesterday.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-semibold">You&apos;re all caught up.</p>
          <p className="mt-2 text-sm text-muted-foreground">New articles from your AI agents will appear here.</p>
        </div>
      ) : (
        <>
          {today.length > 0 && (
            <section>
              <p className="section-label">Today</p>
              <div>{today.map((article) => <ArticleRow key={article._id} article={article} />)}</div>
            </section>
          )}
          {yesterday.length > 0 && (
            <section className="mt-10">
              <div className="mb-1 flex items-center justify-between">
                <p className="section-label">Unread from yesterday</p>
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => markAllRead.mutate(yesterday.map((article) => article._id))}
                >
                  Mark all read
                </button>
              </div>
              {yesterday.map((article) => <ArticleRow key={article._id} article={article} />)}
              {!!home?.olderUnreadCount && (
                <a className="mt-4 inline-block text-sm text-primary hover:underline" href="/articles?isRead=false">
                  + {home.olderUnreadCount} older unread →
                </a>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
