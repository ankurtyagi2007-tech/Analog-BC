import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import TierBadge from './TierBadge'

export default function BusinessCard({ business, progress }) {
  const navigate = useNavigate()

  const nextTier = business.tiers.find(t => t.pointsRequired > (progress?.points || 0))
  const pointsToNext = nextTier ? nextTier.pointsRequired - (progress?.points || 0) : 0

  return (
    <motion.div
      className="h-screen w-full relative snap-start snap-always flex-shrink-0 cursor-pointer"
      onClick={() => navigate(`/business/${business.id}`)}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={business.imageUrl}
        alt={business.name}
        className="absolute inset-0 w-full h-full object-cover img-moody"
      />

      <div className="absolute inset-0 gradient-overlay" />

      <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 text-cream">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-sand" />
          <span className="text-sm text-sand font-light">{business.neighborhood}</span>
        </div>

        <h2 className="font-serif text-4xl font-semibold mb-1 text-shadow-lg">
          {business.name}
        </h2>

        <p className="text-cream/70 text-sm font-light mb-4">{business.tagline}</p>

        {progress && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <TierBadge tier={progress.tier} />
              <span className="text-cream/60 text-xs">
                {progress.visits} visits · {progress.points} pts
              </span>
            </div>

            {nextTier && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-cream/60">
                  <span>Next: {nextTier.name}</span>
                  <span>{pointsToNext} pts away</span>
                </div>
                <div className="h-1 bg-cream/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-terracotta rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((progress.points - (business.tiers[progress.tierIndex]?.pointsRequired || 0)) / (nextTier.pointsRequired - (business.tiers[progress.tierIndex]?.pointsRequired || 0))) * 100}%`
                    }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!progress && (
          <div className="flex items-center gap-2 mt-2">
            <Star size={14} className="text-sand" />
            <span className="text-cream/60 text-sm">Discover this spot</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
