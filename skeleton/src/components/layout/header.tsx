// Static markup. The cart count is wired in lesson 1.3, the links in lesson 2.1.
import { Menu, Moon, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchBox } from '@/features/catalog/search-box'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu />
        </Button>

        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <ShoppingBag aria-hidden="true" className="size-6 text-primary" />
          Kramik
        </a>

        <nav aria-label="Categories" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <a
                href="/category/beauty"
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Beauty
              </a>
            </li>
            <li>
              <a
                href="/category/fragrances"
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Fragrances
              </a>
            </li>
            <li>
              <a
                href="/category/furniture"
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Furniture
              </a>
            </li>
            <li>
              <a
                href="/category/laptops"
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Laptops
              </a>
            </li>
            <li>
              <a
                href="/category/smartphones"
                className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Smartphones
              </a>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchBox className="hidden w-64 lg:flex" />
          <Button variant="ghost" size="icon" aria-label="Switch to dark mode">
            <Moon />
          </Button>
          <a
            href="/account"
            aria-label="Account"
            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <User aria-hidden="true" className="size-4" />
          </a>
          <Button variant="ghost" size="icon" aria-label="Open cart, 2 items" className="relative">
            <ShoppingCart />
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
            >
              2
            </span>
          </Button>
        </div>
      </div>

      <div className="border-t px-4 py-2 lg:hidden">
        <SearchBox />
      </div>
    </header>
  )
}
