// Static markup. Search is wired in lesson 3.6.
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type SearchBoxProps = {
  className?: string
}

export function SearchBox({ className }: SearchBoxProps) {
  return (
    <form role="search" action="/search" className={cn('relative flex w-full', className)}>
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input id="search" name="q" type="search" placeholder="Search products" className="pl-9" />
    </form>
  )
}
