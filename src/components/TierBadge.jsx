const tierColors = {
  Staff: 'bg-espresso text-cream',
  'First Pour': 'bg-espresso/8 text-espresso/70',
  Regular: 'bg-sage/15 text-sage',
  Family: 'bg-terracotta/15 text-terracotta',
  'Inner Circle': 'bg-espresso/10 text-espresso',
  Newcomer: 'bg-espresso/8 text-espresso/70',
  Patron: 'bg-sage/15 text-sage',
  Confidant: 'bg-terracotta/15 text-terracotta',
  'House Guest': 'bg-espresso/10 text-espresso',
  Taster: 'bg-espresso/8 text-espresso/70',
  Enthusiast: 'bg-sage/15 text-sage',
  Sommelier: 'bg-terracotta/15 text-terracotta',
  'Cellar Keeper': 'bg-espresso/10 text-espresso',
  'First Slice': 'bg-espresso/8 text-espresso/70',
  'Morning Regular': 'bg-sage/15 text-sage',
  'Sourdough Society': 'bg-terracotta/15 text-terracotta',
  'First Course': 'bg-espresso/8 text-espresso/70',
  'Regular Table': 'bg-sage/15 text-sage',
  "Chef's Table": 'bg-terracotta/15 text-terracotta',
  'Family Meal': 'bg-espresso/10 text-espresso',
};

export default function TierBadge({ tier, className = '' }) {
  const colors = tierColors[tier] || 'bg-espresso/8 text-espresso/70';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${colors} ${className}`}
    >
      {tier}
    </span>
  );
}
