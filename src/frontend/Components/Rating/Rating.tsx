export interface RatingProps {
  value: number;
}

export function StarRating({ value }: RatingProps) {
  const filled = "★".repeat(value);
  const empty = "☆".repeat(5 - value);
  return <span style={{ fontSize: "20px" }}>{filled + empty}</span>;
}
