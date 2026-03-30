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

  const handleSignUp = () => {
    dispatch({ type: 'SIGNUP_EXPERIENCE', payload: id });
  };

  return (
    <div className="min-h-dvh bg-cream">
      {/* Hero */}
      <div className="relative h-[42vh]">
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover img-moody"
        />
        <div className="gradient-overlay absolute inset-0" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-10 h-10 rounded-full bg-espresso/30 backdrop-blur-md flex items-center justify-center hover:bg-espresso/40 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-cream" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <h1 className="font-serif text-3xl text-cream font-semibold leading-tight">
            {exp.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-2 relative z-10 pb-28">
        {/* Host */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-warm-white rounded-2xl p-4 shadow-sm border border-espresso/[0.06] mb-4"
        >
          <div className="flex items-center gap-3">
            <img
              src={biz?.imageCard || ''}
              alt={biz?.name}
              className="w-11 h-11 rounded-full object-cover img-moody"
            />
            <div>
              <p className="text-[11px] text-warm-gray font-medium">Hosted by</p>
              <p className="text-sm font-semibold text-espresso">{biz?.name}</p>
            </div>
            <TierBadge
              tier={exp.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              className="ml-auto"
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/[0.06] mb-4"
        >
          <div className="flex flex-col gap-3.5 mb-4">
            <div className="flex items-center gap-3 text-sm text-espresso/70">
              <Calendar size={16} className="text-terracotta shrink-0" />
              <span>
                {new Date(exp.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-espresso/70">
              <Clock size={16} className="text-terracotta shrink-0" />
              <span>{exp.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-espresso/70">
              <MapPin size={16} className="text-terracotta shrink-0" />
              <span>{exp.location}</span>
            </div>
          </div>

          <div className="border-t border-espresso/[0.06] pt-4">
            <p className="text-sm text-espresso/75 leading-relaxed">{exp.description}</p>
          </div>
        </motion.div>

        {/* Attendees */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/[0.06] mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-terracotta" />
              <span className="text-sm text-espresso font-medium">
                {exp.spotsTaken} going
              </span>
            </div>
            <span className={`text-xs font-medium ${spotsLeft <= 3 ? 'text-terracotta' : 'text-warm-gray'}`}>
              {spotsLeft} spots left
            </span>
          </div>

          <div className="flex -space-x-2">
            {exp.attendees.slice(0, 8).map((name, i) => (
              <img
                key={i}
                src={`https://picsum.photos/seed/${name.toLowerCase().replace(/[^a-z]/g, '')}/40/40`}
                alt={name}
                className="w-8 h-8 rounded-full border-2 border-warm-white object-cover"
              />
            ))}
            {exp.attendees.length > 8 && (
              <div className="w-8 h-8 rounded-full border-2 border-warm-white bg-espresso/8 flex items-center justify-center">
                <span className="text-[10px] text-espresso/50 font-medium">+{exp.attendees.length - 8}</span>
              </div>
            )}
          </div>

          <div className="mt-3 h-2 bg-espresso/[0.04] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(exp.spotsTaken / exp.spotsTotal) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-terracotta/50 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-cream via-cream to-cream/0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignUp}
          disabled={isSignedUp}
          className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
            isSignedUp
              ? 'bg-sage text-cream flex items-center justify-center gap-2'
              : 'bg-terracotta text-cream hover:bg-terracotta-dark active:bg-terracotta-dark shadow-lg shadow-terracotta/20'
          }`}
        >
          {isSignedUp ? (
            <>
              <Check size={16} />
              You're going
            </>
          ) : (
            'Sign Up'
          )}
        </motion.button>
      </div>
    </div>
  );
}
