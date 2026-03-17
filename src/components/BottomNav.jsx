import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/experiences', icon: Sparkles, label: 'Experiences' },
  { path: '/community', icon: Users, label: 'Community' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-40">
      <div className="bg-cream/90 backdrop-blur-md border-t border-sand/50 px-6 pb-6 pt-3">
        <div className="flex items-center justify-around">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(path)
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1 cursor-pointer relative"
              >
                <div className="relative p-2">
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-terracotta/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-terracotta' : 'text-espresso/40'
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-terracotta' : 'text-espresso/40'
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
