import type { ComponentProps } from 'react'
import { CircleAlert, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type AlertProps = ComponentProps<'div'> & {
  variant?: 'default' | 'destructive'
  title?: string
}

export function Alert({ variant = 'default', title, className, children, ...props }: AlertProps) {
  const Icon = variant === 'destructive' ? CircleAlert : Info

  return (
    <div
      role={variant === 'destructive' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-lg border p-4 text-sm',
        variant === 'destructive'
          ? 'border-destructive/40 text-destructive'
          : 'bg-card text-card-foreground',
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div className="grid gap-1">
        {title && <p className="font-medium">{title}</p>}
        <div
          className={variant === 'destructive' ? 'text-destructive/90' : 'text-muted-foreground'}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
