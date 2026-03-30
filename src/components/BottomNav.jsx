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
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      aria-label="Main navigation"
    >
      <div className="bg-bg-deep/95 backdrop-blur-lg px-6 pt-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex justify-around items-center border-t border-border">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-1 py-1 px-5 min-w-[44px] min-h-[44px] justify-center" aria-current={isActive ? 'page' : undefined}>
              <Icon size={21} strokeWidth={isActive ? 2 : 1.5} className={`transition-colors duration-200 ${isActive ? 'text-gold' : 'text-text-muted'}`} />
              <span className={`text-[10px] tracking-wide transition-colors duration-200 ${isActive ? 'text-gold font-semibold' : 'text-text-muted'}`}>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
