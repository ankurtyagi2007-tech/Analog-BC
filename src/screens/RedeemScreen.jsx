import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import AnimatedQR from '../components/AnimatedQR';
import { useApp } from '../context/AppContext';
import merch from '../data/merch.json';

export default function RedeemScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();

  const item = merch.find((m) => m.id === id);
  if (!item) return null;

  const biz = state.businesses.find((b) => b.id === item.businessId);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 bg-cream flex flex-col"
    >
      {/* Close */}
      <div className="flex justify-end pt-[max(1rem,env(safe-area-inset-top))] px-5">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-espresso/[0.05] flex items-center justify-center hover:bg-espresso/[0.08] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} className="text-espresso" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="text-sm text-warm-gray mb-8 text-center font-medium"
        >
          Show this to your barista
        </motion.p>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 20 }}
        >
          <AnimatedQR itemName={item.name} businessName={biz?.name || ''} />
        </motion.div>
      </div>

      {/* Done button */}
      <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/business/${item.businessId}`)}
          className="w-full py-4 rounded-2xl border border-espresso/12 text-espresso text-sm font-semibold hover:bg-espresso/[0.02] transition-colors cursor-pointer"
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
}
