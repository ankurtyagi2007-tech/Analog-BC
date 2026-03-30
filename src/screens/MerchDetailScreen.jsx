import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TierBadge from '../components/TierBadge';
import merch from '../data/merch.json';

export default function MerchDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const item = merch.find((m) => m.id === id);
  if (!item) return null;

  const biz = state.businesses.find((b) => b.id === item.businessId);
  const isRedeemed = state.redeemedMerch.includes(id);
  const tierName = item.tierRequired.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const handleRedeem = () => { dispatch({ type: 'REDEEM_MERCH', payload: id }); navigate(`/redeem/${id}`); };

  return (
    <div className="min-h-dvh bg-bg-base">
      <div className="relative h-[45vh]">
        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover img-moody" />
        <div className="gradient-overlay-subtle absolute inset-0" />
        <button onClick={() => navigate(-1)} className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer" aria-label="Go back">
          <ArrowLeft size={18} className="text-text-primary" />
        </button>
      </div>

      <div className="px-5 -mt-4 relative z-10 pb-28">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div><h1 className="font-serif text-2xl text-text-primary font-semibold">{item.name}</h1><p className="text-sm text-text-muted mt-0.5">{biz?.name}</p></div>
            <TierBadge tier={tierName} />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>
          <div className="flex items-baseline gap-2 pt-4 border-t border-border">
            <span className="font-serif text-2xl text-gold font-semibold">{item.pointsCost}</span>
            <span className="text-sm text-text-muted">points</span>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-bg-base via-bg-base to-bg-base/0">
        <motion.button whileTap={{ scale: 0.97 }} onClick={isRedeemed ? () => navigate(`/redeem/${id}`) : handleRedeem}
          className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${isRedeemed ? 'bg-sage/20 text-sage border border-sage/20' : 'bg-gold text-bg-deep hover:bg-gold-light shadow-lg shadow-gold/15'}`}>
          {isRedeemed ? 'View QR Code' : 'Redeem'}
        </motion.button>
      </div>
    </div>
  );
}
