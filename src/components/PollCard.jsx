import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import TierBadge from './TierBadge';

export default function PollCard({ message }) {
  const { state, dispatch } = useApp();
  const votedOptionId = state.pollVotes[message.id];
  const hasVoted = votedOptionId !== undefined;

  const totalVotes = message.pollOptions.reduce(
    (sum, opt) => sum + opt.votes + (votedOptionId === opt.id ? 1 : 0),
    0
  );

  const handleVote = (optionId) => {
    if (hasVoted) return;
    dispatch({ type: 'VOTE_POLL', payload: { pollId: message.id, optionId } });
  };

  return (
    <div className="px-5 py-3">
      <div className="bg-warm-white rounded-2xl p-4 shadow-sm border border-espresso/5">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={message.author.avatar}
            alt={message.author.name}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-espresso">{message.author.name}</span>
          <TierBadge tier={message.author.tier} />
        </div>
        <p className="text-sm text-espresso/80 mb-3">{message.content}</p>
        <div className="flex flex-col gap-2">
          {message.pollOptions.map((opt) => {
            const votes = opt.votes + (votedOptionId === opt.id ? 1 : 0);
            const pct = hasVoted ? Math.round((votes / totalVotes) * 100) : 0;
            const isSelected = votedOptionId === opt.id;

            return (
              <motion.button
                key={opt.id}
                onClick={() => handleVote(opt.id)}
                disabled={hasVoted}
                whileTap={!hasVoted ? { scale: 0.98 } : undefined}
                className={`relative overflow-hidden rounded-xl text-left transition-all ${
                  hasVoted
                    ? 'border border-espresso/10'
                    : 'border border-espresso/15 active:border-terracotta/30'
                }`}
              >
                {hasVoted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`absolute inset-y-0 left-0 ${
                      isSelected ? 'bg-terracotta/15' : 'bg-espresso/5'
                    }`}
                  />
                )}
                <div className="relative flex justify-between items-center px-3 py-2">
                  <span className={`text-sm ${isSelected ? 'font-medium text-terracotta' : 'text-espresso/70'}`}>
                    {opt.text}
                  </span>
                  {hasVoted && (
                    <span className="text-xs text-espresso/50 ml-2">{pct}%</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        {hasVoted && (
          <p className="text-[10px] text-espresso/40 mt-2 text-right">
            {totalVotes} votes
          </p>
        )}
      </div>
    </div>
  );
}
