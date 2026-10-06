// Static markup. Pagination is wired in lesson 3.5, the page number moves to the URL in M6.
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button-classes'

export function Pagination() {
  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="flex items-center gap-1">
        <li>
          <span aria-disabled="true" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
            <ChevronLeft aria-hidden="true" />
            Previous
          </span>
        </li>
        <li>
          <a
            href="?page=1"
            aria-current="page"
            className={buttonClasses({
              variant: 'outline',
              size: 'sm',
              className: 'w-9',
            })}
          >
            1
          </a>
        </li>
        <li>
          <a
            href="?page=2"
            className={buttonClasses({
              variant: 'ghost',
              size: 'sm',
              className: 'w-9',
            })}
          >
            2
          </a>
        </li>
        <li>
          <a
            href="?page=3"
            className={buttonClasses({
              variant: 'ghost',
              size: 'sm',
              className: 'w-9',
            })}
          >
            3
          </a>
        </li>
        <li aria-hidden="true" className="px-2 text-muted-foreground">
          …
        </li>
        <li>
          <a
            href="?page=17"
            className={buttonClasses({
              variant: 'ghost',
              size: 'sm',
              className: 'w-9',
            })}
          >
            17
          </a>
        </li>
        <li>
          <a href="?page=2" className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
            Next
            <ChevronRight aria-hidden="true" />
          </a>
        </li>
      </ul>
    </nav>
  )
}
