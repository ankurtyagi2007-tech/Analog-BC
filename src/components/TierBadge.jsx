const tierColors = {
  Staff: 'bg-gold/20 text-gold',
  'First Pour': 'bg-surface text-text-secondary',
  Regular: 'bg-sage-dim text-sage',
  Family: 'bg-gold-dim text-gold',
  'Inner Circle': 'bg-text-primary/10 text-text-primary',
  Newcomer: 'bg-surface text-text-secondary',
  Patron: 'bg-sage-dim text-sage',
  Confidant: 'bg-gold-dim text-gold',
  'House Guest': 'bg-text-primary/10 text-text-primary',
  Taster: 'bg-surface text-text-secondary',
  Enthusiast: 'bg-sage-dim text-sage',
  Sommelier: 'bg-gold-dim text-gold',
  'Cellar Keeper': 'bg-text-primary/10 text-text-primary',
  'First Slice': 'bg-surface text-text-secondary',
  'Morning Regular': 'bg-sage-dim text-sage',
  'Sourdough Society': 'bg-gold-dim text-gold',
  'First Course': 'bg-surface text-text-secondary',
  'Regular Table': 'bg-sage-dim text-sage',
  "Chef's Table": 'bg-gold-dim text-gold',
  'Family Meal': 'bg-text-primary/10 text-text-primary',
};

export default function TierBadge({ tier, className = '' }) {
  const colors = tierColors[tier] || 'bg-surface text-text-secondary';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${colors} ${className}`}>
      {tier}
    </span>
  );
}
