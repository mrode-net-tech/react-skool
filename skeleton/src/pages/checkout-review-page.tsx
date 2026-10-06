// Static page. The review step of the checkout (M7).
import { CheckoutSteps } from '@/features/checkout/checkout-steps'
import { OrderReview } from '@/features/checkout/order-review'

export function CheckoutReviewPage() {
  return (
    <div className="grid max-w-3xl gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <CheckoutSteps current="review" />
      <OrderReview />
    </div>
  )
}
