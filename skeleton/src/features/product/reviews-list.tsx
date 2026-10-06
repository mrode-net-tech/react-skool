// Static markup. You will replace the hardcoded values with props in lesson 1.2.
import { RatingStars } from '@/components/ui/rating-stars'

export function ReviewsList() {
  return (
    <section aria-labelledby="reviews-heading" className="grid gap-4">
      <h2 id="reviews-heading" className="text-xl font-semibold">
        Reviews (3)
      </h2>
      <ul className="grid gap-4">
        <li className="grid gap-2 rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">Eleanor Collins</p>
            <time dateTime="2025-04-30T09:41:02.053Z" className="text-sm text-muted-foreground">
              Apr 30, 2025
            </time>
          </div>
          <RatingStars rating={3} />
          <p className="text-sm text-muted-foreground">Would not recommend!</p>
        </li>
        <li className="grid gap-2 rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">Lucas Gordon</p>
            <time dateTime="2025-04-30T09:41:02.053Z" className="text-sm text-muted-foreground">
              Apr 30, 2025
            </time>
          </div>
          <RatingStars rating={4} />
          <p className="text-sm text-muted-foreground">Very satisfied!</p>
        </li>
        <li className="grid gap-2 rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">Eleanor Collins</p>
            <time dateTime="2025-04-30T09:41:02.053Z" className="text-sm text-muted-foreground">
              Apr 30, 2025
            </time>
          </div>
          <RatingStars rating={5} />
          <p className="text-sm text-muted-foreground">Highly impressed!</p>
        </li>
      </ul>
    </section>
  )
}
