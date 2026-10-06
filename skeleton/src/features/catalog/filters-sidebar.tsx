// Static markup. Categories are loaded in lesson 3.5, filters move to the URL in M6.
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type FiltersSidebarProps = {
  className?: string
}

export function FiltersSidebar({ className }: FiltersSidebarProps) {
  return (
    <aside className={cn('grid content-start gap-6', className)}>
      <div className="grid gap-2">
        <Label htmlFor="sort">Sort by</Label>
        <Select id="sort" name="sort" defaultValue="price-asc">
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating-desc">Best rated</option>
          <option value="title-asc">Name: A to Z</option>
        </Select>
      </div>

      <nav aria-labelledby="filter-categories">
        <h2 id="filter-categories" className="mb-2 text-sm font-medium">
          Categories
        </h2>
        <ul className="grid gap-1 text-sm">
          <li>
            <a
              href="/shop"
              aria-current="page"
              className="block rounded-md bg-accent px-3 py-1.5 font-medium text-accent-foreground"
            >
              All products
            </a>
          </li>
          <li>
            <a
              href="/category/beauty"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Beauty
            </a>
          </li>
          <li>
            <a
              href="/category/fragrances"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Fragrances
            </a>
          </li>
          <li>
            <a
              href="/category/furniture"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Furniture
            </a>
          </li>
          <li>
            <a
              href="/category/groceries"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Groceries
            </a>
          </li>
          <li>
            <a
              href="/category/home-decoration"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Home Decoration
            </a>
          </li>
          <li>
            <a
              href="/category/laptops"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Laptops
            </a>
          </li>
          <li>
            <a
              href="/category/smartphones"
              className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Smartphones
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
