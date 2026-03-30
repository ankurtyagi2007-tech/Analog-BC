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

  const getBizName = (businessId) => state.businesses.find((b) => b.id === businessId)?.name || '';

  return (
    <div className="min-h-dvh bg-bg-base pb-24">
      <div className="pt-[max(1.25rem,env(safe-area-inset-top))] px-5 pb-2">
        <h1 className="font-serif text-2xl text-text-primary font-semibold">Experiences</h1>
      </div>

      <FilterChips businesses={state.businesses} activeFilter={state.activeBusinessFilter} onFilter={(id) => dispatch({ type: 'SET_BUSINESS_FILTER', payload: id })} />

      <div className="px-5 flex flex-col gap-4 mt-3">
        {filtered.map((exp, index) => {
          const isEnrolled = state.user.enrolledBusinesses.includes(exp.businessId);
          const spotsLeft = exp.spotsTotal - exp.spotsTaken;

          return (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => isEnrolled && navigate(`/experience/${exp.id}`)}>
              <div className="relative h-[210px]">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover img-moody" />
                <div className="gradient-overlay-subtle absolute inset-0" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-gold/50 text-[11px] mb-1 font-semibold tracking-wider uppercase">{getBizName(exp.businessId)}</p>
                  <h3 className="font-serif text-xl text-text-primary font-medium leading-tight">{exp.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-text-secondary text-xs">
                    <span>{new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="text-text-muted">·</span>
                    <span>{exp.time}</span>
                    <span className="text-text-muted">·</span>
                    <span className={spotsLeft <= 3 ? 'text-gold font-semibold' : ''}>{spotsLeft} spots left</span>
                  </div>
                  <div className="mt-2"><TierBadge tier={exp.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} /></div>
                </div>
                {!isEnrolled && <LockOverlay businessName={getBizName(exp.businessId)} />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
