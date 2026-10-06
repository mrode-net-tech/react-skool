import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type CheckoutStep = 'shipping' | 'payment' | 'review'

type CheckoutStepsProps = {
  current: CheckoutStep
}

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === current)

  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center gap-2 text-sm">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <li
              key={step.id}
              className="flex flex-1 items-center gap-2"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                  isDone && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary text-primary',
                  !isDone && !isCurrent && 'text-muted-foreground',
                )}
              >
                {isDone ? <Check aria-hidden="true" className="size-4" /> : index + 1}
              </span>
              <span className={cn('font-medium', !isCurrent && 'text-muted-foreground')}>
                {step.label}
              </span>
              {index < STEPS.length - 1 && (
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
