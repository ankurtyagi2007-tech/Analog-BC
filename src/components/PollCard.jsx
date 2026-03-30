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
      <div className="bg-warm-white rounded-2xl p-5 shadow-sm border border-espresso/[0.06]">
        <div className="flex items-center gap-2.5 mb-3">
          <img
            src={message.author.avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-espresso">{message.author.name}</span>
          <TierBadge tier={message.author.tier} />
        </div>
        <p className="text-sm text-espresso/75 mb-4 leading-relaxed">{message.content}</p>
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
                className={`relative overflow-hidden rounded-xl text-left transition-all cursor-pointer ${
                  hasVoted
                    ? 'border border-espresso/8'
                    : 'border border-espresso/12 hover:border-terracotta/25 active:border-terracotta/30'
                }`}
              >
                {hasVoted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute inset-y-0 left-0 ${
                      isSelected ? 'bg-terracotta/12' : 'bg-espresso/[0.04]'
                    }`}
                  />
                )}
                <div className="relative flex justify-between items-center px-4 py-2.5">
                  <span className={`text-sm ${isSelected ? 'font-semibold text-terracotta' : 'text-espresso/70'}`}>
                    {opt.text}
                  </span>
                  {hasVoted && (
                    <span className="text-xs text-warm-gray ml-2 font-medium">{pct}%</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        {hasVoted && (
          <p className="text-[11px] text-warm-gray mt-3 text-right font-medium">
            {totalVotes} votes
          </p>
        )}
      </div>
    </div>
  );
}
