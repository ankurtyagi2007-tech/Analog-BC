import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
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
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <div className="pt-[max(1rem,env(safe-area-inset-top))] px-5 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-espresso/5 flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-espresso" />
        </button>
      </div>

      {/* Avatar and info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center px-5 pb-6"
      >
        <img
          src={state.user.avatar}
          alt={state.user.name}
          className="w-24 h-24 rounded-full object-cover border-3 border-cream shadow-md"
        />
        <h1 className="font-serif text-2xl text-espresso mt-4">{state.user.name}</h1>
        <p className="text-sm text-espresso/50 mt-1">
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
              className="bg-warm-white rounded-xl p-3 text-center shadow-sm border border-espresso/5"
            >
              <p className="font-serif text-xl text-espresso">{value}</p>
              <p className="text-[10px] text-espresso/50 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Places */}
      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-espresso mb-3">My Places</h3>
        <div className="flex flex-col gap-2">
          {state.businesses
            .filter((b) => state.user.enrolledBusinesses.includes(b.id))
            .map((biz) => (
              <motion.div
                key={biz.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/business/${biz.id}`)}
                className="flex items-center gap-3 bg-warm-white rounded-xl p-3 shadow-sm border border-espresso/5 cursor-pointer"
              >
                <img
                  src={biz.imageCard}
                  alt={biz.name}
                  className="w-12 h-12 rounded-lg object-cover img-moody"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-espresso">{biz.name}</p>
                  <p className="text-xs text-espresso/50">{biz.type}</p>
                </div>
                <span className="text-xs text-terracotta">{biz.totalVisits} visits</span>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-6">
        <h3 className="font-serif text-lg text-espresso mb-3">Settings</h3>
        <div className="bg-warm-white rounded-2xl shadow-sm border border-espresso/5 overflow-hidden">
          {settingsItems.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer ${
                i < settingsItems.length - 1 ? 'border-b border-espresso/5' : ''
              }`}
            >
              <Icon size={18} className="text-espresso/40" />
              <span className="text-sm text-espresso">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div className="px-5 pb-12">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-espresso/10 text-espresso/60 text-sm"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
