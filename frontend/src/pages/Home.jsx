import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI, scrapeAPI } from '../services/api';
import { Bookmark, ExternalLink, Flame, RefreshCw, ShieldCheck, User, Zap } from 'lucide-react';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { isAuthenticated } = useAuth();

  const fetchStories = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      const response = await storiesAPI.getStories(page, 10);
      setStories(response.data.stories);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  const refreshStories = async (page = 1, showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setScraping(true);
      setError('');
      await scrapeAPI.scrape();
      const response = await storiesAPI.getStories(page, 10);
      setStories(response.data.stories);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to scrape new stories');
      await fetchStories(page);
    } finally {
      setScraping(false);
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleScrape = () => {
    refreshStories(1);
  };

  const handleBookmark = async (storyId) => {
    if (!isAuthenticated) return;
    
    try {
      await storiesAPI.toggleBookmark(storyId);
      await fetchStories(currentPage);
    } catch (err) {
      setError('Failed to toggle bookmark');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {
    refreshStories(1, true);
  }, []);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-lg border border-white/80 bg-slate-950 px-5 py-6 text-white shadow-2xl shadow-slate-200 sm:px-8 sm:py-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-sky-400" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-orange-100 ring-1 ring-white/15">
              <Flame size={16} />
              Live Hacker News digest
            </div>
            <h1 className="text-3xl font-black tracking-normal sm:text-5xl">Top Stories</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Fresh links, sharp signals, and bookmarkable finds from the developer front page.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="rounded-lg bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <div className="text-2xl font-black">{stories.length || '--'}</div>
              <div className="text-xs font-semibold uppercase text-slate-300">Loaded</div>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <div className="text-2xl font-black">{pagination?.pages || '--'}</div>
              <div className="text-xs font-semibold uppercase text-slate-300">Pages</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-lg border border-white/80 bg-white/80 p-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 px-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
            <Zap size={20} />
          </span>
          <div>
            <h2 className="text-base font-black text-slate-950">Story Feed</h2>
            <p className="text-sm text-slate-500">
              {scraping ? 'Fetching fresh Hacker News stories...' : `Page ${currentPage}${pagination ? ` of ${pagination.pages}` : ''}`}
            </p>
          </div>
        </div>
        <button
          onClick={handleScrape}
          disabled={scraping}
          className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <RefreshCw size={18} className={scraping ? 'animate-spin' : ''} />
          <span>{scraping ? 'Scraping...' : 'Refresh Stories'}</span>
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid min-h-80 place-items-center rounded-lg border border-white/80 bg-white/70 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500"></div>
            <p className="text-sm font-semibold text-slate-500">Loading stories...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {stories.map((story, index) => (
              <article key={story._id} className="group rounded-lg border border-white/80 bg-white/90 p-4 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-black text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-2 text-lg font-black leading-snug text-slate-950 sm:text-xl">
                          <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hn-link inline-flex min-w-0 items-start gap-2 hover:text-orange-600"
                          >
                            <span>{story.title}</span>
                            <ExternalLink size={16} className="mt-1 shrink-0 text-slate-400" />
                          </a>
                        </h3>
                        
                        <div className="hn-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700">
                            <span className="font-medium">{story.points}</span>
                            <span>points</span>
                          </span>
                          
                          <span className="inline-flex items-center gap-1">
                            <User size={14} />
                            <span>{story.author}</span>
                          </span>
                          
                          <span>{formatDate(story.postedAt)}</span>
                        </div>
                      </div>
                      
                      {isAuthenticated && (
                        <button
                          onClick={() => handleBookmark(story._id)}
                          className="bookmark-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-400 ring-1 ring-slate-200 transition hover:bg-orange-50 hover:text-orange-600"
                          title="Toggle bookmark"
                        >
                          <Bookmark 
                            size={18} 
                            className={story.isBookmarked ? 'bookmarked fill-current' : ''}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-lg border border-white/80 bg-white/75 p-4 shadow-sm sm:flex-row">
              <button
                onClick={() => fetchStories(currentPage - 1)}
                disabled={currentPage === 1}
                className="min-h-10 w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Previous
              </button>
              
              <span className="rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                Page {currentPage} of {pagination.pages}
              </span>
              
              <button
                onClick={() => fetchStories(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="min-h-10 w-full rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Next
              </button>
            </div>
          )}

          {!isAuthenticated && stories.length > 0 && (
            <div className="mt-8 rounded-lg border border-orange-100 bg-orange-50 px-5 py-4 text-center shadow-sm">
              <p className="inline-flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-orange-900">
                <ShieldCheck size={18} />
                <Link to="/register" className="text-orange-700 underline decoration-orange-300 underline-offset-4 hover:text-orange-800">
                  Create an account
                </Link>
                <span>to bookmark your favorite stories</span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
