// Static markup. Opening, closing and the cart contents are wired in lesson 1.3.
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonClasses } from '@/components/ui/button-classes'
import { CartLineItem } from '@/features/cart/cart-line-item'
import { CartSummary } from '@/features/cart/cart-summary'

export function CartDrawer() {
  return (
    <div className="fixed inset-0 z-40">
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-xl"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 id="cart-title" className="text-lg font-semibold">
            Your cart (2)
          </h2>
          <Button variant="ghost" size="icon" aria-label="Close cart">
            <X />
          </Button>
        </div>

        <ul className="flex-1 divide-y overflow-y-auto px-6">
          <CartLineItem />
        </ul>

        <div className="grid gap-4 border-t px-6 py-4">
          <CartSummary />
          <a href="/checkout" className={buttonClasses({ size: 'lg', className: 'w-full' })}>
            Go to checkout
          </a>
        </div>
      </div>
    </div>
  )
}
