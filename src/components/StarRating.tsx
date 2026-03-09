import { RatingBar } from "./RatingBar";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, className = "" }: StarRatingProps) {
  return (
    <div className={`w-28 ${className}`}>
      <RatingBar value={rating} max={max} color="quality" size="sm" />
    </div>
  );
}
