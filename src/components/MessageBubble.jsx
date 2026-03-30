import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import TierBadge from './TierBadge';
import { useApp } from '../context/AppContext';

function formatTime(timestamp) {
  const diff = new Date() - new Date(timestamp);
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

export default function MessageBubble({ message }) {
  const { state, dispatch } = useApp();
  const isExpanded = state.expandedThreads.includes(message.id);
  const hasReplies = message.replies && message.replies.length > 0;

  return (
    <div className={`px-5 py-2.5 ${message.pinned ? 'border-l-2 border-sage bg-sage/[0.04]' : ''}`}>
      <div className="flex gap-3">
        <img src={message.author.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-text-primary">{message.author.name}</span>
            <TierBadge tier={message.author.tier} />
            <span className="text-[10px] text-text-muted ml-auto">{formatTime(message.timestamp)}</span>
          </div>
          <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{message.content}</p>
          {hasReplies && (
            <button onClick={() => dispatch({ type: 'TOGGLE_THREAD', payload: message.id })} className="flex items-center gap-1.5 mt-2.5 text-gold/70 hover:text-gold text-xs font-medium transition-colors cursor-pointer">
              <MessageCircle size={13} />
              <span>{message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}</span>
            </button>
          )}
          <AnimatePresence>
            {isExpanded && hasReplies && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                <div className="mt-3 ml-2 border-l-2 border-border pl-3 flex flex-col gap-3">
                  {message.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-2.5">
                      <img src={reply.author.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-text-primary">{reply.author.name}</span>
                          <TierBadge tier={reply.author.tier} />
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
