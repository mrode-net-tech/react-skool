# 0.2 Values, references and immutability

## Goal

You write the cart logic as a set of pure functions in `src/features/cart/cart.ts`, with tests you write yourself. No function changes its input.

## Before you start

Lesson 0.1 is done: `pnpm test` runs and `formatPrice` passes its tests.

## Concepts

### Arrays and objects are shared, not copied

In PHP, `$b = $a` on an array gives you a copy, so changing `$b` never touches `$a`. In JavaScript, arrays and objects are reference values. Assignment copies the reference, and both variables point to the same data:

```ts
const a = [1, 2, 3]
const b = a
b.push(4)
console.log(a) // [1, 2, 3, 4]
```

The same happens when you pass an array to a function. PHP objects already work this way, so it helps to think of every JS array as a PHP object.

`const` only stops you from assigning a new value to the variable. The contents can still change: `const a = []; a.push(1)` is valid code.

### Why React cares

To decide whether something changed, React compares references: is this the same object as last time? If you change an array in place, the reference stays the same, and React may not notice the change. So React code never mutates state. It creates a new array or object with the change applied. This lesson builds that habit on plain functions before React is involved.

### Copying with spread

The spread syntax `...` makes a shallow copy:

```ts
const tags = ['new', 'sale']
const moreTags = [...tags, 'eco'] // new array

const user = { name: 'Ann', city: 'Gdańsk' }
const moved = { ...user, city: 'Kraków' } // new object, city replaced
```

Shallow means nested objects are still shared. `{ ...order }` copies `order`, but `copy.items` is the same array as `order.items`. To change a nested value, copy each level on the way down:

```ts
const updated = { ...order, items: [...order.items, newItem] }
```

### Array methods instead of loops

Most array work in React code uses methods that return a new array.

| JS | Closest PHP | Note |
|---|---|---|
| `map(fn)` | `array_map` | The callback receives `(item, index)` |
| `filter(fn)` | `array_filter` | JS returns a new array with indexes 0, 1, 2... PHP keeps the original keys. |
| `reduce(fn, initial)` | `array_reduce` | |
| `find(fn)`, `findIndex(fn)` | a loop with `break` | `find` returns `undefined` when nothing matches |
| `some(fn)`, `every(fn)` | `array_any`, `array_all` (PHP 8.4) | |
| `toSorted(fn)` | `usort` on a copy | |

`push`, `pop`, `splice`, `sort` and `reverse` change the array in place. Don't use them on data your function received. The copying versions are `toSorted`, `toReversed`, `toSpliced` and `with(index, value)`.

### Equality and truthiness

Use `===` and `!==` everywhere. Like PHP's `===`, they compare without type conversion. For arrays and objects, `===` compares references, so `[1] === [1]` is `false`.

Some values are falsy in PHP but truthy in JS:

| Value | PHP | JS |
|---|---|---|
| `"0"` | falsy | truthy |
| `[]` | falsy | truthy |
| `0`, `""`, `null` | falsy | falsy |

JS has two empty values, `null` and `undefined`. Reading a missing property or array index gives `undefined`, never an error or a warning. `??` works like in PHP, and `?.` is PHP's `?->`.

### Money and floating point

`0.1 + 0.2` is `0.30000000000000004` in JS, the same as in PHP. DummyJSON prices are floats such as `9.99`. In this course you round money to two decimals at the end of each calculation: `Math.round(value * 100) / 100`. A real shop would keep prices as integer cents. The extra task tries that.

### toBe and toEqual

Vitest has two ways to compare. `toBe` checks identity: is it the very same value or reference? `toEqual` compares the contents, recursively. For arrays and objects you usually want `toEqual`. Use `toBe` when you want to check that a function returned the same reference.

Docs: [Array methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [Spread syntax (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [Equality comparisons (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness), [Vitest expect API](https://vitest.dev/api/expect).

## Task

Create `src/features/cart/cart.ts` and `src/features/cart/cart.test.ts`.

Start with these types. In lesson 0.3 you replace `CartProduct` with a type derived from the real product.

```ts
export type CartProduct = {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
}

export type CartItem = {
  product: CartProduct
  quantity: number
}
```

Write the functions below. Each one returns a new value and leaves its arguments untouched.

1. `finalPrice(product: CartProduct): number` returns the unit price after the discount. DummyJSON's `price` is the list price, so the final price is `price * (1 - discountPercentage / 100)`, rounded to two decimals. The cart shows it as "$8.94 each".
2. `lineTotal(item: CartItem): number` returns what one cart line costs after the discount. Calculate it from the whole line, `price * quantity`, and round only at the end. This is how DummyJSON calculates its carts. Two mascaras cost $17.89. Rounding the unit price first gives $17.88.
3. `addItem(items: CartItem[], product: CartProduct, quantity = 1): CartItem[]`. If the product is already in the cart, increase its quantity. Otherwise add a new item at the end.
4. `removeItem(items: CartItem[], productId: number): CartItem[]`.
5. `updateQuantity(items: CartItem[], productId: number, quantity: number): CartItem[]`. A quantity of 0 or less removes the item. An unknown `productId` leaves the items as they are.
6. `cartTotals(items: CartItem[]): CartTotals`. Define `CartTotals` as an object type with four fields:
   - `itemCount`: the sum of all quantities
   - `subtotal`: the sum of list prices times quantities
   - `savings`: how much the discounts save
   - `total`: what the customer pays, `subtotal - savings`

   Round each money value to two decimals. The cart drawer in the skeleton shows these four values.

Write the tests first and then make them pass. Start from this list and add your own cases:

```ts
import { describe, it } from 'vitest'

describe('addItem', () => {
  it.todo('adds a new product with quantity 1 by default')
  it.todo('increases the quantity when the product is already in the cart')
  it.todo('does not change the original array')
})

describe('updateQuantity', () => {
  it.todo('sets the new quantity')
  it.todo('removes the item when the quantity is 0 or less')
  it.todo('leaves the items as they are for an unknown product id')
})

describe('cartTotals', () => {
  it.todo('returns zeros for an empty cart')
  it.todo('returns subtotal 19.98, savings 2.09 and total 17.89 for two mascaras')
})
```

The second `cartTotals` case uses product 1 from the fixtures: price 9.99, discount 10.48%.

For test data, take two or three real products from `../skeleton/src/fixtures/products.json`, keep only the fields `CartProduct` needs, and put them in constants at the top of the test file.

To prove that a function doesn't mutate its input, freeze the input. ES modules run in strict mode, so writing to a frozen object throws an error and the test fails:

```ts
const items = Object.freeze([Object.freeze({ product: someProduct, quantity: 1 })])
```

`Object.freeze` is shallow too, so freeze every level you pass in.

## Acceptance criteria

- [ ] All six functions are exported and have explicit parameter and return types.
- [ ] No function changes its arguments, and tests with frozen inputs prove it.
- [ ] At least 10 tests, all passing.
- [ ] Money values are rounded to two decimals.
- [ ] The functions use array methods (`map`, `filter`, `reduce`, `find`) and no loops. Loops are fine in JS in general. This lesson is practice for the methods.
- [ ] `pnpm typecheck` passes.

## Check

```bash
pnpm test
pnpm typecheck
```

## Commit

```bash
git add -A
git commit -m "feat(cart): add pure cart functions with tests"
```

## Extra

- Move the money calculations to integer cents and convert back to dollars only when you return. Do the tests still pass?
- Write `mergeCarts(a: CartItem[], b: CartItem[]): CartItem[]`. It combines two carts and adds up the quantities of the same product.
