import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import FilterChips from '../components/FilterChips';
import LockOverlay from '../components/LockOverlay';
import TierBadge from '../components/TierBadge';
import experiences from '../data/experiences.json';

export default function ExperiencesScreen() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const filtered = state.activeBusinessFilter
    ? experiences.filter((e) => e.businessId === state.activeBusinessFilter)
    : experiences;

  const getBizName = (businessId) => {
    return state.businesses.find((b) => b.id === businessId)?.name || '';
  };

  return (
    <div className="min-h-dvh bg-cream pb-24">
      {/* Header */}
      <div className="pt-[max(1rem,env(safe-area-inset-top))] px-5 pb-2">
        <h1 className="font-serif text-2xl text-espresso">Experiences</h1>
      </div>

      {/* Filter */}
      <FilterChips
        businesses={state.businesses}
        activeFilter={state.activeBusinessFilter}
        onFilter={(id) => dispatch({ type: 'SET_BUSINESS_FILTER', payload: id })}
      />

      {/* Experiences grid */}
      <div className="px-5 flex flex-col gap-4 mt-2">
        {filtered.map((exp, index) => {
          const isEnrolled = state.user.enrolledBusinesses.includes(exp.businessId);
          const spotsLeft = exp.spotsTotal - exp.spotsTaken;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => isEnrolled && navigate(`/experience/${exp.id}`)}
            >
              {/* Image */}
              <div className="relative h-[200px]">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover img-moody"
                />
                <div className="gradient-overlay-subtle absolute inset-0" />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-cream/60 text-xs mb-1">{getBizName(exp.businessId)}</p>
                  <h3 className="font-serif text-xl text-cream font-medium">{exp.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-cream/70 text-xs">
                    <span>
                      {new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-cream/30">·</span>
                    <span>{exp.time}</span>
                    <span className="text-cream/30">·</span>
                    <span className={spotsLeft <= 3 ? 'text-terracotta-light' : ''}>
                      {spotsLeft} spots left
                    </span>
                  </div>
                  <div className="mt-2">
                    <TierBadge tier={exp.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                  </div>
                </div>

                {/* Lock overlay */}
                {!isEnrolled && (
                  <LockOverlay businessName={getBizName(exp.businessId)} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
