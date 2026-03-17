import { motion } from 'framer-motion'

export default function FilterChips({ items, activeId, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-5 -mx-5">
      {items.map(item => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
              isActive
                ? 'text-cream'
                : 'text-espresso/60 bg-espresso/5'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="chip-active"
                className="absolute inset-0 bg-espresso rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
