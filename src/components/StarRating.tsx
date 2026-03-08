import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, size = 16, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "fill-quality text-quality"
                : partial
                ? "fill-quality/50 text-quality"
                : "text-muted-foreground/30"
            }
          />
        );
      })}
    </div>
  );
}
