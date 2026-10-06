// Static markup. Data, sorting and actions are wired in the admin panel lessons.
import { ArrowUpDown, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonClasses } from '@/components/ui/button-classes'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/format'
import { Pagination } from '@/features/catalog/pagination'

export function ProductsTable() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="admin-search" className="sr-only">
            Search products
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input id="admin-search" type="search" placeholder="Search products" className="pl-9" />
        </div>
        <a href="/admin/products/new" className={buttonClasses()}>
          <Plus aria-hidden="true" />
          Add product
        </a>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th scope="col" className="w-16 px-4 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" aria-sort="ascending" className="px-4 py-3">
                <Button variant="ghost" size="sm" className="-ml-3">
                  Title
                  <ArrowUpDown aria-hidden="true" />
                </Button>
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Category
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" className="-mr-3">
                  Price
                  <ArrowUpDown aria-hidden="true" />
                </Button>
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" className="-mr-3">
                  Stock
                  <ArrowUpDown aria-hidden="true" />
                </Button>
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" className="-mr-3">
                  Rating
                  <ArrowUpDown aria-hidden="true" />
                </Button>
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-2">
                <img
                  src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-md border bg-muted object-contain"
                />
              </td>
              <th scope="row" className="px-4 py-2 text-left font-medium">
                Essence Mascara Lash Princess
              </th>
              <td className="px-4 py-2 text-muted-foreground">beauty</td>
              <td className="px-4 py-2 text-right tabular-nums">{formatPrice(9.99)}</td>
              <td className="px-4 py-2 text-right tabular-nums">99</td>
              <td className="px-4 py-2 text-right tabular-nums">2.56</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-1">
                  <a
                    href="/admin/products/1"
                    aria-label="Edit Essence Mascara Lash Princess"
                    className={buttonClasses({
                      variant: 'ghost',
                      size: 'icon',
                    })}
                  >
                    <Pencil aria-hidden="true" />
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete Essence Mascara Lash Princess"
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <img
                  src="https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-md border bg-muted object-contain"
                />
              </td>
              <th scope="row" className="px-4 py-2 text-left font-medium">
                Eyeshadow Palette with Mirror
              </th>
              <td className="px-4 py-2 text-muted-foreground">beauty</td>
              <td className="px-4 py-2 text-right tabular-nums">{formatPrice(19.99)}</td>
              <td className="px-4 py-2 text-right tabular-nums">34</td>
              <td className="px-4 py-2 text-right tabular-nums">2.86</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-1">
                  <a
                    href="/admin/products/2"
                    aria-label="Edit Eyeshadow Palette with Mirror"
                    className={buttonClasses({
                      variant: 'ghost',
                      size: 'icon',
                    })}
                  >
                    <Pencil aria-hidden="true" />
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete Eyeshadow Palette with Mirror"
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <img
                  src="https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-md border bg-muted object-contain"
                />
              </td>
              <th scope="row" className="px-4 py-2 text-left font-medium">
                Powder Canister
              </th>
              <td className="px-4 py-2 text-muted-foreground">beauty</td>
              <td className="px-4 py-2 text-right tabular-nums">{formatPrice(14.99)}</td>
              <td className="px-4 py-2 text-right tabular-nums">89</td>
              <td className="px-4 py-2 text-right tabular-nums">4.64</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-1">
                  <a
                    href="/admin/products/3"
                    aria-label="Edit Powder Canister"
                    className={buttonClasses({
                      variant: 'ghost',
                      size: 'icon',
                    })}
                  >
                    <Pencil aria-hidden="true" />
                  </a>
                  <Button variant="ghost" size="icon" aria-label="Delete Powder Canister">
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <img
                  src="https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-md border bg-muted object-contain"
                />
              </td>
              <th scope="row" className="px-4 py-2 text-left font-medium">
                Red Lipstick
              </th>
              <td className="px-4 py-2 text-muted-foreground">beauty</td>
              <td className="px-4 py-2 text-right tabular-nums">{formatPrice(12.99)}</td>
              <td className="px-4 py-2 text-right tabular-nums">91</td>
              <td className="px-4 py-2 text-right tabular-nums">4.36</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-1">
                  <a
                    href="/admin/products/4"
                    aria-label="Edit Red Lipstick"
                    className={buttonClasses({
                      variant: 'ghost',
                      size: 'icon',
                    })}
                  >
                    <Pencil aria-hidden="true" />
                  </a>
                  <Button variant="ghost" size="icon" aria-label="Delete Red Lipstick">
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  )
}
