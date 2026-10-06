// Static markup. Orders are the user's DummyJSON carts, loaded in lesson 9.8.
import { Price } from '@/components/ui/price'

export function OrderHistory() {
  return (
    <section aria-labelledby="orders-heading" className="grid content-start gap-4">
      <h2 id="orders-heading" className="text-xl font-semibold">
        Order history
      </h2>
      <ul className="grid gap-4">
        <li className="grid gap-4 rounded-lg border p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-medium">Order #1</p>
              <p className="text-sm text-muted-foreground">4 products, 12 items</p>
            </div>
            <Price amount={11510.81} original={13037.88} />
          </div>
          <ul className="flex gap-2" aria-label="Products in order #1">
            <li>
              <img
                src="https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp"
                alt="Blue Frock"
                width={56}
                height={56}
                className="size-14 rounded-md border bg-muted object-contain p-1"
              />
            </li>
            <li>
              <img
                src="https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/thumbnail.webp"
                alt="Generic Motorcycle"
                width={56}
                height={56}
                className="size-14 rounded-md border bg-muted object-contain p-1"
              />
            </li>
            <li>
              <img
                src="https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp"
                alt="iPhone 6"
                width={56}
                height={56}
                className="size-14 rounded-md border bg-muted object-contain p-1"
              />
            </li>
            <li>
              <img
                src="https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp"
                alt="Baseball Ball"
                width={56}
                height={56}
                className="size-14 rounded-md border bg-muted object-contain p-1"
              />
            </li>
          </ul>
        </li>
      </ul>
    </section>
  )
}
