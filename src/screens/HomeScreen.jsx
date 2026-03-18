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
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-40 flex items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <h1 className="font-serif text-xl text-cream font-semibold">Analog</h1>
        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-cream/15 backdrop-blur-md flex items-center justify-center"
        >
          <User size={16} className="text-cream" />
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
              transition={{ delay: index * 0.1 }}
            >
              {/* Background image */}
              <img
                src={biz.imageHero}
                alt={biz.name}
                className="absolute inset-0 w-full h-full object-cover img-moody"
              />

              {/* Gradient overlay */}
              <div className="gradient-overlay absolute inset-0" />

              {/* Content overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-24 pt-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-2">
                    {biz.type}
                  </p>
                  <h2 className="font-serif text-4xl text-cream font-semibold leading-tight mb-2">
                    {biz.name}
                  </h2>
                  <p className="text-cream/60 text-sm mb-5">{biz.tagline}</p>

                  {isEnrolled ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-cream/70 text-sm">
                        <span>{biz.totalVisits} visits</span>
                        <span className="text-cream/30">·</span>
                        <span>{biz.lifetimePoints} pts</span>
                        {currentTierName && (
                          <>
                            <span className="text-cream/30">·</span>
                            <TierBadge tier={currentTierName} />
                          </>
                        )}
                      </div>
                      {biz.nextUnlock && (
                        <p className="text-terracotta-light text-sm">
                          Next: {biz.nextUnlock}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-cream/40 text-sm italic">
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
