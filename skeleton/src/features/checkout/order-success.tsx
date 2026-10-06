// Static markup. The order number comes from the API response in lesson 7.3.
import { CircleCheck } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button-classes'

export function OrderSuccess() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
      <CircleCheck aria-hidden="true" className="size-14 text-success" />
      <h1 className="text-2xl font-bold tracking-tight">Thank you for your order</h1>
      <p className="text-muted-foreground">
        Order <span className="font-medium text-foreground">#209</span> is confirmed. We sent the
        details to emily.johnson@x.dummyjson.com.
      </p>
      <div className="mt-2 flex gap-3">
        <a href="/shop" className={buttonClasses()}>
          Continue shopping
        </a>
        <a href="/account" className={buttonClasses({ variant: 'outline' })}>
          View your orders
        </a>
      </div>
    </div>
  )
}
