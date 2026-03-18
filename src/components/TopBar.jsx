import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function TopBar({ showBack = false, transparent = true }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-12 pb-3 ${
      transparent ? '' : 'bg-cream/90 backdrop-blur-md border-b border-sand/30'
    }`}>
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft size={20} className="text-espresso" />
        </button>
      ) : (
        <div className="w-10" />
      )}

      <button
        onClick={() => navigate('/profile')}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-cream/80 shadow-lg cursor-pointer"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user?.name || ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-sand" />
        )}
      </button>
    </div>
  )
}
