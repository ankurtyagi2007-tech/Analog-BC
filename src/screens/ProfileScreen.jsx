import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Bell, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const settingsItems = [
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Privacy & Settings' },
  { icon: HelpCircle, label: 'Help & Support' },
];

export default function ProfileScreen() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleSignOut = () => { dispatch({ type: 'LOGOUT' }); navigate('/'); };
  const monthsSince = () => { const start = new Date(state.user.memberSince); return Math.floor((new Date() - start) / (30 * 24 * 60 * 60 * 1000)); };

  return (
    <div className="min-h-dvh bg-bg-base pb-8">
      <div className="pt-[max(1rem,env(safe-area-inset-top))] px-5 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center hover:bg-surface-hover transition-colors cursor-pointer" aria-label="Go back">
          <ArrowLeft size={18} className="text-text-secondary" />
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center px-5 pb-6">
        <img src={state.user.avatar} alt={state.user.name} className="w-24 h-24 rounded-full object-cover border-2 border-gold/20 shadow-lg shadow-gold/10" />
        <h1 className="font-serif text-2xl text-text-primary font-semibold mt-4">{state.user.name}</h1>
        <p className="text-sm text-text-muted mt-1">Member for {monthsSince()} months</p>
      </motion.div>

      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Visits', value: state.user.totalVisits },
            { label: 'Lifetime Points', value: state.user.lifetimePoints.toLocaleString() },
            { label: 'Places', value: `${state.user.enrolledBusinesses.length}/${state.businesses.length}` },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card rounded-2xl p-4 text-center">
              <p className="font-serif text-xl text-text-primary font-semibold">{value}</p>
              <p className="text-[11px] text-text-muted mt-1 font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-text-primary font-semibold mb-3">My Places</h3>
        <div className="flex flex-col gap-2">
          {state.businesses.filter((b) => state.user.enrolledBusinesses.includes(b.id)).map((biz) => (
            <motion.div key={biz.id} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/business/${biz.id}`)} className="flex items-center gap-3 glass-card rounded-2xl p-3.5 cursor-pointer group">
              <img src={biz.imageCard} alt={biz.name} className="w-12 h-12 rounded-xl object-cover img-moody" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">{biz.name}</p>
                <p className="text-xs text-text-muted">{biz.type}</p>
              </div>
              <span className="text-xs text-gold font-semibold">{biz.totalVisits} visits</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-text-primary font-semibold mb-3">Settings</h3>
        <div className="glass-card rounded-2xl overflow-hidden">
          {settingsItems.map(({ icon: Icon, label }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-surface-hover transition-colors ${i < settingsItems.length - 1 ? 'border-b border-border' : ''}`}>
              <Icon size={18} className="text-text-muted" />
              <span className="text-sm text-text-primary flex-1">{label}</span>
              <ChevronRight size={15} className="text-text-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border text-text-muted text-sm font-medium hover:bg-surface-hover transition-colors cursor-pointer">
          <LogOut size={16} />Sign Out
        </motion.button>
      </div>
    </div>
  );
}
