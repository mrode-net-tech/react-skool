# 0.3 Types that model the domain

## Goal

You write TypeScript types for the real DummyJSON product data. You build a typed sort function with an exhaustive check, and a payment-method type that the checkout will use in module 7.

## Before you start

Lesson 0.2 is done. Copy the fixtures from the skeleton into your app. Run this in `shop/`:

```bash
mkdir -p src/fixtures
cp ../skeleton/src/fixtures/*.json src/fixtures/
```

`products.json` is the real response of `GET https://dummyjson.com/products?limit=12`. `categories.json` is the response of `GET https://dummyjson.com/products/categories`.

## Concepts

### Types describe shapes

PHP types are nominal. A value is a `Product` only if it was created from the `Product` class. TypeScript types are structural. A value is a `Product` if it has the right shape, wherever it came from:

```ts
type Point = { x: number; y: number }

const labelled = { x: 1, y: 2, label: 'A' }
const point: Point = labelled // OK: labelled has x and y
```

There is one exception. An object literal written directly in the assignment may not have extra properties: `const p: Point = { x: 1, y: 2, label: 'A' }` is an error. TS assumes the extra property is a typo.

Types disappear when the code is compiled. At runtime there is no `Point` to check against. When data comes from an API, TypeScript simply trusts the type you give it. In module 3 you add Zod, which checks the data at runtime.

### type and interface

Both describe the shape of an object. This course uses `type` everywhere because `type` can also describe unions. Choose one style per project and stick to it.

### Union and literal types

A union means "one of these": `string | null`. A literal type is a single exact value. A union of string literals is the usual TypeScript replacement for a small PHP enum:

```ts
type Status = 'draft' | 'published' | 'archived'
```

TS also has an `enum` keyword, but your tsconfig forbids it (`erasableSyntaxOnly`, see lesson 0.1). String unions need no runtime code, and they work well with JSON.

When you need the values at runtime too, for a dropdown or for validation, write them once as a constant array and derive the type from it:

```ts
export const STATUSES = ['draft', 'published', 'archived'] as const
export type Status = (typeof STATUSES)[number] // 'draft' | 'published' | 'archived'
```

`as const` makes the array read-only and keeps the literal values. Without it, the array would just be `string[]`.

### Narrowing

Inside an `if`, TS narrows a union to the members that are still possible at that point:

```ts
function label(value: string | number): string {
  if (typeof value === 'number') {
    return value.toFixed(2) // value is number here
  }
  return value.toUpperCase() // value is string here
}
```

Narrowing works with `typeof`, `===`, `in`, `Array.isArray` and truthiness checks. You can also write your own check, called a type guard. It is a function whose return type is `value is X`:

```ts
function isStatus(value: string): value is Status {
  return (STATUSES as readonly string[]).includes(value)
}
```

### Discriminated unions

When every member of a union has the same literal field, checking that field narrows the whole object. PHP has no direct equivalent. The closest is a small class hierarchy plus `instanceof`.

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rect':
      return shape.width * shape.height
  }
}
```

### Exhaustive checks

PHP's `match` throws `UnhandledMatchError` at runtime when no arm matches. TypeScript can catch the same mistake at compile time. In the `default` branch, assign the value to a variable of type `never`. If someone later adds a member to the union and forgets the `case`, this line stops compiling:

```ts
default: {
  const unhandled: never = shape
  throw new Error(`Unhandled shape: ${JSON.stringify(unhandled)}`)
}
```

### Generics

A generic type takes a type parameter. If you have used `@template T` in PHPStan or Psalm, it is the same idea, but the compiler checks it:

```ts
type Timestamped<T> = { data: T; fetchedAt: Date }

