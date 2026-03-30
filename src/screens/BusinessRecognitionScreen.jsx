import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TierBadge from '../components/TierBadge';
import merch from '../data/merch.json';
import experiences from '../data/experiences.json';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

export default function BusinessRecognitionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();

  const biz = state.businesses.find((b) => b.id === id);
  if (!biz) return null;

  const bizMerch = merch.filter((m) => m.businessId === id);
  const bizExperiences = experiences.filter((e) => e.businessId === id);
  const isEnrolled = state.user.enrolledBusinesses.includes(id);

  return (
    <div className="min-h-dvh bg-bg-base">
      {/* Hero */}
      <div className="relative h-[52vh]">
        <img src={biz.imageHero} alt={biz.name} className="absolute inset-0 w-full h-full object-cover img-moody" />
        <div className="gradient-overlay absolute inset-0" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-surface-hover transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-text-primary" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <p className="text-gold/60 text-[11px] uppercase tracking-[0.25em] mb-1.5 font-semibold">{biz.type}</p>
          <h1 className="font-serif text-3xl text-text-primary font-semibold leading-tight">{biz.name}</h1>
          <p className="text-text-secondary text-sm mt-1.5 leading-relaxed">{biz.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-3 relative z-10">
        {/* Tier Timeline */}
        {isEnrolled && (
          <motion.div {...fadeUp} className="glass-card rounded-2xl p-5 mb-4">
            <h3 className="font-serif text-lg text-text-primary mb-4">Recognition Journey</h3>
            <div className="flex items-center justify-between relative mb-4">
              <div className="absolute top-3 left-0 right-0 h-[3px] bg-border rounded-full" />
              <div className="absolute top-3 left-0 h-[3px] bg-gold rounded-full transition-all duration-500" style={{ width: `${((biz.currentTier + 1) / biz.tiers.length) * 100}%` }} />

              {biz.tiers.map((tier, i) => {
                const isUnlocked = i <= biz.currentTier;
                const isCurrent = i === biz.currentTier;
                return (
                  <div key={tier.id} className="relative flex flex-col items-center z-10">
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.12, 1] } : {}}
                      transition={isCurrent ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCurrent ? 'bg-gold border-gold shadow-lg shadow-gold/20' : isUnlocked ? 'bg-gold/60 border-gold/60' : 'bg-bg-elevated border-border'
                      }`}
                    >
                      {isUnlocked && <div className="w-2 h-2 rounded-full bg-bg-deep" />}
                    </motion.div>
                    <span className={`text-[10px] mt-2 text-center max-w-[60px] leading-tight ${isCurrent ? 'text-gold font-semibold' : isUnlocked ? 'text-text-secondary' : 'text-text-muted'}`}>
                      {tier.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {biz.currentTier >= 0 && (
              <div className="mt-2 pt-3 border-t border-border">
                <p className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Current perks</p>
                <div className="flex flex-wrap gap-1.5">
                  {biz.tiers[biz.currentTier].perks.map((perk) => (
                    <span key={perk} className="text-[11px] bg-gold-dim text-gold font-medium px-2.5 py-1 rounded-full">{perk}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {isEnrolled && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Visits', value: biz.totalVisits },
              { label: 'Points', value: biz.lifetimePoints.toLocaleString() },
              { label: 'Member since', value: new Date(biz.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
            ].map(({ label, value }) => (
              <motion.div key={label} {...fadeUp} className="glass-card rounded-2xl p-4 text-center">
                <p className="font-serif text-xl text-text-primary font-semibold">{value}</p>
                <p className="text-[11px] text-text-muted mt-1 font-medium uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Business info */}
        <motion.div {...fadeUp} className="glass-card rounded-2xl p-5 mb-4">
          <h3 className="font-serif text-lg text-text-primary mb-3">About</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{biz.description}</p>
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <div className="flex items-center gap-3"><MapPin size={15} className="text-gold shrink-0" /><span>{biz.address}</span></div>
            <div className="flex items-center gap-3"><Clock size={15} className="text-gold shrink-0" /><span>{biz.hours}</span></div>
            <div className="flex items-center gap-3"><Phone size={15} className="text-gold shrink-0" /><span>{biz.phone}</span></div>
          </div>
        </motion.div>

        {/* Merch */}
        {bizMerch.length > 0 && (
          <div className="mb-4">
            <h3 className="font-serif text-lg text-text-primary mb-3 px-1">Merch</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
              {bizMerch.map((item) => {
                const isRedeemed = state.redeemedMerch.includes(item.id);
                return (
                  <motion.div key={item.id} whileTap={{ scale: 0.97 }} onClick={() => navigate(`/merch/${item.id}`)} className="shrink-0 w-[200px] glass-card rounded-2xl overflow-hidden cursor-pointer group">
                    <div className="overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-[130px] object-cover img-moody group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-gold font-semibold">{item.pointsCost} pts</span>
                        {isRedeemed ? <span className="text-[10px] text-sage font-semibold">Redeemed</span> : <TierBadge tier={item.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Events */}
        {bizExperiences.length > 0 && (
          <div className="mb-4">
            <h3 className="font-serif text-lg text-text-primary mb-3 px-1">Upcoming Events</h3>
            <div className="flex flex-col gap-3">
              {bizExperiences.map((exp) => (
                <motion.div key={exp.id} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/experience/${exp.id}`)} className="flex gap-3 glass-card rounded-2xl overflow-hidden cursor-pointer group">
                  <div className="overflow-hidden shrink-0"><img src={exp.image} alt={exp.title} className="w-24 h-24 object-cover img-moody group-hover:scale-105 transition-transform duration-300" /></div>
                  <div className="flex-1 py-3 pr-3">
                    <p className="text-sm font-medium text-text-primary">{exp.title}</p>
                    <p className="text-xs text-text-muted mt-1">{new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {exp.time}</p>
                    <p className="text-xs text-sage font-medium mt-1">{exp.spotsTotal - exp.spotsTaken} spots left</p>
                  </div>
                  <ChevronRight size={16} className="text-text-muted self-center mr-3" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Community link */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => navigate('/community')} className="glass-card rounded-2xl p-5 mb-6 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-text-primary">Community</h3>
              <p className="text-sm text-text-muted mt-0.5">Join the conversation</p>
            </div>
            <ChevronRight size={18} className="text-text-muted group-hover:text-text-secondary transition-colors" />
          </div>
        </motion.div>

        {/* Timeline */}
        {isEnrolled && biz.timeline.length > 0 && (
          <div className="mb-24">
            <h3 className="font-serif text-lg text-text-primary mb-4 px-1">Your History</h3>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
              {biz.timeline.map((event, i) => (
                <div key={i} className="relative pb-5 last:pb-0">
                  <div className="absolute left-[-18px] top-1.5 w-[10px] h-[10px] rounded-full bg-gold/50 border-2 border-bg-base" />
                  <p className="text-sm text-text-primary leading-relaxed">{event.event}</p>
                  <p className="text-xs text-text-muted mt-0.5">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
