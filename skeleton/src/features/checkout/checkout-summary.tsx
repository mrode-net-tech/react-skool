// Static markup. Shows the real cart in M7.
import { Price } from '@/components/ui/price'
import { CartSummary } from '@/features/cart/cart-summary'

export function CheckoutSummary() {
  return (
    <aside
      aria-labelledby="checkout-summary-heading"
      className="grid content-start gap-4 self-start rounded-lg border bg-card p-6 text-card-foreground"
    >
      <h2 id="checkout-summary-heading" className="text-lg font-semibold">
        Order summary
      </h2>
      <ul className="divide-y">
        <li className="flex items-center gap-3 py-3">
          <img
            src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-md border bg-muted object-contain p-1"
          />
          <div className="flex-1 text-sm">
            <p className="font-medium">Essence Mascara Lash Princess</p>
            <p className="text-muted-foreground">Quantity: 2</p>
          </div>
          <Price amount={17.89} className="text-sm" />
        </li>
      </ul>
      <CartSummary />
    </aside>
  )
}
