// Static page. It becomes the "/admin/products" route in the admin panel lessons.
import { ProductsTable } from '@/features/admin/products-table'

export function AdminProductsPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">194 products in the catalog.</p>
      </div>
      <ProductsTable />
    </div>
  )
}
