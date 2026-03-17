import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import FilterChips from '../components/FilterChips'
import TierBadge from '../components/TierBadge'
import LockOverlay from '../components/LockOverlay'
import PageTransition from '../components/PageTransition'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'tasting', label: 'Tastings' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'social', label: 'Social' },
  { id: 'exclusive', label: 'Exclusive' },
]

export default function Experiences() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { experiences, businesses, rsvpToExperience, isRsvped, getUserProgress } = useApp()
  const { user } = useAuth()
  const navigate = useNavigate()

  const filtered = activeCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === activeCategory)

  const isExperienceLocked = (exp) => {
    if (exp.tierRequired === 'First Visit') return false
    const progress = getUserProgress(exp.businessId)
    if (!progress) return true
    const business = businesses.find(b => b.id === exp.businessId)
    if (!business) return true
    const requiredIndex = business.tiers.findIndex(t => t.name === exp.tierRequired)
    return progress.tierIndex < requiredIndex
  }

  const getBusinessName = (businessId) => {
    return businesses.find(b => b.id === businessId)?.name || ''
  }

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-cream pb-28">
        <TopBar transparent={false} />

        <div className="pt-24 px-5">
          <h1 className="font-serif text-3xl font-bold text-espresso mb-1">
            Experiences
          </h1>
          <p className="text-espresso/50 text-sm mb-5">
            Curated moments from your favorite spots
          </p>

          <FilterChips
            items={categories}
            activeId={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="mt-5 space-y-4">
            {filtered.map((exp, index) => {
              const locked = isExperienceLocked(exp)
              const rsvped = isRsvped(exp.id)
              const spotsLeft = exp.spotsTotal - exp.spotsTaken

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="rounded-2xl overflow-hidden bg-cream-light border border-sand/20 shadow-sm"
                >
                  <div className="relative h-48">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      className="w-full h-full object-cover img-moody"
                    />
                    <div className="absolute inset-0 gradient-overlay-light" />

                    {locked && (
                      <LockOverlay message={`Reach ${exp.tierRequired} tier to unlock`} />
                    )}

                    <div className="absolute top-3 left-3">
                      <TierBadge tier={exp.tierRequired} small />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-cream/60 text-xs font-medium">
                        {getBusinessName(exp.businessId)}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-cream text-shadow">
                        {exp.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-espresso/60 text-sm leading-relaxed line-clamp-2 mb-3">
                      {exp.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-espresso/50 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(exp.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {exp.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={13} />
                        {spotsLeft} spots left
                      </span>
                    </div>

                    {!locked && (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (!rsvped && spotsLeft > 0) {
                            rsvpToExperience(exp.id)
                          }
                        }}
                        disabled={rsvped || spotsLeft === 0}
                        className={`w-full py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                          rsvped
                            ? 'bg-olive/15 text-olive'
                            : spotsLeft === 0
                            ? 'bg-sand/30 text-espresso/30 cursor-not-allowed'
                            : 'bg-espresso text-cream hover:bg-espresso-light'
                        }`}
                      >
                        {rsvped ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <Check size={15} /> RSVP'd
                          </span>
                        ) : spotsLeft === 0 ? (
                          'Fully Booked'
                        ) : (
                          'RSVP'
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-espresso/40 text-sm">No experiences in this category yet.</p>
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
