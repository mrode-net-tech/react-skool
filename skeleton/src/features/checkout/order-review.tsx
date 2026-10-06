// Static markup. The review shows the real cart and form data in lesson 7.3.
import { Button } from '@/components/ui/button'
import { buttonClasses } from '@/components/ui/button-classes'
import { Price } from '@/components/ui/price'
import { CartSummary } from '@/features/cart/cart-summary'

export function OrderReview() {
  return (
    <div className="grid gap-6">
      <section aria-labelledby="review-items" className="grid gap-3">
        <h2 id="review-items" className="text-lg font-semibold">
          Items
        </h2>
        <ul className="divide-y rounded-lg border">
          <li className="flex items-center gap-4 p-4">
            <img
              src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-md border bg-muted object-contain p-1"
            />
            <div className="flex-1 text-sm">
              <p className="font-medium">Essence Mascara Lash Princess</p>
              <p className="text-muted-foreground">Quantity: 2</p>
            </div>
            <Price amount={17.89} className="text-sm" />
          </li>
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section
          aria-labelledby="review-shipping"
          className="grid content-start gap-2 rounded-lg border p-4 text-sm"
        >
          <div className="flex items-center justify-between">
            <h2 id="review-shipping" className="font-semibold">
              Shipping address
            </h2>
            <a href="/checkout" className="text-primary hover:underline">
              Edit
            </a>
          </div>
          <address className="text-muted-foreground not-italic">
            Emily Johnson
            <br />
            626 Main Street
            <br />
            Phoenix, MS 29112
            <br />
            United States
          </address>
        </section>

        <section
          aria-labelledby="review-payment"
          className="grid content-start gap-2 rounded-lg border p-4 text-sm"
        >
          <div className="flex items-center justify-between">
            <h2 id="review-payment" className="font-semibold">
              Payment
            </h2>
            <a href="/checkout/payment" className="text-primary hover:underline">
              Edit
            </a>
          </div>
          <p className="text-muted-foreground">Card ending in 4242</p>
        </section>
      </div>

      <div className="rounded-lg border p-4">
        <CartSummary />
      </div>

      <div className="flex justify-between">
        <a href="/checkout/payment" className={buttonClasses({ variant: 'ghost', size: 'lg' })}>
          Back
        </a>
        <Button size="lg">Place order</Button>
      </div>
    </div>
  )
}
