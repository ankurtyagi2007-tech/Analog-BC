import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import TierBadge from '../components/TierBadge';

export default function HomeScreen() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh bg-espresso">
      {/* Top bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 flex items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 bg-gradient-to-b from-espresso/80 via-espresso/40 to-transparent">
        <h1 className="font-serif text-xl text-cream font-semibold tracking-wide">Analog</h1>
        <button
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-cream/12 backdrop-blur-md flex items-center justify-center hover:bg-cream/18 transition-colors cursor-pointer"
          aria-label="Profile"
        >
          <User size={17} className="text-cream" />
        </button>
      </div>

      {/* Snap scroll container */}
      <div className="snap-y-mandatory h-dvh overflow-y-auto">
        {state.businesses.map((biz, index) => {
          const isEnrolled = state.user.enrolledBusinesses.includes(biz.id);
          const currentTierName = isEnrolled && biz.currentTier >= 0
            ? biz.tiers[biz.currentTier]?.name
            : null;

          return (
            <motion.div
              key={biz.id}
              className="snap-start h-dvh relative cursor-pointer"
              onClick={() => navigate(`/business/${biz.id}`)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              {/* Background image */}
              <img
                src={biz.imageHero}
                alt={biz.name}
                className="absolute inset-0 w-full h-full object-cover img-moody"
              />
              <div className="gradient-overlay absolute inset-0" />

              {/* Content overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-28 pt-20">
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-cream/45 text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">
                    {biz.type}
                  </p>
                  <h2 className="font-serif text-4xl text-cream font-semibold leading-[1.1] mb-2">
                    {biz.name}
                  </h2>
                  <p className="text-cream/55 text-[15px] mb-5 leading-relaxed">{biz.tagline}</p>

                  {isEnrolled ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-cream/60 text-sm">
                        <span className="font-medium text-cream/80">{biz.totalVisits} visits</span>
                        <span className="text-cream/25">|</span>
                        <span>{biz.lifetimePoints} pts</span>
                        {currentTierName && (
                          <>
                            <span className="text-cream/25">|</span>
                            <TierBadge tier={currentTierName} />
                          </>
                        )}
                      </div>
                      {biz.nextUnlock && (
                        <p className="text-terracotta-light text-sm font-medium">
                          {biz.nextUnlock}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-cream/35 text-sm italic">
                      Visit once to start your journey
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
