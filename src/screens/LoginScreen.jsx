import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN' });
    navigate('/home');
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Background */}
      <img
        src="https://picsum.photos/seed/analog-login/390/844"
        alt=""
        className="absolute inset-0 w-full h-full object-cover img-moody"
      />
      <div className="absolute inset-0 bg-espresso/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 min-h-dvh flex flex-col justify-end px-6 pb-12 pt-20"
      >
        {/* Branding */}
        <div className="mb-auto pt-16 text-center">
          <h1 className="font-serif text-5xl text-cream font-semibold tracking-wide">
            Analog
          </h1>
          <p className="text-cream/60 text-sm mt-2 tracking-wide">
            Recognition, not rewards
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-espresso/30 backdrop-blur-xl rounded-3xl p-6 border border-cream/10">
          <h2 className="font-serif text-2xl text-cream mb-1">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-cream/50 text-sm mb-6">
            {isSignUp ? 'Your places are waiting' : 'Your places remember you'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream/10 border border-cream/15 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream/10 border border-cream/15 rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="w-full bg-terracotta text-cream py-3.5 rounded-xl text-sm font-medium mt-2 active:bg-terracotta-light transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-cream/15" />
            <span className="text-cream/30 text-xs">or</span>
            <div className="flex-1 h-px bg-cream/15" />
          </div>

          {/* Social auth */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 bg-cream/10 border border-cream/15 rounded-xl py-3 text-cream text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 bg-cream/10 border border-cream/15 rounded-xl py-3 text-cream text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </motion.button>
          </div>

          {/* Toggle */}
          <p className="text-center mt-5 text-cream/50 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-terracotta-light"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
