import type { ReactNode } from 'react'
import { ArrowLeft, ClipboardList, Package, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b bg-muted/40 md:w-60 md:shrink-0 md:border-r md:border-b-0">
        <div className="flex h-16 items-center gap-2 px-6 font-bold tracking-tight">
          <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
          Kramik admin
        </div>
        <nav aria-label="Admin">
          <ul className="flex gap-1 overflow-x-auto px-3 pb-3 text-sm md:grid md:pb-0">
            <li>
              <a
                href="/admin/products"
                aria-current="page"
                className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 font-medium text-accent-foreground"
              >
                <Package aria-hidden="true" className="size-4" />
                Products
              </a>
            </li>
            <li>
              <span
                aria-disabled="true"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground opacity-60"
              >
                <ClipboardList aria-hidden="true" className="size-4" />
                Orders
                <Badge variant="outline">soon</Badge>
              </span>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to shop
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
