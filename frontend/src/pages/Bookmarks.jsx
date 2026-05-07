import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../services/api';
import { Bookmark, ExternalLink, Library, User } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await storiesAPI.getBookmarks();
      setBookmarks(response.data.bookmarks);
    } catch (err) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (storyId) => {
    try {
      await storiesAPI.toggleBookmark(storyId);
      await fetchBookmarks();
    } catch (err) {
      setError('Failed to remove bookmark');
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
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="mx-auto grid min-h-80 max-w-xl place-items-center rounded-lg border border-white/80 bg-white/85 p-8 text-center shadow-xl shadow-slate-200/70">
        <div>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
            <Bookmark size={28} />
          </div>
          <h2 className="mb-3 text-2xl font-black text-slate-950">Authentication Required</h2>
          <p className="text-slate-600">
            Please <Link to="/login" className="font-bold text-orange-600 underline decoration-orange-200 underline-offset-4 hover:text-orange-700">sign in</Link> to view your bookmarks.
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/80 bg-white/85 p-5 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Library size={28} />
            </span>
            <div>
              <h1 className="text-3xl font-black text-slate-950">My Bookmarks</h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">{bookmarks.length} saved stories</p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Browse Stories
          </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid min-h-80 place-items-center rounded-lg border border-white/80 bg-white/70 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500"></div>
            <p className="text-sm font-semibold text-slate-500">Loading bookmarks...</p>
          </div>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-orange-200 bg-orange-50/70 p-8 text-center shadow-sm">
          <div>
            <Bookmark size={52} className="mx-auto mb-4 text-orange-300" />
            <h3 className="mb-2 text-xl font-black text-slate-950">No bookmarks yet</h3>
            <p className="text-slate-600">
              Start bookmarking your favorite stories from the <Link to="/" className="font-bold text-orange-600 underline decoration-orange-200 underline-offset-4 hover:text-orange-700">home page</Link>.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((story, index) => (
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
                    
                    <button
                      onClick={() => handleBookmark(story._id)}
                      className="bookmark-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-50 text-orange-600 ring-1 ring-orange-100 transition hover:bg-orange-100"
                      title="Remove bookmark"
                    >
                      <Bookmark 
                        size={18} 
                        className="bookmarked fill-current text-orange-600"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
