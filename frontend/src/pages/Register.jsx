import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';

const getAuthErrorMessage = (err, fallback) => {
  const data = err.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((error) => error.msg || error).join('. ');
  }

  return data?.message || fallback;
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmedUsername)) {
      setError('Username must be 3-30 characters and can only contain letters, numbers, and underscores');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(trimmedUsername, trimmedEmail, password);
      navigate('/');
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Registration failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_460px]">
      <section className="hidden lg:block">
        <div className="max-w-xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-md bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-700">
            <UserPlus size={16} />
            New reader
          </span>
          <h1 className="text-5xl font-black leading-tight text-slate-950">Create Account</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Save the links worth returning to and build your personal story shelf.
          </p>
        </div>
      </section>

      <div className="rounded-lg border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur sm:p-8">
        <div className="mb-8 text-center lg:text-left">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-orange-100 lg:mx-0">
            <UserPlus size={26} />
          </div>
          <h2 className="text-3xl font-black text-slate-950">Sign Up</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">Create your reader profile</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-bold text-slate-700">
              Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                placeholder="Choose a username"
                required
                minLength={3}
                maxLength={30}
                pattern="[A-Za-z0-9_]+"
                title="Use 3-30 letters, numbers, or underscores only"
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-500">Use 3-30 letters, numbers, or underscores.</p>
          </div>

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
                placeholder="Create a password"
                required
                minLength={6}
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

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 font-black text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <UserPlus size={20} />
            <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-semibold">
          <p className="text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-orange-600 underline decoration-orange-200 underline-offset-4 hover:text-orange-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
