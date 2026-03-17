import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import BusinessCard from '../components/BusinessCard'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import PageTransition from '../components/PageTransition'

export default function Home() {
  const { user } = useAuth()
  const { businesses, getUserProgress } = useApp()

  const enrolledBusinesses = businesses.filter(b =>
    user?.enrolledBusinessIds?.includes(b.id)
  )

  return (
    <PageTransition direction="fade">
      <div className="relative">
        <TopBar />

        <div className="h-screen overflow-y-auto snap-y snap-mandatory">
          {enrolledBusinesses.map(business => (
            <BusinessCard
              key={business.id}
              business={business}
              progress={getUserProgress(business.id)}
            />
          ))}
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  )
}
