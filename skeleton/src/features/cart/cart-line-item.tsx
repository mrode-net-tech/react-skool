// Static markup. You will replace the hardcoded values with props in lesson 1.3.
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { QuantityStepper } from '@/features/product/quantity-stepper'

export function CartLineItem() {
  return (
    <li className="flex gap-4 py-4">
      <img
        src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
        alt=""
        width={80}
        height={80}
        className="size-20 shrink-0 rounded-md border bg-muted object-contain p-1"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <a href="/product/1" className="text-sm font-medium hover:underline">
            Essence Mascara Lash Princess
          </a>
          <Price amount={17.89} className="text-sm" />
        </div>
        <p className="text-xs text-muted-foreground">$8.94 each</p>
        <div className="flex items-center justify-between">
          <QuantityStepper />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove Essence Mascara Lash Princess from cart"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  )
}