const result: Timestamped<string[]> = { data: ['a', 'b'], fetchedAt: new Date() }
```

### Utility types

TypeScript comes with helpers that build new types from existing ones. You will use these often: `Pick<T, 'a' | 'b'>`, `Omit<T, 'a'>`, `Partial<T>`, `Readonly<T>`, `Record<K, V>`.

### unknown and any

`any` turns type checking off for a value. `unknown` means "this could be anything, check it before you use it". It is close to PHP's `mixed` as PHPStan treats it. Use `unknown` for data you haven't checked yet. The lint rules in lesson 1.4 warn about `any`.

Docs: [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html), [Indexed access types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html).

## Task

### 1. Product types

Open `src/fixtures/products.json` and write types for it in `src/features/catalog/types.ts`:

- `Review`
- `Product`, with every field you find, including the nested objects (`dimensions`, `meta`, `reviews`)
- `ProductList`, for the whole response (`products`, `total`, `skip`, `limit`)
- `Category`, for one item of `src/fixtures/categories.json`

All 12 products in the fixture have every field. The full catalog of 194 products doesn't: 92 products, groceries among them, have no `brand`. Make `brand` optional with `?`.

When you use the types in another file, import them with `import type { Product } from './types'`. Your tsconfig has `verbatimModuleSyntax` turned on, so a plain `import` of a type is an error (TS1484).

Next, prove that the fixture matches your types. In `src/features/catalog/types.test.ts`, import the JSON file and assign it to a variable of your type:

```ts
import productsJson from '../../fixtures/products.json'

const list: ProductList = productsJson
```

If `pnpm typecheck` passes, the JSON fits your type. Add a simple runtime test as well, for example that the list has 12 products, so Vitest has something to run. Because of `noUncheckedIndexedAccess`, `list.products[0]` has the type `Product | undefined`. Check for `undefined` before you read its fields, or use `.find()`, which makes the same case explicit.

You may want to type a field like `availabilityStatus` as a union of literals. If you do, the assignment above fails. TypeScript reads strings in imported JSON as `string`, not as literals. Keep `string` for now. In module 3, Zod checks the values at runtime, and then the union type works.

Finally, open `src/features/cart/cart.ts` and replace your hand-written `CartProduct` with `Pick<Product, ...>`. The tests from 0.2 should still pass without changes.

### 2. Sorting

In `src/features/catalog/sort.ts`:

1. Define `PRODUCT_SORTS` as a const array with `'price-asc'`, `'price-desc'`, `'rating-desc'` and `'title-asc'`, and derive `ProductSort` from it.
2. Write a type guard, `isProductSort(value: string): value is ProductSort`. Module 6 uses it to read the sort order from the URL.
3. Write `sortProducts(products: Product[], sort: ProductSort): Product[]`. Sort by the `price`, `rating` and `title` fields. Use `localeCompare` for titles. Don't mutate the input. Use a `switch` with an exhaustive `never` check.

Test each sort order. Also test that the input array stays in its original order.

Then add `'stock-desc'` to `PRODUCT_SORTS` and look at the compile error. Then either implement the new case or remove it again.

### 3. Payment methods

In `src/features/checkout/payment.ts`, model the payment step of the checkout as a discriminated union `PaymentMethod` with a `type` field:

- `'card'` with `cardNumber`, `expiry` and `cvc`, all strings
- `'blik'` with a `code` (a 6-digit string)
- `'cash-on-delivery'` with no extra fields

Write `describePayment(method: PaymentMethod): string`. It returns `"Card ending in 4242"`, `"BLIK"` or `"Cash on delivery"`. Card numbers may contain spaces, so take the last four digits after removing them. Use an exhaustive switch, and write a test for each case.

## Acceptance criteria

- [ ] Assigning the products fixture to `ProductList` typechecks, and a test runs on the fixture.
- [ ] There is no `any` in your types.
- [ ] `CartProduct` is derived from `Product` with a utility type. The 0.2 tests still pass.
- [ ] `ProductSort` is derived from a const array, and `isProductSort` is a type guard.
- [ ] `sortProducts` and `describePayment` use exhaustive switches. You saw the compile error when a union member had no case.
- [ ] `sortProducts` doesn't mutate its input.
- [ ] `pnpm test` and `pnpm typecheck` pass.

## Check

```bash
pnpm test
pnpm typecheck
```

## Commit

```bash
git add -A
git commit -m "feat(catalog): add product types, sorting and payment methods"
```

## Extra

DummyJSON uses the same list shape for products, users and carts: `{ products, total, skip, limit }`, `{ users, total, skip, limit }`, and so on. Write a generic `ListResponse<K extends string, T>` so that `ListResponse<'products', Product>` describes the same shape as your `ProductList`. You need a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) for the key: `{ [P in K]: T[] }`.
