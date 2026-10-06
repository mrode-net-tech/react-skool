// Static markup. The form gets state and validation in M7.
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export function ShippingForm() {
  return (
    <form className="grid gap-6" noValidate>
      <fieldset className="grid gap-4">
        <legend className="mb-2 text-lg font-semibold">Contact</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" htmlFor="firstName">
            <Input id="firstName" name="firstName" autoComplete="given-name" />
          </Field>
          <Field label="Last name" htmlFor="lastName">
            <Input id="lastName" name="lastName" autoComplete="family-name" />
          </Field>
          <Field label="Email" htmlFor="email" error="Enter a valid email address">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue="emily.johnson@"
              aria-invalid="true"
              aria-describedby="email-error"
            />
          </Field>
          <Field
            label="Phone"
            htmlFor="phone"
            hint="Only used if there is a problem with delivery."
          >
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-describedby="phone-hint"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-2 text-lg font-semibold">Shipping address</legend>
        <Field label="Address" htmlFor="address">
          <Input id="address" name="address" autoComplete="street-address" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="City" htmlFor="city">
            <Input id="city" name="city" autoComplete="address-level2" />
          </Field>
          <Field label="Postal code" htmlFor="postalCode">
            <Input id="postalCode" name="postalCode" autoComplete="postal-code" />
          </Field>
          <Field label="Country" htmlFor="country">
            <Select
              id="country"
              name="country"
              autoComplete="country-name"
              defaultValue="United States"
            >
              <option>United States</option>
              <option>Poland</option>
              <option>Germany</option>
              <option>United Kingdom</option>
            </Select>
          </Field>
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue to payment
        </Button>
      </div>
    </form>
  )
}
