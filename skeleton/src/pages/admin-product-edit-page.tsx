// Static page. It becomes the "/admin/products/:id" route in the admin panel lessons.
import { ArrowLeft } from 'lucide-react'
import { ProductForm } from '@/features/admin/product-form'

export function AdminProductEditPage() {
  return (
    <div className="grid gap-6">
      <a
        href="/admin/products"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Products
      </a>
      <h1 className="text-2xl font-bold tracking-tight">Edit product</h1>
      <ProductForm />
    </div>
  )
}
