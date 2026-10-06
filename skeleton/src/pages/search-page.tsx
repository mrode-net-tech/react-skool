// Static page. It becomes the "/search" route in lesson 3.6.
import { ProductGrid } from '@/features/catalog/product-grid'

export function SearchPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Results for <span className="text-primary">"mascara"</span>
      </h1>
      <ProductGrid />
    </div>
  )
}
