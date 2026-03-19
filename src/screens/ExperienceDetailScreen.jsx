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
      <div className="relative h-[45vh]">
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover img-moody"
        />
        <div className="gradient-overlay absolute inset-0" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-9 h-9 rounded-full bg-espresso/30 backdrop-blur-md flex items-center justify-center"
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
        <div className="bg-warm-white rounded-2xl p-4 shadow-sm border border-espresso/5 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={biz?.imageCard || ''}
              alt={biz?.name}
              className="w-10 h-10 rounded-full object-cover img-moody"
            />
            <div>
              <p className="text-xs text-espresso/50">Hosted by</p>
              <p className="text-sm font-medium text-espresso">{biz?.name}</p>
            </div>
            <TierBadge
              tier={exp.tierRequired.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              className="ml-auto"
            />
          </div>
        </div>

        {/* Details */}
        <div className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/5 mb-4">
          <div className="flex flex-col gap-3 mb-4">
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

          <div className="border-t border-espresso/5 pt-4">
            <p className="text-sm text-espresso/80 leading-relaxed">{exp.description}</p>
          </div>
        </div>

        {/* Attendees */}
        <div className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-terracotta" />
              <span className="text-sm text-espresso">
                {exp.spotsTaken} going
              </span>
            </div>
            <span className={`text-xs ${spotsLeft <= 3 ? 'text-terracotta' : 'text-espresso/50'}`}>
              {spotsLeft} spots left
            </span>
          </div>

          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {exp.attendees.slice(0, 8).map((name, i) => (
              <img
                key={i}
                src={`https://picsum.photos/seed/${name.toLowerCase().replace(/[^a-z]/g, '')}/40/40`}
                alt={name}
                className="w-8 h-8 rounded-full border-2 border-cream object-cover"
              />
            ))}
            {exp.attendees.length > 8 && (
              <div className="w-8 h-8 rounded-full border-2 border-cream bg-espresso/10 flex items-center justify-center">
                <span className="text-[10px] text-espresso/60">+{exp.attendees.length - 8}</span>
              </div>
            )}
          </div>

          {/* Spots bar */}
          <div className="mt-3 h-1.5 bg-espresso/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(exp.spotsTaken / exp.spotsTotal) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-terracotta/60 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl z-50 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-cream via-cream to-cream/0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignUp}
          disabled={isSignedUp}
          className={`w-full py-3.5 rounded-xl text-sm font-medium transition-colors ${
            isSignedUp
              ? 'bg-sage text-cream flex items-center justify-center gap-2'
              : 'bg-terracotta text-cream active:bg-terracotta-light'
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
