import { Lock } from 'lucide-react'

export default function LockOverlay({ message = 'Visit once to unlock' }) {
  return (
    <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-10">
      <div className="w-12 h-12 rounded-full bg-cream/20 flex items-center justify-center mb-3">
        <Lock size={20} className="text-cream/80" />
      </div>
      <p className="text-cream/80 text-sm font-medium text-center px-4">{message}</p>
    </div>
  )
}
