const tierColors = {
  'First Visit': 'bg-sand/40 text-espresso/70',
  'Regular': 'bg-olive/15 text-olive',
  'Insider': 'bg-terracotta/15 text-terracotta',
  'Inner Circle': 'bg-espresso/10 text-espresso',
}

export default function TierBadge({ tier, small = false }) {
  const colors = tierColors[tier] || tierColors['First Visit']

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors} ${
      small ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
    }`}>
      {tier}
    </span>
  )
}
