import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
      <section className="hidden lg:block">
        <div className="max-w-xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-md bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-700">
            <Lock size={16} />
            Reader account
          </span>
          <h1 className="text-5xl font-black leading-tight text-slate-950">Welcome Back</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Sign in to keep your saved stories close and your feed moving.
          </p>
        </div>
      </section>

      <div className="rounded-lg border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur sm:p-8">
        <div className="mb-8 text-center lg:text-left">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-orange-100 lg:mx-0">
            <LogIn size={26} />
          </div>
          <h2 className="text-3xl font-black text-slate-950">Sign In</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">Enter your account details</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-10 py-2 pr-12 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 font-black text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <LogIn size={20} />
            <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-semibold">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-orange-600 underline decoration-orange-200 underline-offset-4 hover:text-orange-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
