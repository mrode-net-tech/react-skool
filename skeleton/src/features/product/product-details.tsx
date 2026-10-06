// Static markup. You will replace the hardcoded values with props in lesson 1.2.
import { RotateCcw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { RatingStars } from '@/components/ui/rating-stars'
import { QuantityStepper } from '@/features/product/quantity-stepper'

export function ProductDetails() {
  return (
    <div className="grid content-start gap-6">
      <div className="grid gap-2">
        <p className="text-sm text-muted-foreground">Essence</p>
        <h1 className="text-3xl font-bold tracking-tight">Essence Mascara Lash Princess</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RatingStars rating={2.56} />
          <span>2.56 (3 reviews)</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Price amount={8.94} original={9.99} className="text-2xl" />
        <Badge variant="destructive">-10%</Badge>
      </div>

      <p className="flex items-center gap-2 text-sm">
        <Badge variant="success">In Stock</Badge>
        <span className="text-muted-foreground">99 left</span>
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper />
        <Button size="lg" className="flex-1 sm:flex-none">
          <ShoppingCart />
          Add to cart
        </Button>
      </div>

      <ul className="grid gap-3 rounded-lg border p-4 text-sm">
        <li className="flex items-center gap-3">
          <Truck aria-hidden="true" className="size-4 text-muted-foreground" />
          Ships in 3-5 business days
        </li>
        <li className="flex items-center gap-3">
          <ShieldCheck aria-hidden="true" className="size-4 text-muted-foreground" />1 week warranty
        </li>
        <li className="flex items-center gap-3">
          <RotateCcw aria-hidden="true" className="size-4 text-muted-foreground" />
          No return policy
        </li>
      </ul>
    </div>
  )
}
