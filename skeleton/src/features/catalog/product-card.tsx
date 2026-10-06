// Static markup. You will replace the hardcoded values with props in lesson 1.2.
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { RatingStars } from '@/components/ui/rating-stars'

export function ProductCard() {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground">
      <div className="relative aspect-square bg-muted">
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
          alt="Essence Mascara Lash Princess"
          width={300}
          height={300}
          loading="lazy"
          className="size-full object-contain p-4 transition-transform group-hover:scale-105"
        />
        <Badge variant="destructive" className="absolute top-3 left-3">
          -10%
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">Beauty</p>
        <h3 className="line-clamp-2 font-medium">
          {/* The ::after overlay makes the whole card clickable without nesting the button inside the link. */}
          <a href="/product/1" className="after:absolute after:inset-0">
            Essence Mascara Lash Princess
          </a>
        </h3>
        <RatingStars rating={2.56} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Price amount={8.94} original={9.99} />
          <Button
            size="icon"
            variant="outline"
            aria-label="Add Essence Mascara Lash Princess to cart"
            className="relative z-10"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </article>
  )
}
