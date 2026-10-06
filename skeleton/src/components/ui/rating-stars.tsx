import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

type RatingStarsProps = {
  rating: number
  className?: string
}

const STARS = [1, 2, 3, 4, 5]

export function RatingStars({ rating, className }: RatingStarsProps) {
  // Round to the nearest half star: 4.36 -> 4.5, 2.56 -> 2.5.
  const rounded = Math.round(rating * 2) / 2

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {STARS.map((star) => {
        if (rounded >= star) {
          return <Star key={star} aria-hidden="true" className="size-4 fill-warning text-warning" />
        }
        if (rounded === star - 0.5) {
          return (
            <span key={star} className="relative">
              <Star aria-hidden="true" className="size-4 text-muted-foreground/40" />
              <StarHalf
                aria-hidden="true"
                className="absolute inset-0 size-4 fill-warning text-warning"
              />
            </span>
          )
        }
        return <Star key={star} aria-hidden="true" className="size-4 text-muted-foreground/40" />
      })}
      <span className="sr-only">Rated {rating.toFixed(1)} out of 5</span>
    </span>
  )
}
