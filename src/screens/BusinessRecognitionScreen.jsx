import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TierBadge from '../components/TierBadge';
import merch from '../data/merch.json';
import experiences from '../data/experiences.json';

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
    <div className="min-h-dvh bg-cream">
      {/* Hero */}
      <div className="relative h-[55vh]">
        <img
          src={biz.imageHero}
          alt={biz.name}
          className="absolute inset-0 w-full h-full object-cover img-moody"
        />
        <div className="gradient-overlay absolute inset-0" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-9 h-9 rounded-full bg-espresso/30 backdrop-blur-md flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-cream" />
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <p className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-1">
            {biz.type}
          </p>
          <h1 className="font-serif text-3xl text-cream font-semibold">{biz.name}</h1>
          <p className="text-cream/60 text-sm mt-1">{biz.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative z-10">
        {/* Tier Timeline */}
        {isEnrolled && (
          <div className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/5 mb-4">
            <h3 className="font-serif text-lg text-espresso mb-4">Recognition Journey</h3>
            <div className="flex items-center justify-between relative mb-4">
              {/* Progress line */}
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-espresso/10" />
              <div
                className="absolute top-3 left-0 h-0.5 bg-terracotta transition-all duration-500"
                style={{
                  width: `${((biz.currentTier + 1) / biz.tiers.length) * 100}%`,
                }}
              />

              {biz.tiers.map((tier, i) => {
                const isUnlocked = i <= biz.currentTier;
                const isCurrent = i === biz.currentTier;

                return (
                  <div key={tier.id} className="relative flex flex-col items-center z-10">
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                      transition={isCurrent ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isCurrent
                          ? 'bg-terracotta border-terracotta'
                          : isUnlocked
                          ? 'bg-terracotta/80 border-terracotta/80'
                          : 'bg-cream border-espresso/20'
                      }`}
                    >
                      {isUnlocked && (
                        <div className="w-2 h-2 rounded-full bg-cream" />
                      )}
                    </motion.div>
                    <span className={`text-[10px] mt-2 text-center max-w-[60px] leading-tight ${
                      isCurrent ? 'text-terracotta font-medium' : 'text-espresso/50'
                    }`}>
                      {tier.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current tier perks */}
            {biz.currentTier >= 0 && (
              <div className="mt-2 pt-3 border-t border-espresso/5">
                <p className="text-xs text-espresso/50 mb-1.5">Current perks</p>
                <div className="flex flex-wrap gap-1.5">
                  {biz.tiers[biz.currentTier].perks.map((perk) => (
                    <span
                      key={perk}
                      className="text-[11px] bg-sage/10 text-sage px-2 py-0.5 rounded-full"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {isEnrolled && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Visits', value: biz.totalVisits },
              { label: 'Points', value: biz.lifetimePoints.toLocaleString() },
              { label: 'Member since', value: new Date(biz.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-warm-white rounded-xl p-3 text-center shadow-sm border border-espresso/5">
                <p className="font-serif text-xl text-espresso">{value}</p>
                <p className="text-[10px] text-espresso/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Business info */}
        <div className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/5 mb-4">
          <h3 className="font-serif text-lg text-espresso mb-3">About</h3>
          <p className="text-sm text-espresso/70 leading-relaxed mb-4">{biz.description}</p>
          <div className="flex flex-col gap-2.5 text-sm text-espresso/60">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-terracotta shrink-0" />
              <span>{biz.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-terracotta shrink-0" />
              <span>{biz.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-terracotta shrink-0" />
              <span>{biz.phone}</span>
            </div>
          </div>
        </div>

        {/* Merch */}
        {bizMerch.length > 0 && (
          <div className="mb-4">
            <h3 className="font-serif text-lg text-espresso mb-3 px-1">Merch</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
              {bizMerch.map((item) => {
                const isRedeemed = state.redeemedMerch.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/merch/${item.id}`)}
                    className="shrink-0 w-[200px] bg-warm-white rounded-2xl overflow-hidden shadow-sm border border-espresso/5 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[130px] object-cover img-moody"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-terracotta">{item.pointsCost} pts</span>
                        {isRedeemed ? (
                          <span className="text-[10px] text-sage">Redeemed</span>
                        ) : (
                          <TierBadge tier={item.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                        )}
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
            <h3 className="font-serif text-lg text-espresso mb-3 px-1">Upcoming Events</h3>
            <div className="flex flex-col gap-3">
              {bizExperiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/experience/${exp.id}`)}
                  className="flex gap-3 bg-warm-white rounded-2xl overflow-hidden shadow-sm border border-espresso/5 cursor-pointer"
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-24 h-24 object-cover img-moody shrink-0"
                  />
                  <div className="flex-1 py-3 pr-3">
                    <p className="text-sm font-medium text-espresso">{exp.title}</p>
                    <p className="text-xs text-espresso/50 mt-1">
                      {new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {exp.time}
                    </p>
                    <p className="text-xs text-sage mt-1">
                      {exp.spotsTotal - exp.spotsTaken} spots left
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-espresso/30 self-center mr-3" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Community link */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            navigate('/community');
          }}
          className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/5 mb-24 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-espresso">Community</h3>
              <p className="text-sm text-espresso/50 mt-0.5">Join the conversation</p>
            </div>
            <ChevronRight size={18} className="text-espresso/30" />
          </div>
        </motion.div>

        {/* Timeline */}
        {isEnrolled && biz.timeline.length > 0 && (
          <div className="mb-24">
            <h3 className="font-serif text-lg text-espresso mb-3 px-1">Your History</h3>
            <div className="relative pl-6">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-espresso/10" />
              {biz.timeline.map((event, i) => (
                <div key={i} className="relative pb-4 last:pb-0">
                  <div className="absolute left-[-18px] top-1 w-2.5 h-2.5 rounded-full bg-terracotta/60 border-2 border-cream" />
                  <p className="text-sm text-espresso">{event.event}</p>
                  <p className="text-xs text-espresso/40 mt-0.5">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
