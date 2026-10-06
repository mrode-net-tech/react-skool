import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

type PriceProps = {
  amount: number
  original?: number
  className?: string
}

export function Price({ amount, original, className }: PriceProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span className="font-semibold">{formatPrice(amount)}</span>
      {original !== undefined && (
        <del className="text-sm text-muted-foreground">
          <span className="sr-only">Original price: </span>
          {formatPrice(original)}
        </del>
      )}
    </span>
  )
}
