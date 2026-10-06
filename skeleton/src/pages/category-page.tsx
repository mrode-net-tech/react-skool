// Static page. It becomes the "/shop" and "/category/:slug" routes in M2.
import { CatalogToolbar } from '@/features/catalog/catalog-toolbar'
import { FiltersSidebar } from '@/features/catalog/filters-sidebar'
import { Pagination } from '@/features/catalog/pagination'
import { ProductGrid } from '@/features/catalog/product-grid'

export function CategoryPage() {
  return (
    <div className="grid gap-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <a href="/" className="hover:text-foreground">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            All products
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">All products</h1>

      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <FiltersSidebar />
        <div className="grid content-start gap-6">
          <CatalogToolbar />
          <ProductGrid />
          <Pagination />
        </div>
      </div>
    </div>
  )
}
