const tierColors = {
  Staff: 'bg-espresso text-cream',
  'First Pour': 'bg-warm-gray/20 text-espresso/70',
  Regular: 'bg-sage/20 text-sage',
  Family: 'bg-terracotta/20 text-terracotta',
  'Inner Circle': 'bg-espresso/10 text-espresso',
  Newcomer: 'bg-warm-gray/20 text-espresso/70',
  Patron: 'bg-sage/20 text-sage',
  Confidant: 'bg-terracotta/20 text-terracotta',
  'House Guest': 'bg-espresso/10 text-espresso',
  Taster: 'bg-warm-gray/20 text-espresso/70',
  Enthusiast: 'bg-sage/20 text-sage',
  Sommelier: 'bg-terracotta/20 text-terracotta',
  'Cellar Keeper': 'bg-espresso/10 text-espresso',
  'First Slice': 'bg-warm-gray/20 text-espresso/70',
  'Morning Regular': 'bg-sage/20 text-sage',
  'Sourdough Society': 'bg-terracotta/20 text-terracotta',
  'First Course': 'bg-warm-gray/20 text-espresso/70',
  'Regular Table': 'bg-sage/20 text-sage',
  "Chef's Table": 'bg-terracotta/20 text-terracotta',
  'Family Meal': 'bg-espresso/10 text-espresso',
};

export default function TierBadge({ tier, className = '' }) {
  const colors = tierColors[tier] || 'bg-warm-gray/20 text-espresso/70';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${colors} ${className}`}
    >
      {tier}
    </span>
  );
}
