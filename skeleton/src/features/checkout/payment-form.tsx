// Static markup. The form gets state and validation in M7.
import { Banknote, CreditCard, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonClasses } from '@/components/ui/button-classes'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function PaymentForm() {
  return (
    <form className="grid gap-6" noValidate>
      <fieldset className="grid gap-3">
        <legend className="mb-2 text-lg font-semibold">Payment method</legend>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-checked:border-primary has-checked:bg-accent">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            defaultChecked
            className="accent-primary"
          />
          <CreditCard aria-hidden="true" className="size-5 text-muted-foreground" />
          <span className="font-medium">Card</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-checked:border-primary has-checked:bg-accent">
          <input type="radio" name="paymentMethod" value="blik" className="accent-primary" />
          <Smartphone aria-hidden="true" className="size-5 text-muted-foreground" />
          <span className="font-medium">BLIK</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-checked:border-primary has-checked:bg-accent">
          <input
            type="radio"
            name="paymentMethod"
            value="cash-on-delivery"
            className="accent-primary"
          />
          <Banknote aria-hidden="true" className="size-5 text-muted-foreground" />
          <span className="font-medium">Cash on delivery</span>
        </label>
      </fieldset>

      {/* Only one of the blocks below is shown at a time, depending on the payment method. */}
      <div className="grid gap-4 rounded-lg border p-4">
        <Field label="Card number" htmlFor="cardNumber">
          <Input
            id="cardNumber"
            name="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expiry date" htmlFor="cardExpiry">
            <Input id="cardExpiry" name="cardExpiry" autoComplete="cc-exp" placeholder="MM/YY" />
          </Field>
          <Field label="CVC" htmlFor="cardCvc">
            <Input
              id="cardCvc"
              name="cardCvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
            />
          </Field>
        </div>
      </div>

      <div hidden className="grid gap-4 rounded-lg border p-4">
        <Field label="BLIK code" htmlFor="blikCode" hint="6 digits from your banking app.">
          <Input
            id="blikCode"
            name="blikCode"
            inputMode="numeric"
            maxLength={6}
            aria-describedby="blikCode-hint"
          />
        </Field>
      </div>

      <div className="flex justify-between">
        <a href="/checkout" className={buttonClasses({ variant: 'ghost', size: 'lg' })}>
          Back
        </a>
        <Button type="submit" size="lg">
          Review order
        </Button>
      </div>
    </form>
  )
}
