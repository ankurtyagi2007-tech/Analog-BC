import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, MapPin, Users, ChevronRight, Check, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import TopBar from '../components/TopBar'
import TierBadge from '../components/TierBadge'
import PageTransition from '../components/PageTransition'

const tierIcons = ['🌱', '☕', '🔑', '⭐']

export default function BusinessDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { businesses, getUserProgress, community } = useApp()
  const { user } = useAuth()

  const business = businesses.find(b => b.id === Number(id))
  const progress = getUserProgress(Number(id))
  const messages = community[id]?.slice(0, 3) || []

  if (!business) return null

  return (
    <PageTransition direction="slideUp">
      <div className="min-h-screen bg-cream pb-8">
        <TopBar showBack />

        {/* Hero */}
        <div className="relative h-[50vh]">
          <img
            src={business.coverUrl}
            alt={business.name}
            className="w-full h-full object-cover img-moody"
          />
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-cream/60 text-sm font-light flex items-center gap-1.5 mb-1">
              <MapPin size={13} /> {business.neighborhood} · {business.type}
            </p>
            <h1 className="font-serif text-4xl font-bold text-cream text-shadow-lg">
              {business.name}
            </h1>
            <p className="text-cream/70 text-sm font-light mt-1 flex items-center gap-1.5">
              <Clock size={13} /> {business.hours}
            </p>
          </div>
        </div>

        <div className="px-5 space-y-6 mt-6">
          {/* About */}
          <p className="text-espresso/70 text-sm leading-relaxed">{business.description}</p>

          {/* Stats Row */}
          {progress && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Visits', value: progress.visits },
                { label: 'Points', value: progress.points },
                { label: 'Member Since', value: user?.memberSince?.slice(0, 7).replace('-', '/') },
              ].map(stat => (
                <div key={stat.label} className="bg-cream-light rounded-2xl p-4 text-center border border-sand/20">
                  <p className="font-serif text-2xl font-semibold text-espresso">{stat.value}</p>
                  <p className="text-espresso/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Recognition Timeline */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-espresso mb-4">Your Journey</h3>
            <div className="relative pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-sand/50" />
              {(business.tiers || []).map((tier, i) => {
                const isCurrentOrPast = progress ? i <= progress.tierIndex : false
                const isCurrent = progress ? i === progress.tierIndex : false
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className={`relative mb-6 last:mb-0 ${!isCurrentOrPast ? 'opacity-50' : ''}`}
                  >
                    <div className={`absolute -left-5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isCurrent
                        ? 'bg-terracotta text-cream ring-4 ring-terracotta/20'
                        : isCurrentOrPast
                        ? 'bg-olive text-cream'
                        : 'bg-sand/40 text-espresso/40'
                    }`}>
                      {isCurrentOrPast ? <Check size={12} /> : <Lock size={10} />}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{tierIcons[i]}</span>
                        <h4 className="font-semibold text-sm text-espresso">{tier.name}</h4>
                        <span className="text-xs text-espresso/40">{tier.pointsRequired} pts</span>
                      </div>
                      <ul className="space-y-1">
                        {tier.perks.map(perk => (
                          <li key={perk} className="text-xs text-espresso/60 flex items-start gap-1.5">
                            <span className="text-terracotta mt-0.5">·</span> {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Merch */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-espresso mb-4">Exclusive Merch</h3>
            <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2">
              {(business.merch || []).map(item => {
                const tierIndex = business.tiers.findIndex(t => t.name === item.tierRequired)
                const isLocked = progress ? progress.tierIndex < tierIndex : true
                return (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => !isLocked && navigate(`/merch/${business.id}/${item.id}`)}
                    className={`flex-shrink-0 w-48 rounded-2xl overflow-hidden bg-cream-light border border-sand/20 ${
                      isLocked ? 'opacity-60' : 'cursor-pointer'
                    }`}
                  >
                    <div className="relative h-36">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover img-moody" />
                      {isLocked && (
                        <div className="absolute inset-0 bg-espresso/30 flex items-center justify-center">
                          <Lock size={20} className="text-cream/70" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                      <TierBadge tier={item.tierRequired} small />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          {business.events.length > 0 && (
            <div>
              <h3 className="font-serif text-xl font-semibold text-espresso mb-4">Upcoming</h3>
              <div className="space-y-3">
                {business.events.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-4 rounded-2xl bg-cream-light border border-sand/20">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-terracotta font-medium">
                        {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                      </span>
                      <span className="text-lg font-serif font-bold text-terracotta leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-espresso truncate">{event.title}</p>
                      <p className="text-xs text-espresso/50">{event.time} · {event.spotsLeft} spots left</p>
                    </div>
                    <TierBadge tier={event.tierRequired} small />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Preview */}
          {messages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-espresso">Community</h3>
                <button
                  onClick={() => navigate(`/community?business=${id}`)}
                  className="text-terracotta text-sm font-medium flex items-center gap-0.5 cursor-pointer"
                >
                  See all <ChevronRight size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-espresso/40" />
                <span className="text-xs text-espresso/50">
                  {business.communityMemberCount} members · {business.onlineCount} online
                </span>
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
              </div>
              <div className="space-y-2">
                {messages.map(msg => (
                  <div key={msg.id} className="p-3 rounded-xl bg-cream-light border border-sand/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-espresso">{msg.userName}</span>
                      <TierBadge tier={msg.userTier} small />
                    </div>
                    <p className="text-xs text-espresso/70 line-clamp-2">
                      {msg.type === 'poll' ? `📊 ${msg.poll.question}` : msg.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
