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
    quality: 'bg-quality',
    difficulty: 'bg-difficulty',
    engagement: 'bg-engagement',
    muted: 'bg-muted-foreground',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-muted rounded-full overflow-hidden ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}>
        <div
          className={`h-full rounded-full ${colorMap[color]} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-semibold tabular-nums w-7 text-right text-muted-foreground">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
