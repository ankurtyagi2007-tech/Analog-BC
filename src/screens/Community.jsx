import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, BarChart3, Pin, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import FilterChips from '../components/FilterChips'
import TierBadge from '../components/TierBadge'
import PageTransition from '../components/PageTransition'

export default function Community() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('business')
  const [activeBusiness, setActiveBusiness] = useState(preselected || 'all')
  const [expandedThread, setExpandedThread] = useState(null)
  const [votedPolls, setVotedPolls] = useState([])
  const { community, businesses, voteOnPoll } = useApp()

  const businessFilters = useMemo(() => [
    { id: 'all', label: 'All' },
    ...businesses.map(b => ({ id: String(b.id), label: b.name })),
  ], [businesses])

  const messages = useMemo(() => {
    if (activeBusiness === 'all') {
      return Object.entries(community)
        .flatMap(([bizId, msgs]) => msgs.map(m => ({ ...m, businessId: bizId })))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    }
    return (community[activeBusiness] || []).map(m => ({ ...m, businessId: activeBusiness }))
  }, [activeBusiness, community])

  const handleVote = (messageId, optionIndex) => {
    if (votedPolls.includes(messageId)) return
    setVotedPolls(prev => [...prev, messageId])
    voteOnPoll(messageId, optionIndex)
  }

  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <PageTransition direction="fade">
      <div className="min-h-screen bg-cream pb-28">
        <TopBar transparent={false} />

        <div className="pt-24 px-5">
          <h1 className="font-serif text-3xl font-bold text-espresso mb-1">
            Community
          </h1>
          <p className="text-espresso/50 text-sm mb-5">
            Conversations from your favorite spots
          </p>

          <FilterChips
            items={businessFilters}
            activeId={activeBusiness}
            onChange={setActiveBusiness}
          />

          <div className="mt-5 space-y-3">
            {messages.map((msg, index) => {
              const businessName = businesses.find(b => b.id === Number(msg.businessId))?.name

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  className={`p-4 rounded-2xl bg-cream-light border border-sand/20 ${
                    msg.isPinned ? 'ring-1 ring-terracotta/20' : ''
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-espresso">{msg.userName}</span>
                    <TierBadge tier={msg.userTier} small />
                    {msg.isPinned && <Pin size={12} className="text-terracotta" />}
                    <span className="ml-auto text-[10px] text-espresso/35">{timeAgo(msg.timestamp)}</span>
                  </div>

                  {activeBusiness === 'all' && businessName && (
                    <p className="text-[10px] text-terracotta/70 font-medium mb-2">{businessName}</p>
                  )}

                  {/* Message Content */}
                  {msg.type === 'message' && (
                    <p className="text-sm text-espresso/70 leading-relaxed">{msg.text}</p>
                  )}

                  {/* Poll */}
                  {msg.type === 'poll' && msg.poll && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <BarChart3 size={14} className="text-olive" />
                        <p className="text-sm font-medium text-espresso">{msg.poll.question}</p>
                      </div>
                      <div className="space-y-2">
                        {msg.poll.options.map((option, i) => {
                          const totalVotes = msg.poll.options.reduce((sum, o) => sum + o.votes, 0)
                          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
                          const hasVoted = votedPolls.includes(msg.id)

                          return (
                            <button
                              key={i}
                              onClick={() => handleVote(msg.id, i)}
                              disabled={hasVoted}
                              className={`relative w-full text-left px-3 py-2.5 rounded-xl text-sm overflow-hidden transition-colors cursor-pointer ${
                                hasVoted
                                  ? 'bg-sand/15'
                                  : 'bg-sand/10 hover:bg-sand/20'
                              }`}
                            >
                              {hasVoted && (
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                  className="absolute inset-y-0 left-0 bg-olive/10 rounded-xl"
                                />
                              )}
                              <span className="relative z-10 flex items-center justify-between">
                                <span className="text-espresso/70">{option.text}</span>
                                {hasVoted && (
                                  <span className="text-xs font-medium text-espresso/50">{pct}%</span>
                                )}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-[10px] text-espresso/35 mt-2">
                        {msg.poll.options.reduce((sum, o) => sum + o.votes, 0)} votes
                      </p>
                    </div>
                  )}

                  {/* Thread */}
                  {msg.type === 'thread' && (
                    <div>
                      <p className="text-sm text-espresso/70 leading-relaxed">{msg.text}</p>

                      {msg.replies && msg.replies.length > 0 && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpandedThread(expandedThread === msg.id ? null : msg.id)}
                            className="flex items-center gap-1 text-xs text-terracotta font-medium cursor-pointer"
                          >
                            <MessageCircle size={13} />
                            {msg.replies.length} {msg.replies.length === 1 ? 'reply' : 'replies'}
                            {expandedThread === msg.id ? (
                              <ChevronUp size={13} />
                            ) : (
                              <ChevronDown size={13} />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedThread === msg.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 pl-3 border-l-2 border-sand/40 space-y-2">
                                  {msg.replies.map(reply => (
                                    <div key={reply.id} className="py-1.5">
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="text-xs font-medium text-espresso">{reply.userName}</span>
                                        <TierBadge tier={reply.userTier} small />
                                        <span className="text-[10px] text-espresso/35">{timeAgo(reply.timestamp)}</span>
                                      </div>
                                      <p className="text-xs text-espresso/60">{reply.text}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}

            {messages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-espresso/40 text-sm">No community messages yet.</p>
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
