import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LockOverlay({ businessName }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 z-20 bg-bg-deep/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
        <Lock size={22} className="text-gold/70" />
      </div>
      <p className="text-text-secondary text-sm text-center px-6 leading-relaxed">
        Visit <span className="font-semibold text-text-primary">{businessName}</span> at least once to unlock
      </p>
    </motion.div>
  );
}
