import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';

const tabs = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/experiences', icon: Compass, label: 'Experiences' },
  { to: '/community', icon: Users, label: 'Community' },
];

export default function BottomNav() {
  const scrollDirection = useScrollDirection();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === 'down' ? 100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl z-50"
    >
      <div className="bg-espresso/95 backdrop-blur-md px-6 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex justify-around items-center">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 py-1 px-4"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? 'text-terracotta' : 'text-cream/60'}
              />
              <span
                className={`text-[10px] tracking-wide ${
                  isActive ? 'text-terracotta font-medium' : 'text-cream/60'
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
