import { motion } from 'framer-motion';

export default function FilterChips({ businesses, activeFilter, onFilter }) {
  const allOption = { id: null, name: 'All' };
  const options = [allOption, ...businesses.map((b) => ({ id: b.id, name: b.name }))];

  return (
    <div className="flex gap-2 overflow-x-auto px-5 py-3" role="tablist" aria-label="Filter by business">
      {options.map((opt) => {
        const isActive = activeFilter === opt.id;
        return (
          <motion.button
            key={opt.id || 'all'}
            onClick={() => onFilter(opt.id)}
            whileTap={{ scale: 0.95 }}
            role="tab"
            aria-selected={isActive}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-espresso text-cream shadow-sm'
                : 'bg-warm-white text-espresso/60 border border-espresso/8 hover:border-espresso/15'
            }`}
          >
            {opt.name}
          </motion.button>
        );
      })}
    </div>
  );
}
