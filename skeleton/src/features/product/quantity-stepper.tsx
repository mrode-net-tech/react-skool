// Static markup. You will add state and click handlers in lesson 1.3.
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuantityStepper() {
  return (
    <div
      role="group"
      aria-label="Quantity"
      className="inline-flex items-center rounded-md border border-input"
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        className="size-9 rounded-r-none"
      >
        <Minus />
      </Button>
      <output aria-live="polite" className="w-10 text-center text-sm font-medium tabular-nums">
        1
      </output>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Increase quantity"
        className="size-9 rounded-l-none"
      >
        <Plus />
      </Button>
    </div>
  )
}
