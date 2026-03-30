import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LockOverlay({ businessName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-20 bg-espresso/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl"
    >
      <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
        <Lock size={22} className="text-cream/80" />
      </div>
      <p className="text-cream/85 text-sm text-center px-6 leading-relaxed">
        Visit <span className="font-semibold">{businessName}</span> at least once to unlock
      </p>
    </motion.div>
  );
}
