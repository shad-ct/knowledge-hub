import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen, Menu, MoreHorizontal, Moon, Search, Sun, X } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';
import GlobalSearch from './GlobalSearch';

const primaryItems = [
  { to: '/', label: 'Today', end: true },
  { to: '/library', label: 'Library' },
  { to: '/articles', label: 'All' },
];

const moreItems = [
  { to: '/topics', label: 'Topics' },
  { to: '/categories', label: 'Categories' },
  { to: '/tags', label: 'Tags' },
  { to: '/activity', label: 'Activity Logs' },
  { to: '/trash', label: 'Trash' },
  { to: '/api-docs', label: 'API Docs' },
  { to: '/settings', label: 'Settings' },
  { to: '/articles/new', label: 'New Article' },
];

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isArticleReader = location.pathname.match(/^\/articles\/[^/]+$/) && !location.pathname.endsWith('/edit');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Knowledge Hub</span>
          </NavLink>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {primaryItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => cn(
                  'py-3 text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'font-medium text-foreground',
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button type="button" className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <kbd className="hidden text-[10px] sm:inline">⌘K</kbd>
            </button>
            <button type="button" className="icon-button" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative">
              <button type="button" className="icon-button" aria-label="More destinations" onClick={() => setMoreOpen((open) => !open)}>
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-10 z-40 min-w-44 border border-border bg-surface p-1 shadow-xl">
                  {moreItems.map((item) => (
                    <NavLink key={item.to} to={item.to} onClick={() => setMoreOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={cn(
        'min-h-[calc(100vh-3rem)]',
        isArticleReader ? '' : 'mx-auto w-full max-w-6xl px-4 py-8 pb-24 sm:px-6',
      )}>
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-background/95 px-2 py-2 backdrop-blur md:hidden">
        {primaryItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => cn(
            'flex flex-1 justify-center py-2 text-xs text-muted-foreground',
            isActive && 'font-medium text-foreground',
          )}>
            {item.label}
          </NavLink>
        ))}
        <button type="button" className="flex flex-1 justify-center py-2 text-xs text-muted-foreground" onClick={() => setMoreOpen((open) => !open)}>
          More
        </button>
      </nav>

      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
      {moreOpen && <button aria-label="Close menu" className="fixed inset-0 z-20 cursor-default md:hidden" onClick={() => setMoreOpen(false)} />}
    </div>
  );
}
