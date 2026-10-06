// Static markup. The form is wired with React Hook Form and Zod in the admin panel lessons.
import { Button } from '@/components/ui/button'
import { buttonClasses } from '@/components/ui/button-classes'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ProductForm() {
  return (
    <form className="grid max-w-2xl gap-6" noValidate>
      <Field label="Title" htmlFor="title">
        <Input id="title" name="title" defaultValue="Essence Mascara Lash Princess" />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue="The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula."
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" defaultValue="beauty">
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </Select>
        </Field>
        <Field label="Brand" htmlFor="brand">
          <Input id="brand" name="brand" defaultValue="Essence" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Price (USD)" htmlFor="price">
          <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue="9.99" />
        </Field>
        <Field label="Discount (%)" htmlFor="discountPercentage">
          <Input
            id="discountPercentage"
            name="discountPercentage"
            type="number"
            step="0.01"
            min="0"
            max="100"
            defaultValue="10.48"
          />
        </Field>
        <Field label="Stock" htmlFor="stock" error="Stock is required">
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            aria-invalid="true"
            aria-describedby="stock-error"
          />
        </Field>
      </div>

      <Field label="Thumbnail URL" htmlFor="thumbnail">
        <Input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
        />
      </Field>

      <div className="flex justify-end gap-3">
        <a href="/admin/products" className={buttonClasses({ variant: 'outline' })}>
          Cancel
        </a>
        <Button type="submit">Save product</Button>
      </div>
    </form>
  )
}
