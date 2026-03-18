import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Award, MapPin, Calendar, TrendingUp, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import TierBadge from '../components/TierBadge'
import PageTransition from '../components/PageTransition'

export default function Profile() {
  const { user, logout } = useAuth()
  const { businesses, getUserProgress } = useApp()
  const navigate = useNavigate()

  if (!user) return null

  const enrolledBusinesses = businesses.filter(b =>
    user.enrolledBusinessIds?.includes(b.id)
  )

  const memberSince = new Date(user.memberSince).toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  })

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const stats = [
    { label: 'Total Visits', value: user.totalVisits, icon: TrendingUp },
    { label: 'Places', value: enrolledBusinesses.length, icon: MapPin },
    { label: 'Member Since', value: memberSince.split(' ')[0].slice(0, 3) + ' ' + memberSince.split(' ')[1], icon: Calendar },
  ]

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-cream pb-12">
        {/* Header */}
        <div className="relative h-56 bg-espresso overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso" />
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-12 pb-3">
            <button
              onClick={() => navigate(-1)}
              className="text-cream/70 text-sm font-medium cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-cream/70 text-sm font-medium cursor-pointer"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-3 border-cream/30 object-cover shadow-lg"
              />
            </motion.div>
            <h1 className="font-serif text-2xl font-semibold text-cream mt-3">{user.name}</h1>
            <p className="text-cream/50 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="px-5 -mt-1">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-3 gap-3 mt-5"
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-cream-light rounded-2xl p-4 text-center border border-sand/20">
                <Icon size={16} className="text-terracotta mx-auto mb-2" />
                <p className="font-serif text-xl font-semibold text-espresso">{value}</p>
                <p className="text-espresso/45 text-[10px] mt-1">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Your Places */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-7"
          >
            <h2 className="font-serif text-xl font-semibold text-espresso mb-4">Your Places</h2>
            <div className="space-y-3">
              {enrolledBusinesses.map((business, index) => {
                const progress = getUserProgress(business.id)
                const nextTier = business.tiers?.find(t => t.pointsRequired > (progress?.points || 0))

                return (
                  <motion.button
                    key={business.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08, duration: 0.35 }}
                    onClick={() => navigate(`/business/${business.id}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-cream-light border border-sand/20 cursor-pointer text-left hover:bg-sand/10 transition-colors"
                  >
                    <img
                      src={business.coverUrl}
                      alt={business.name}
                      className="w-14 h-14 rounded-xl object-cover img-moody flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-sm text-espresso truncate">{business.name}</h3>
                        {progress && <TierBadge tier={progress.tier} small />}
                      </div>
                      <p className="text-xs text-espresso/45">
                        {progress
                          ? `${progress.visits} visits · ${progress.points} pts`
                          : business.tagline}
                      </p>
                      {progress && nextTier && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-sand/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-terracotta rounded-full transition-all"
                              style={{
                                width: `${Math.min(100, ((progress.points - (business.tiers?.[progress.tierIndex]?.pointsRequired || 0)) / (Math.max(1, nextTier.pointsRequired - (business.tiers?.[progress.tierIndex]?.pointsRequired || 0)))) * 100)}%`
                              }}
                            />
                          </div>
                          <span className="text-[9px] text-espresso/35 whitespace-nowrap">
                            {nextTier.pointsRequired - progress.points} to {nextTier.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-espresso/25 flex-shrink-0" />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-7"
          >
            <h2 className="font-serif text-xl font-semibold text-espresso mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Early Adopter', desc: 'Joined in the first year', unlocked: true },
                { title: 'Explorer', desc: 'Enrolled in 3+ places', unlocked: enrolledBusinesses.length >= 3 },
                { title: 'Loyal Regular', desc: 'Reached Regular tier', unlocked: Object.values(user.businessProgress || {}).some(p => p.tierIndex >= 1) },
                { title: 'Insider Access', desc: 'Reached Insider tier', unlocked: Object.values(user.businessProgress || {}).some(p => p.tierIndex >= 2) },
              ].map((achievement) => (
                <div
                  key={achievement.title}
                  className={`p-4 rounded-2xl border text-center ${
                    achievement.unlocked
                      ? 'bg-cream-light border-sand/20'
                      : 'bg-sand/5 border-sand/10 opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    achievement.unlocked ? 'bg-terracotta/10' : 'bg-sand/20'
                  }`}>
                    <Award
                      size={18}
                      className={achievement.unlocked ? 'text-terracotta' : 'text-espresso/30'}
                    />
                  </div>
                  <p className="text-xs font-semibold text-espresso">{achievement.title}</p>
                  <p className="text-[10px] text-espresso/40 mt-0.5">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
