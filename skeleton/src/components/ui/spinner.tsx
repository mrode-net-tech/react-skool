import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type SpinnerProps = {
  label?: string
  className?: string
}

export function Spinner({ label = 'Loading', className }: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex items-center', className)}>
      <LoaderCircle aria-hidden="true" className="size-5 animate-spin text-muted-foreground" />
      <span className="sr-only">{label}</span>
    </span>
  )
}
