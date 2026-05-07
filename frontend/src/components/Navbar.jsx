import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Bookmark, Home, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="hn-header sticky top-0 z-30 border-b border-white/70 shadow-sm shadow-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <Link to="/" className="group flex min-w-0 items-center gap-3 font-bold">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-lg text-white shadow-lg shadow-orange-200 ring-4 ring-orange-100 transition-transform group-hover:-rotate-3">
                Y
              </span>
              <span className="truncate text-lg text-slate-950 sm:text-xl">Hacker News</span>
            </Link>
            
            <div className="hidden items-center gap-2 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                <Home size={18} />
                <span>Home</span>
              </NavLink>
              
              {isAuthenticated && (
                <NavLink
                  to="/bookmarks"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                >
                  <Bookmark size={18} />
                  <span>Bookmarks</span>
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:flex">
                  <User size={18} />
                  <span>{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  <Sparkles size={16} />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
