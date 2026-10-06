// Static markup. In lesson 1.2 this renders a list of products passed as a prop.
import { ProductCard } from '@/features/catalog/product-card'

export function ProductGrid() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
      <li className="flex">
        <ProductCard />
      </li>
    </ul>
  )
}
