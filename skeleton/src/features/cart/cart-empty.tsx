import { ShoppingCart } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { buttonClasses } from '@/components/ui/button-classes'

export function CartEmpty() {
  return (
    <EmptyState
      icon={ShoppingCart}
      title="Your cart is empty"
      description="Products you add to the cart will show up here."
      action={
        <a href="/shop" className={buttonClasses({ variant: 'outline' })}>
          Browse products
        </a>
      }
      className="border-none"
    />
  )
}
