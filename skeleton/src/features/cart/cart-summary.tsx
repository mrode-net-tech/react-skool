// Static markup. The totals are calculated from the cart in lesson 1.3.
import { formatPrice } from '@/lib/format'

export function CartSummary() {
  return (
    <dl className="grid gap-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd>{formatPrice(19.98)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">You save</dt>
        <dd className="text-success">−{formatPrice(2.09)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Shipping</dt>
        <dd>Free</dd>
      </div>
      <div className="flex justify-between border-t pt-2 text-base font-semibold">
        <dt>Total</dt>
        <dd>{formatPrice(17.89)}</dd>
      </div>
    </dl>
  )
}
