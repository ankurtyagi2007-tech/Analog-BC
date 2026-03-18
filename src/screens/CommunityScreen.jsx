import { Pencil } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import FilterChips from '../components/FilterChips';
import MessageBubble from '../components/MessageBubble';
import PollCard from '../components/PollCard';
import communityData from '../data/community.json';

export default function CommunityScreen() {
  const { state, dispatch } = useApp();

  const enrolledBusinesses = state.businesses.filter((b) =>
    state.user.enrolledBusinesses.includes(b.id)
  );

  const activeFilter = state.activeBusinessFilter || enrolledBusinesses[0]?.id;
  const community = communityData[activeFilter];

  if (!community) return null;

  const pinnedMessages = community.messages.filter((m) => m.pinned);
  const regularMessages = community.messages.filter((m) => !m.pinned);

  return (
    <div className="min-h-dvh bg-cream pb-24">
      {/* Header */}
      <div className="pt-[max(1rem,env(safe-area-inset-top))] px-5 pb-2">
        <h1 className="font-serif text-2xl text-espresso">Community</h1>
      </div>

      {/* Filter */}
      <FilterChips
        businesses={enrolledBusinesses}
        activeFilter={activeFilter}
        onFilter={(id) =>
          dispatch({
            type: 'SET_BUSINESS_FILTER',
            payload: id || enrolledBusinesses[0]?.id,
          })
        }
      />

      {/* Stats */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-4 text-xs text-espresso/50">
          <span>{community.membersTotal} members</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            {community.membersOnline} online
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            {community.businessUsersOnline} staff
          </span>
        </div>
      </div>

      {/* Pinned */}
      {pinnedMessages.length > 0 && (
        <div className="mb-2">
          <p className="px-5 text-[10px] uppercase tracking-[0.15em] text-espresso/40 mb-1">
            Pinned
          </p>
          {pinnedMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div className="mx-5 h-px bg-espresso/5 mt-2" />
        </div>
      )}

      {/* Messages */}
      <div className="mt-2">
        {regularMessages.map((msg) =>
          msg.isPoll ? (
            <PollCard key={msg.id} message={msg} />
          ) : (
            <MessageBubble key={msg.id} message={msg} />
          )
        )}
      </div>

      {/* Compose FAB */}
      <button className="fixed bottom-20 right-[calc(50%-195px+20px)] w-12 h-12 rounded-full bg-terracotta shadow-lg flex items-center justify-center z-40">
        <Pencil size={18} className="text-cream" />
      </button>

      <BottomNav />
    </div>
  );
}
