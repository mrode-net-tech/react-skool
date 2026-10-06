// Static page. The payment step of the checkout (M7).
import { CheckoutSteps } from '@/features/checkout/checkout-steps'
import { CheckoutSummary } from '@/features/checkout/checkout-summary'
import { PaymentForm } from '@/features/checkout/payment-form'

export function CheckoutPaymentPage() {
  return (
    <div className="grid gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="grid content-start gap-8">
          <CheckoutSteps current="payment" />
          <PaymentForm />
        </div>
        <CheckoutSummary />
      </div>
    </div>
  )
}
