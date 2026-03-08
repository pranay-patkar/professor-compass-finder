interface RatingBarProps {
  value: number;
  max?: number;
  color?: 'quality' | 'difficulty' | 'engagement' | 'muted';
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export function RatingBar({ value, max = 5, color = 'quality', size = 'sm', showValue = true }: RatingBarProps) {
  const pct = (value / max) * 100;
  const colorMap = {
    quality: 'bg-primary',
    difficulty: 'bg-accent',
    engagement: 'bg-engagement',
    muted: 'bg-muted-foreground',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex-1 bg-muted border border-border ${size === 'sm' ? 'h-2' : 'h-3'}`}>
        <div
          className={`h-full ${colorMap[color]} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && (
        <span className="text-2xs font-bold tabular-nums w-6 text-right">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
