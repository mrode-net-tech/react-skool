// Static page. It becomes the "/" route in lesson 2.1.
import { ArrowRight } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button-classes'
import { ProductGrid } from '@/features/catalog/product-grid'

export function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid gap-6 rounded-xl bg-accent px-6 py-12 text-accent-foreground sm:px-12 sm:py-16">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          Everyday things, fair prices.
        </h1>
        <p className="max-w-lg text-lg opacity-80">
          194 products from beauty to motorcycles. Free shipping on every order.
        </p>
        <div>
          <a href="/shop" className={buttonClasses({ size: 'lg' })}>
            Shop now
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="grid gap-4">
        <h2 id="categories-heading" className="text-2xl font-semibold tracking-tight">
          Shop by category
        </h2>
        <ul className="flex flex-wrap gap-2">
          <li>
            <a
              href="/category/beauty"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Beauty
            </a>
          </li>
          <li>
            <a
              href="/category/fragrances"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Fragrances
            </a>
          </li>
          <li>
            <a
              href="/category/furniture"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Furniture
            </a>
          </li>
          <li>
            <a
              href="/category/groceries"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Groceries
            </a>
          </li>
          <li>
            <a
              href="/category/home-decoration"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Home Decoration
            </a>
          </li>
          <li>
            <a
              href="/category/kitchen-accessories"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Kitchen Accessories
            </a>
          </li>
          <li>
            <a
              href="/category/laptops"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Laptops
            </a>
          </li>
          <li>
            <a
              href="/category/smartphones"
              className={buttonClasses({
                variant: 'outline',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Smartphones
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="featured-heading" className="grid gap-4">
        <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight">
          Featured products
        </h2>
        <ProductGrid />
      </section>
    </div>
  )
}
