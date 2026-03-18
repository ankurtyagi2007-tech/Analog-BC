import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LockOverlay({ businessName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-20 bg-espresso/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl"
    >
      <Lock size={28} className="text-cream/80" />
      <p className="text-cream/90 text-sm text-center px-6 leading-relaxed">
        Visit <span className="font-medium">{businessName}</span> at least once to unlock
      </p>
    </motion.div>
  );
}
