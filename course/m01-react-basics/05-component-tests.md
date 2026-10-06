# 1.5 Component tests

## Goal

Tests check the quantity stepper, the product card and the cart drawer the way a user would use them. One more test covers the whole flow in `App`: add a product, see the count in the header, open the cart.

## Before you start

Lesson 1.4 is done and `pnpm check` passes.

## Concepts

### Test what the user sees

Testing Library renders a component into a DOM and lets you find elements the way a person would: by role, by label, by text. You don't check state variables or which function the component called inside. You click a button and look at the result. Tests written this way survive refactoring. In module 5 you rewrite the cart with Context and then Zustand, and these tests stay the same.

In PHP terms, these tests sit between a unit test and a browser test such as Laravel Dusk. They render real components, but in Node, with a simulated DOM called jsdom.

### Queries

Prefer queries in this order:

1. `getByRole('button', { name: 'Add to cart' })`. The role comes from semantic HTML, and the name from the text, `aria-label` or the associated label. This is the same information a screen reader uses, which is why the accessibility work in the skeleton pays off here.
2. `getByLabelText('Email')` for form fields.
3. `getByText('Your cart is empty')` for plain text.
4. `getByTestId` only as a last resort.

Each query comes in three variants:

- `getBy...` throws when nothing matches. Use it for elements that must be there.
- `queryBy...` returns `null` when nothing matches. Use it to assert that something is absent.
- `findBy...` waits until the element appears. You need it in module 3, once data loads asynchronously.

`within(element)` limits the queries to one part of the page, for example the cart dialog.

### Interactions

`@testing-library/user-event` simulates real input: a click includes pointer and focus events, and typing sends one key at a time. Create a user once per test and `await` every action:

```tsx
const user = userEvent.setup()
await user.click(screen.getByRole('button', { name: 'Save' }))
```

The type-aware lint rules from 1.4 report a missing `await`.

### Matchers and mock functions

`@testing-library/jest-dom` adds DOM matchers to `expect`: `toBeInTheDocument`, `toBeDisabled`, `toHaveTextContent`, `toHaveAccessibleName`.

For callback props, pass a mock function and check how it was called:

```tsx
const onChange = vi.fn()
render(<Toggle checked={false} onChange={onChange} />)
await user.click(screen.getByRole('switch'))
expect(onChange).toHaveBeenCalledWith(true)
```

A controlled component like your `QuantityStepper` doesn't change the displayed value by itself. In its own tests, check the callback. The full `App` test checks the visible result.

Docs: [Testing Library: guiding principles](https://testing-library.com/docs/guiding-principles), [Which query should I use?](https://testing-library.com/docs/queries/about#priority), [user-event](https://testing-library.com/docs/user-event/intro), [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers), [Vitest: test environment](https://vitest.dev/guide/environment).

## Task

### 1. Install and configure

```bash
pnpm add -D @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom jsdom
```

Add a `test` section to `vite.config.ts`. The comment on the first line gives TypeScript the types for that section, and without it `pnpm typecheck` fails:

```ts
/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    restoreMocks: true,
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

Testing Library only removes rendered components after each test automatically when Vitest runs with `globals: true`. This project imports `describe` and `it` explicitly instead, so the setup file does the cleanup. Without it, the second test in a file would find the buttons of the first one as well.

`restoreMocks: true` restores every `vi.spyOn` after each test. Remove the `afterEach(() => vi.restoreAllMocks())` from your API client tests, and check that they still pass.

### 2. QuantityStepper

In `src/features/product/quantity-stepper.test.tsx`, test that:

- it shows the current value
- clicking the plus button calls `onChange` with value + 1, and the minus button with value − 1
- the minus button is disabled at `min` and the plus button at `max`

### 3. ProductCard

Use a product from your typed fixtures. For special cases, spread it and override one field, for example `{ ...product, stock: 0 }`. Test that:

- the title, the final price and the original price are visible
- the discount badge is shown for product 1 and hidden for product 6
- clicking the add button calls `onAddToCart` with the product
- the add button is disabled when the stock is 0

### 4. CartDrawer

Test that:

- an empty cart shows the empty state
- the items and the totals are shown
- the remove button calls `onRemove` with the right product id
- the close button calls `onClose`

### 5. The whole flow in App

In `src/app.test.tsx`, render `<App />` and act like a user: add "Essence Mascara Lash Princess" to the cart from the home page. Check that the cart button's name is now "Open cart, 1 item". Click it, find the dialog by role, and use `within` to check that the product is listed. Add the product a second time and check the quantity or the count.

## Acceptance criteria

- [ ] Four new test files, and all tests pass.
- [ ] Queries use roles, labels or text. There are no test ids and no CSS selectors.
- [ ] Every `user-event` call is awaited, and `pnpm lint` passes.
- [ ] The API client tests no longer restore their mocks by hand.
- [ ] `pnpm check` passes.

## Check

```bash
pnpm check
```

Break something on purpose, for example remove `disabled` from the stepper's plus button, and check that a test fails with a readable message. Then undo the change.

## Commit

```bash
git commit -m "test: add component tests for stepper, product card, cart drawer and app"
```

## Extra

- Measure coverage: `pnpm add -D @vitest/coverage-v8`, then `pnpm vitest run --coverage`. Don't chase a number. Look for logic that no test reaches.
- Write a test for `FiltersSidebar` that checks which link has `aria-current="page"`.
- Run a single test file in PhpStorm with the gutter icon and set a breakpoint inside a component.
