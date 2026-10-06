# 1.3 State and events

## Goal

The shop reacts to clicks. You can open a product from the grid and go back to the home page. You can choose a quantity and add products to the cart. You can open the cart drawer to see the items and the totals and to remove items. All of this runs on React state, using your cart functions from 0.2.

## Before you start

Lesson 1.2 is done. Cards, grid and product page render from props.

## Concepts

### A component runs again on every render

React calls your component function every time it needs to draw it again. Local variables start from scratch on each call, a bit like a PHP script that starts fresh on every request. `useState` gives a component a value that survives between calls:

```tsx
import { useState } from 'react'

export function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button type="button" onClick={() => setLikes(likes + 1)}>
      {likes} likes
    </button>
  )
}
```

Calling `setLikes` doesn't change `likes` right away. It asks React to render the component again, and in that next render `likes` has the new value. Within one render the value is a snapshot:

```tsx
function handleClick() {
  setLikes(likes + 1)
  console.log(likes) // still the old value
}
```

When the new value depends on the old one, pass an updater function: `setLikes((current) => current + 1)`. It also works correctly when several updates happen one after another.

### Update objects and arrays immutably

State follows the same rule as 0.2: create a new value, don't change the old one. Your cart functions fit exactly:

```tsx
setItems((current) => addItem(current, product, quantity))
```

If you wrote `items.push(...)` and then `setItems(items)`, React would see the same array reference and might skip the render.

### Events

You pass a function to an event prop. You don't call it:

```tsx
<button onClick={handleSave}>Save</button>        // correct
<button onClick={handleSave()}>Save</button>      // calls handleSave during render
<button onClick={() => remove(item.id)}>x</button> // wrap it when you need arguments
```

The handler receives an event object. `event.preventDefault()` stops the browser's default action, for example following a link.

By convention, a component's callback props are named `onSomething` (`onAddToCart`), and the functions that handle them are named `handleSomething` (`handleAddToCart`).

### Lifting state up

When two components need the same state, move it to their closest common parent. The parent passes the value down as a prop and passes a callback down so the child can ask for a change. The header needs the number of items in the cart, and the product card needs to add to it, so the cart state lives in `App`, above both.

A component whose value comes entirely from props is called controlled. In this lesson `QuantityStepper` becomes controlled. It shows `value` and calls `onChange`, but it has no state of its own. The parent decides.

### Don't store what you can calculate

Cart totals come from the items. Calculate them on every render with `cartTotals(items)`. If you kept them in a second state variable, the two would sooner or later disagree.

### Rules of hooks

Functions that start with `use` are hooks. Call them at the top level of a component, never inside an `if`, a loop or a nested function. React identifies each piece of state by the order of the calls. The `react-hooks` ESLint plugin from the template checks this rule.

### StrictMode

`main.tsx` wraps the app in `<StrictMode>`. In development, React then renders every component twice to expose impure code. If a `console.log` in a component prints twice, StrictMode is the reason. It doesn't happen in a production build.

Docs: [State: a component's memory](https://react.dev/learn/state-a-components-memory), [Responding to events](https://react.dev/learn/responding-to-events), [State as a snapshot](https://react.dev/learn/state-as-a-snapshot), [Updating arrays in state](https://react.dev/learn/updating-arrays-in-state), [Sharing state between components](https://react.dev/learn/sharing-state-between-components).

## Task

### 1. A page switch in state

There is no router yet, so `App` keeps the current page in state. Use a discriminated union like the ones from 0.3:

```ts
type Page = { name: 'home' } | { name: 'product'; productId: number }
```

1. `App` holds `const [page, setPage] = useState<Page>({ name: 'home' })` and renders `HomePage` or `ProductPage` inside `SiteLayout`.
2. `ProductCard` gets an `onOpen(productId)` callback. Its link keeps the `href`, so it still looks and behaves like a link (middle-click, hover), but `onClick` calls `event.preventDefault()` and then `onOpen`. Pass the callback down through `HomePage` and `ProductGrid`.
3. On the product page, the "Home" breadcrumb link takes you back the same way.

The URL never changes and the browser's back button doesn't work. Module 2 replaces this switch with a router.

### 2. A controlled quantity stepper

1. `QuantityStepper` takes `value`, `onChange(next: number)`, an optional `min` (default 1) and an optional `max`.
2. The minus button is disabled at `min`, and the plus button is disabled at `max`.
3. `ProductDetails` holds the selected quantity in state and passes it to the stepper, with the product's `stock` as `max`.

### 3. The cart in App

1. `App` holds `const [items, setItems] = useState<CartItem[]>([])`. Write handlers for adding and removing that call your 0.2 functions through the updater form.
2. Pass `onAddToCart(product, quantity)` down to `ProductCard`, which adds 1, and to `ProductDetails`, which adds the selected quantity. Adding a product that's already in the cart increases its quantity.

Look at how many components now pass `onAddToCart` along without using it. Module 5 solves this with Context.

### 4. Header and drawer

1. `SiteLayout` and `Header` take `cartCount` and `onCartClick`. The badge shows the count and disappears when the cart is empty. The button's label says "Open cart, 1 item" or "Open cart, 3 items", with the right singular or plural.
2. `App` holds `isCartOpen` and renders the drawer only when it's true: `{isCartOpen && <CartDrawer ... />}`.
3. `CartDrawer` takes `items`, `onClose` and `onRemove(productId)`. The close button and a click on the dark overlay both call `onClose`. The title shows the item count. When the cart is empty, render `CartEmpty` instead of the list.
4. `CartLineItem` takes `item` and `onRemove`. It shows `lineTotal` and the final unit price from 0.2.
5. `CartSummary` takes `totals: CartTotals` and shows all four values.

### 5. Keep the gallery compiling

Pages and components now need props. `pnpm typecheck` lists every place in `src/dev/gallery.tsx` that's missing one. Pass sample data and empty functions (`() => {}`) there.

## Acceptance criteria

- [ ] Clicking a product card opens its page, and the "Home" breadcrumb goes back.
- [ ] The stepper stays between 1 and the product's stock, and its buttons are disabled at the limits.
- [ ] Adding to the cart works from the card (quantity 1) and from the product page (selected quantity). The same product twice gives one line with a higher quantity.
- [ ] The header badge and the button label show the item count, and the badge is hidden when the count is 0.
- [ ] The drawer opens and closes, lists the items with line totals, shows the totals from `cartTotals`, removes items, and shows the empty state.
- [ ] Cart state exists only in `App`. `QuantityStepper` has no state of its own, and totals are calculated, not stored.
- [ ] `pnpm typecheck` and `pnpm test:run` pass.

## Check

```bash
pnpm typecheck
pnpm test:run
pnpm dev
```

Click through the whole flow in the browser: card, product page, quantity, add, drawer, remove.

## Commit

```bash
git commit -m "feat(cart): add cart state, quantity stepper and cart drawer"
```

## Extra

- Let the stepper inside the cart drawer change the quantity of a line with `updateQuantity`.
- `ProductGallery`: clicking a thumbnail shows that image large. The state belongs inside `ProductGallery`, because no other component needs it.
- Close the drawer with the Escape key. You need `useEffect` to listen to `keydown` on `document`. Lesson 3.1 explains effects, so treat this as a preview.
