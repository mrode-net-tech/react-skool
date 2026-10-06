// Dev-only preview of every page. Open /?gallery in the browser.
// It reads the page name from the query string and links reload the whole page.
import type { ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { ErrorState } from '@/components/error-state'
import { SiteLayout } from '@/components/layout/site-layout'
import { Button } from '@/components/ui/button'
import { AdminLayout } from '@/features/admin/admin-layout'
import { CartDrawer } from '@/features/cart/cart-drawer'
import { ProductGridSkeleton } from '@/features/catalog/product-grid-skeleton'
import { SearchEmpty } from '@/features/catalog/search-empty'
import { AccountPage } from '@/pages/account-page'
import { AdminProductEditPage } from '@/pages/admin-product-edit-page'
import { AdminProductsPage } from '@/pages/admin-products-page'
import { CategoryPage } from '@/pages/category-page'
import { CheckoutPage } from '@/pages/checkout-page'
import { CheckoutPaymentPage } from '@/pages/checkout-payment-page'
import { CheckoutReviewPage } from '@/pages/checkout-review-page'
import { HomePage } from '@/pages/home-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { OrderSuccessPage } from '@/pages/order-success-page'
import { ProductPage } from '@/pages/product-page'
import { SearchPage } from '@/pages/search-page'

type Entry = {
  label: string
  render: () => ReactNode
}

const ENTRIES: Record<string, Entry> = {
  home: {
    label: 'Home',
    render: () => (
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    ),
  },
  category: {
    label: 'Category',
    render: () => (
      <SiteLayout>
        <CategoryPage />
      </SiteLayout>
    ),
  },
  product: {
    label: 'Product',
    render: () => (
      <SiteLayout>
        <ProductPage />
      </SiteLayout>
    ),
  },
  search: {
    label: 'Search results',
    render: () => (
      <SiteLayout>
        <SearchPage />
      </SiteLayout>
    ),
  },
  'search-empty': {
    label: 'Search, no results',
    render: () => (
      <SiteLayout>
        <div className="grid gap-6">
          <h1 className="text-3xl font-bold tracking-tight">Results for "unicorn"</h1>
          <SearchEmpty />
        </div>
      </SiteLayout>
    ),
  },
  'cart-drawer': {
    label: 'Cart drawer',
    render: () => (
      <>
        <SiteLayout>
          <HomePage />
        </SiteLayout>
        <CartDrawer />
      </>
    ),
  },
  'checkout-shipping': {
    label: 'Checkout: shipping',
    render: () => (
      <SiteLayout>
        <CheckoutPage />
      </SiteLayout>
    ),
  },
  'checkout-payment': {
    label: 'Checkout: payment',
    render: () => (
      <SiteLayout>
        <CheckoutPaymentPage />
      </SiteLayout>
    ),
  },
  'checkout-review': {
    label: 'Checkout: review',
    render: () => (
      <SiteLayout>
        <CheckoutReviewPage />
      </SiteLayout>
    ),
  },
  'order-success': {
    label: 'Order success',
    render: () => (
      <SiteLayout>
        <OrderSuccessPage />
      </SiteLayout>
    ),
  },
  login: {
    label: 'Login',
    render: () => (
      <SiteLayout>
        <LoginPage />
      </SiteLayout>
    ),
  },
  account: {
    label: 'Account',
    render: () => (
      <SiteLayout>
        <AccountPage />
      </SiteLayout>
    ),
  },
  'admin-products': {
    label: 'Admin: products',
    render: () => (
      <AdminLayout>
        <AdminProductsPage />
      </AdminLayout>
    ),
  },
  'admin-product-edit': {
    label: 'Admin: edit product',
    render: () => (
      <AdminLayout>
        <AdminProductEditPage />
      </AdminLayout>
    ),
  },
  'not-found': {
    label: '404',
    render: () => (
      <SiteLayout>
        <NotFoundPage />
      </SiteLayout>
    ),
  },
  loading: {
    label: 'Loading state',
    render: () => (
      <SiteLayout>
        <ProductGridSkeleton />
      </SiteLayout>
    ),
  },
  error: {
    label: 'Error state',
    render: () => (
      <SiteLayout>
        <ErrorState
          title="Could not load products"
          description="The server did not respond. Check your connection and try again."
          action={
            <Button variant="outline">
              <RefreshCw />
              Try again
            </Button>
          }
        />
      </SiteLayout>
    ),
  },
}

export function Gallery() {
  const page = new URLSearchParams(window.location.search).get('page')
  const entry = page ? ENTRIES[page] : undefined

  return (
    <>
      {entry ? entry.render() : <GalleryIndex />}
      <details
        open={!entry}
        className="fixed right-4 bottom-4 z-50 w-56 rounded-lg border bg-popover text-sm text-popover-foreground shadow-lg"
      >
        <summary className="cursor-pointer px-4 py-2 font-medium">Gallery</summary>
        <ul className="max-h-80 overflow-y-auto border-t py-1">
          {Object.entries(ENTRIES).map(([key, { label }]) => (
            <li key={key}>
              <a
                href={`?gallery&page=${key}`}
                aria-current={key === page ? 'page' : undefined}
                className="block px-4 py-1.5 hover:bg-accent aria-[current=page]:font-semibold aria-[current=page]:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}

function GalleryIndex() {
  return (
    <main className="mx-auto grid max-w-2xl gap-4 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Skeleton gallery</h1>
      <p className="text-muted-foreground">
        Every page of the shop as static markup. Pick a page from the list in the corner.
      </p>
    </main>
  )
}
