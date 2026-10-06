// Static page. It becomes the "/product/:id" route in lesson 2.2.
import { ProductDetails } from '@/features/product/product-details'
import { ProductGallery } from '@/features/product/product-gallery'
import { ReviewsList } from '@/features/product/reviews-list'

export function ProductPage() {
  return (
    <div className="grid gap-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <a href="/" className="hover:text-foreground">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/category/beauty" className="hover:text-foreground">
              Beauty
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            Essence Mascara Lash Princess
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery />
        <ProductDetails />
      </div>

      <section aria-labelledby="description-heading" className="grid max-w-3xl gap-3">
        <h2 id="description-heading" className="text-xl font-semibold">
          Description
        </h2>
        <p className="text-muted-foreground">
          The Essence Mascara Lash Princess is a popular mascara known for its volumizing and
          lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free
          formula.
        </p>
      </section>

      <ReviewsList />
    </div>
  )
}
