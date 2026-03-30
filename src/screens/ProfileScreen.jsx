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

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const monthsSince = () => {
    const start = new Date(state.user.memberSince);
    const now = new Date();
    return Math.floor((now - start) / (30 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="min-h-dvh bg-cream pb-8">
      {/* Header */}
      <div className="pt-[max(1rem,env(safe-area-inset-top))] px-5 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-espresso/[0.05] flex items-center justify-center hover:bg-espresso/[0.08] transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-espresso" />
        </button>
      </div>

      {/* Avatar and info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center px-5 pb-6"
      >
        <img
          src={state.user.avatar}
          alt={state.user.name}
          className="w-24 h-24 rounded-full object-cover border-3 border-cream shadow-lg"
        />
        <h1 className="font-serif text-2xl text-espresso font-semibold mt-4">{state.user.name}</h1>
        <p className="text-sm text-warm-gray mt-1">
          Member for {monthsSince()} months
        </p>
      </motion.div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Visits', value: state.user.totalVisits },
            { label: 'Lifetime Points', value: state.user.lifetimePoints.toLocaleString() },
            {
              label: 'Places',
              value: `${state.user.enrolledBusinesses.length}/${state.businesses.length}`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-warm-white rounded-2xl p-4 text-center shadow-sm border border-espresso/[0.06]"
            >
              <p className="font-serif text-xl text-espresso font-semibold">{value}</p>
              <p className="text-[11px] text-warm-gray mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Places */}
      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-espresso font-semibold mb-3">My Places</h3>
        <div className="flex flex-col gap-2">
          {state.businesses
            .filter((b) => state.user.enrolledBusinesses.includes(b.id))
            .map((biz) => (
              <motion.div
                key={biz.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/business/${biz.id}`)}
                className="flex items-center gap-3 bg-warm-white rounded-2xl p-3.5 shadow-sm border border-espresso/[0.06] cursor-pointer group"
              >
                <img
                  src={biz.imageCard}
                  alt={biz.name}
                  className="w-12 h-12 rounded-xl object-cover img-moody"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-espresso">{biz.name}</p>
                  <p className="text-xs text-warm-gray">{biz.type}</p>
                </div>
                <span className="text-xs text-terracotta font-semibold">{biz.totalVisits} visits</span>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-espresso font-semibold mb-3">Settings</h3>
        <div className="bg-warm-white rounded-2xl shadow-sm border border-espresso/[0.06] overflow-hidden">
          {settingsItems.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-espresso/[0.02] transition-colors ${
                i < settingsItems.length - 1 ? 'border-b border-espresso/[0.04]' : ''
              }`}
            >
              <Icon size={18} className="text-warm-gray" />
              <span className="text-sm text-espresso flex-1">{label}</span>
              <ChevronRight size={15} className="text-espresso/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div className="px-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-espresso/10 text-warm-gray text-sm font-medium hover:bg-espresso/[0.02] transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
