import { motion } from 'framer-motion';

export default function FilterChips({ businesses, activeFilter, onFilter }) {
  const allOption = { id: null, name: 'All' };
  const options = [allOption, ...businesses.map((b) => ({ id: b.id, name: b.name }))];

  return (
    <div className="flex gap-2 overflow-x-auto px-5 py-3 no-scrollbar">
      {options.map((opt) => {
        const isActive = activeFilter === opt.id;
        return (
          <motion.button
            key={opt.id || 'all'}
            onClick={() => onFilter(opt.id)}
            whileTap={{ scale: 0.95 }}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
              isActive
                ? 'bg-espresso text-cream'
                : 'bg-cream-dark text-espresso/70 border border-espresso/10'
            }`}
          >
            {opt.name}
          </motion.button>
        );
      })}
    </div>
  );
}
