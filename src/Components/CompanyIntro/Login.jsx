import React, { useState } from 'react';
import {
  Shield,
  Lock,
  User,
  Terminal,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api'; // ✅ Import axios instance

const CyberVaultLogin = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form State
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on typing
    if (error) setError('');
  };

  // ✅ Handle Login with Axios
  const handleAccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('🔐 Attempting login...');
      console.log('Email:', credentials.email);

      // ✅ Use axios api instance
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      console.log('✅ Login response:', response.data);

      const data = response.data;

      // Check if login was successful
      if (data.success && data.token) {
        console.log('✅ Authentication successful!');

        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        console.log('✅ Token stored:', data.token.substring(0, 20) + '...');

        // Store user data if available
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
          localStorage.setItem('user', JSON.stringify(data.user)); // For compatibility
          console.log('✅ User data stored:', data.user);
        }

        setSuccess(true);

        // Redirect after short delay
        setTimeout(() => {
          console.log('🚀 Redirecting to dashboard...');
          window.location.href = '/admin'; // Change to your dashboard route
        }, 1500);
      } else {
        throw new Error(data.message || 'Invalid response from server');
      }
    } catch (err) {
      console.error('❌ Login error:', err);

      // Handle different error types
      if (err.response) {
        // Server responded with error
        const errorMessage =
          err.response.data?.message || 'Authentication failed';
        setError(errorMessage);
        console.error('Server error:', err.response.data);
      } else if (err.request) {
        // Request made but no response
        setError('Server not responding. Please try again.');
        console.error('No response from server');
      } else {
        // Something else happened
        setError(err.message || 'Access denied. Verify credentials.');
        console.error('Error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono overflow-hidden select-none relative">
      {/* Background Grid - Subtle Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,18,18,0.5)_1.5px,transparent_1.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* The Obsidian Card */}
      <div
        className="relative z-10 w-full max-w-md p-[2px] rounded-sm group transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Glowing Border */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-amber-500 via-transparent to-amber-700 opacity-20 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-20'
          }`}
        ></div>

        {/* Main Body */}
        <div className="bg-[#0A0A0A] p-10 relative border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-6">
              <Shield size={48} className="text-amber-500 opacity-80" />
              <div className="absolute inset-0 blur-lg bg-amber-500/30"></div>
            </div>
            <h2 className="text-amber-100 text-xl tracking-[0.5em] font-light uppercase">
              Access Gateway
            </h2>
            <div className="h-[1px] w-12 bg-amber-500/50 mt-4"></div>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 flex items-center gap-3 rounded border border-rose-500/30 bg-rose-500/5 p-3"
              >
                <AlertCircle size={16} className="text-rose-500" />
                <p className="text-xs text-rose-400 uppercase tracking-wider">
                  {error}
                </p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 flex items-center gap-3 rounded border border-emerald-500/30 bg-emerald-500/5 p-3"
              >
                <CheckCircle2 size={16} className="text-emerald-500" />
                <p className="text-xs text-emerald-400 uppercase tracking-wider">
                  Access Granted. Redirecting...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAccess} className="space-y-10">
            {/* Email Input */}
            <div className="relative">
              <div
                className={`flex items-center gap-4 border-b py-2 transition-all duration-500 ${
                  error
                    ? 'border-rose-500/50'
                    : 'border-white/10 focus-within:border-amber-500/50'
                }`}
              >
                <User size={18} className="text-amber-500/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="IDENTIFICATION EMAIL"
                  value={credentials.email}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none text-amber-50 text-sm tracking-widest placeholder:text-zinc-800 w-full"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div
                className={`flex items-center gap-4 border-b py-2 transition-all duration-500 ${
                  error
                    ? 'border-rose-500/50'
                    : 'border-white/10 focus-within:border-amber-500/50'
                }`}
              >
                <Lock size={18} className="text-amber-500/50" />
                <input
                  type="password"
                  name="password"
                  placeholder="ENCRYPTED KEY"
                  value={credentials.password}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none text-amber-50 text-sm tracking-widest placeholder:text-zinc-800 w-full uppercase"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    loading
                      ? 'bg-amber-500 animate-pulse'
                      : success
                      ? 'bg-emerald-500'
                      : error
                      ? 'bg-rose-500'
                      : 'bg-amber-500 animate-pulse'
                  }`}
                ></div>
                <span>
                  Server:{' '}
                  {loading
                    ? 'Authenticating...'
                    : success
                    ? 'Verified'
                    : error
                    ? 'Error'
                    : 'Online'}
                </span>
              </div>
              <span>Protocol: v4.0.2</span>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full relative group overflow-hidden border border-amber-500/30 bg-transparent py-4 transition-all duration-500 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Inner Glow on Hover */}
              <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

              <span className="relative z-10 flex items-center justify-center gap-3 text-amber-500 text-xs font-bold tracking-[0.4em] uppercase">
                {loading ? (
                  <>
                    <Terminal size={16} className="animate-spin" />
                    Authenticating
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={16} />
                    Access Granted
                  </>
                ) : (
                  <>
                    Engage Protocol <ArrowRight size={14} />
                  </>
                )}
              </span>
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-[10px] text-zinc-600 hover:text-amber-500 tracking-[0.2em] uppercase transition-colors"
                onClick={() => alert('Password recovery feature coming soon')}
              >
                Recovery Protocol
              </button>
            </div>
          </form>

          {/* Card Corners Decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500/30"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500/30"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500/30"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/30"></div>

          {/* Loading Overlay */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
                <p className="text-xs text-amber-500 uppercase tracking-widest animate-pulse">
                  Verifying Credentials
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative Side Numbers (Matrix Style) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 text-zinc-900 text-[10px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>0{i} 12.04.298</span>
        ))}
      </div>

      {/* Success Particle Effect */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: Math.random() * 2,
                opacity: 0,
              }}
              transition={{
                duration: 1 + Math.random(),
                ease: 'easeOut',
              }}
              className="absolute w-1 h-1 bg-amber-500 rounded-full"
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CyberVaultLogin;
