import { Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import FilterChips from '../components/FilterChips';
import MessageBubble from '../components/MessageBubble';
import PollCard from '../components/PollCard';
import communityData from '../data/community.json';

export default function CommunityScreen() {
  const { state, dispatch } = useApp();

  const enrolledBusinesses = state.businesses.filter((b) => state.user.enrolledBusinesses.includes(b.id));
  const activeFilter = state.activeBusinessFilter || enrolledBusinesses[0]?.id;
  const community = communityData[activeFilter];
  if (!community) return null;

  const pinnedMessages = community.messages.filter((m) => m.pinned);
  const regularMessages = community.messages.filter((m) => !m.pinned);

  return (
    <div className="min-h-dvh bg-bg-base pb-24">
      <div className="pt-[max(1.25rem,env(safe-area-inset-top))] px-5 pb-2">
        <h1 className="font-serif text-2xl text-text-primary font-semibold">Community</h1>
      </div>

      <FilterChips businesses={enrolledBusinesses} activeFilter={activeFilter} onFilter={(id) => dispatch({ type: 'SET_BUSINESS_FILTER', payload: id || enrolledBusinesses[0]?.id })} />

      <div className="px-5 pb-3">
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="font-medium">{community.membersTotal} members</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />{community.membersOnline} online</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" />{community.businessUsersOnline} staff</span>
        </div>
      </div>

      {pinnedMessages.length > 0 && (
        <div className="mb-2">
          <p className="px-5 text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1.5 font-semibold">Pinned</p>
          {pinnedMessages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
          <div className="mx-5 h-px bg-border mt-2" />
        </div>
      )}

      <div className="mt-2">
        {regularMessages.map((msg) => msg.isPoll ? <PollCard key={msg.id} message={msg} /> : <MessageBubble key={msg.id} message={msg} />)}
      </div>

      <motion.button whileTap={{ scale: 0.9 }} className="fixed bottom-22 right-5 w-14 h-14 rounded-full bg-gold shadow-lg shadow-gold/20 flex items-center justify-center z-40 cursor-pointer hover:bg-gold-light transition-colors" aria-label="Compose message">
        <Pencil size={18} className="text-bg-deep" />
      </motion.button>

      <BottomNav />
    </div>
  );
}
