// Static markup. Shown when a search returns no products (lesson 3.6).
import { SearchX } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { buttonClasses } from '@/components/ui/button-classes'

export function SearchEmpty() {
  return (
    <EmptyState
      icon={SearchX}
      title={'No products match "unicorn"'}
      description="Check the spelling or try a more general word."
      action={
        <a href="/shop" className={buttonClasses({ variant: 'outline' })}>
          Browse all products
        </a>
      }
    />
  )
}
