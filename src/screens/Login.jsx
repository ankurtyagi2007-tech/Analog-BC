import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
    navigate('/home')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img
        src="https://picsum.photos/seed/analog-login/390/844"
        alt="Hospitality atmosphere"
        className="absolute inset-0 w-full h-full object-cover img-moody"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/20" />

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-auto mt-20"
        >
          <h1 className="font-serif text-5xl font-bold text-cream text-shadow-lg">
            Analog
          </h1>
          <p className="text-cream/70 text-lg font-light mt-2">
            Cultured hospitality, recognized.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="bg-cream/95 backdrop-blur-sm rounded-3xl p-6 space-y-4 shadow-2xl"
        >
          <h2 className="font-serif text-2xl font-semibold text-espresso text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {isSignUp && (
            <motion.input
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl bg-sand/20 border border-sand/40 text-espresso placeholder-espresso/40 text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-sand/20 border border-sand/40 text-espresso placeholder-espresso/40 text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-sand/20 border border-sand/40 text-espresso placeholder-espresso/40 text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 bg-espresso text-cream rounded-full text-sm font-semibold cursor-pointer hover:bg-espresso-light transition-colors"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </motion.button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sand/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-cream/95 px-3 text-espresso/40">or continue with</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="button" className="flex-1 py-3 rounded-xl border border-sand/40 text-espresso/60 text-sm font-medium cursor-pointer hover:bg-sand/10 transition-colors">
              Google
            </button>
            <button type="button" className="flex-1 py-3 rounded-xl border border-sand/40 text-espresso/60 text-sm font-medium cursor-pointer hover:bg-sand/10 transition-colors">
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-espresso/50">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-terracotta font-medium cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  )
}
