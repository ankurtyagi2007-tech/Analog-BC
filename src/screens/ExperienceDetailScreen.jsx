import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TierBadge from '../components/TierBadge';
import experiences from '../data/experiences.json';

export default function ExperienceDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const exp = experiences.find((e) => e.id === id);
  if (!exp) return null;

  const biz = state.businesses.find((b) => b.id === exp.businessId);
  const isSignedUp = state.signedUpExperiences.includes(id);
  const spotsLeft = exp.spotsTotal - exp.spotsTaken;

  return (
    <div className="min-h-dvh bg-bg-base">
      <div className="relative h-[42vh]">
        <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover img-moody" />
        <div className="gradient-overlay absolute inset-0" />
        <button onClick={() => navigate(-1)} className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer" aria-label="Go back">
          <ArrowLeft size={18} className="text-text-primary" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <h1 className="font-serif text-3xl text-text-primary font-semibold leading-tight">{exp.title}</h1>
        </div>
      </div>

      <div className="px-5 -mt-2 relative z-10 pb-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={biz?.imageCard || ''} alt={biz?.name} className="w-11 h-11 rounded-full object-cover img-moody" />
            <div>
              <p className="text-[11px] text-text-muted font-medium">Hosted by</p>
              <p className="text-sm font-semibold text-text-primary">{biz?.name}</p>
            </div>
            <TierBadge tier={exp.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} className="ml-auto" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-2xl p-5 mb-4">
          <div className="flex flex-col gap-3.5 mb-4">
            <div className="flex items-center gap-3 text-sm text-text-secondary"><Calendar size={16} className="text-gold shrink-0" /><span>{new Date(exp.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
            <div className="flex items-center gap-3 text-sm text-text-secondary"><Clock size={16} className="text-gold shrink-0" /><span>{exp.time}</span></div>
            <div className="flex items-center gap-3 text-sm text-text-secondary"><MapPin size={16} className="text-gold shrink-0" /><span>{exp.location}</span></div>
          </div>
          <div className="border-t border-border pt-4"><p className="text-sm text-text-secondary leading-relaxed">{exp.description}</p></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Users size={16} className="text-gold" /><span className="text-sm text-text-primary font-medium">{exp.spotsTaken} going</span></div>
            <span className={`text-xs font-medium ${spotsLeft <= 3 ? 'text-gold' : 'text-text-muted'}`}>{spotsLeft} spots left</span>
          </div>
          <div className="flex -space-x-2">
            {exp.attendees.slice(0, 8).map((name, i) => (
              <img key={i} src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80`} alt={name} className="w-8 h-8 rounded-full border-2 border-bg-card object-cover" />
            ))}
            {exp.attendees.length > 8 && <div className="w-8 h-8 rounded-full border-2 border-bg-card bg-bg-elevated flex items-center justify-center"><span className="text-[10px] text-text-muted font-medium">+{exp.attendees.length - 8}</span></div>}
          </div>
          <div className="mt-3 h-2 bg-bg-elevated rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(exp.spotsTaken / exp.spotsTotal) * 100}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full bg-gold/50 rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-bg-base via-bg-base to-bg-base/0">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => dispatch({ type: 'SIGNUP_EXPERIENCE', payload: id })} disabled={isSignedUp}
          className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${isSignedUp ? 'bg-sage/20 text-sage flex items-center justify-center gap-2 border border-sage/20' : 'bg-gold text-bg-deep hover:bg-gold-light shadow-lg shadow-gold/15'}`}>
          {isSignedUp ? <><Check size={16} />You're going</> : 'Sign Up'}
        </motion.button>
      </div>
    </div>
  );
}
