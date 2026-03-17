import { createContext, useContext, useState, useCallback } from 'react'
import businessesData from '../data/businesses.json'
import experiencesData from '../data/experiences.json'
import communityData from '../data/community.json'
import { useAuth } from './AuthContext'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { user } = useAuth()
  const [businesses] = useState(businessesData)
  const [experiences, setExperiences] = useState(experiencesData)
  const [community, setCommunity] = useState(communityData)
  const [redeemedMerch, setRedeemedMerch] = useState([])
  const [rsvpedExperiences, setRsvpedExperiences] = useState(['exp4'])

  const voteOnPoll = useCallback((messageId, optionIndex) => {
    setCommunity(prev => {
      const updated = { ...prev }
      for (const key of Object.keys(updated)) {
        updated[key] = updated[key].map(msg => {
          if (msg.id === messageId && msg.poll) {
            const newOptions = msg.poll.options.map((opt, i) =>
              i === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
            )
            return { ...msg, poll: { ...msg.poll, options: newOptions } }
          }
          return msg
        })
      }
      return updated
    })
  }, [])

  const rsvpToExperience = useCallback((expId) => {
    setRsvpedExperiences(prev => [...prev, expId])
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === expId ? { ...exp, spotsTaken: exp.spotsTaken + 1 } : exp
      )
    )
  }, [])

  const redeemMerch = useCallback((businessId, merchId) => {
    setRedeemedMerch(prev => [...prev, { businessId, merchId }])
  }, [])

  const getUserProgress = useCallback((businessId) => {
    if (!user) return null
    return user.businessProgress[String(businessId)] || null
  }, [user])

  const isEnrolled = useCallback((businessId) => {
    if (!user) return false
    return user.enrolledBusinessIds.includes(businessId)
  }, [user])

  const isMerchRedeemed = useCallback((merchId) => {
    return redeemedMerch.some(m => m.merchId === merchId)
  }, [redeemedMerch])

  const isRsvped = useCallback((expId) => {
    return rsvpedExperiences.includes(expId)
  }, [rsvpedExperiences])

  return (
    <AppContext.Provider value={{
      businesses,
      experiences,
      community,
      redeemedMerch,
      voteOnPoll,
      rsvpToExperience,
      redeemMerch,
      getUserProgress,
      isEnrolled,
      isMerchRedeemed,
      isRsvped,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
