import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import TierBadge from './TierBadge';
import { useApp } from '../context/AppContext';

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
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
  const isPinned = message.pinned;

  return (
    <div className={`px-5 py-2 ${isPinned ? 'border-l-2 border-sage bg-sage/5' : ''}`}>
      <div className="flex gap-3">
        <img
          src={message.author.avatar}
          alt={message.author.name}
          className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-espresso">
              {message.author.name}
            </span>
            <TierBadge tier={message.author.tier} />
            <span className="text-[10px] text-espresso/40 ml-auto">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <p className="text-sm text-espresso/80 mt-1 leading-relaxed">
            {message.content}
          </p>
          {hasReplies && (
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THREAD', payload: message.id })}
              className="flex items-center gap-1.5 mt-2 text-terracotta/80 text-xs"
            >
              <MessageCircle size={13} />
              <span>
                {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </button>
          )}
          <AnimatePresence>
            {isExpanded && hasReplies && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-2 ml-2 border-l border-espresso/10 pl-3 flex flex-col gap-3">
                  {message.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-2">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-espresso">
                            {reply.author.name}
                          </span>
                          <TierBadge tier={reply.author.tier} />
                        </div>
                        <p className="text-xs text-espresso/70 mt-0.5 leading-relaxed">
                          {reply.content}
                        </p>
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
