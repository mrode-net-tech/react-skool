# Skeleton

This folder holds the markup for every page of the shop, so you don't have to write HTML during the course. The components are written in React, TypeScript and Tailwind CSS v4. You copy `src/` into your project in lesson 1.1.

## Components are static until a lesson wires them

Most components show hardcoded content from real DummyJSON data: one product (Essence Mascara Lash Princess), one user (Emily Johnson) and her cart. They have no props, no state and no data fetching. A short comment at the top of each file names the lesson that turns it into a real component.

A few components already take props, because you will read them as examples of how a reusable component looks:

- the primitives in `src/components/ui/` (Button, Input, Field, Price and the rest)
- the layouts `SiteLayout` and `AdminLayout`, which render `children`
- `EmptyState`, `ErrorState` and `CheckoutSteps`

## Folder map

```
src/
  components/ui/      generic building blocks: button, input, select, field, badge, price, rating stars
  components/layout/  site layout, header, footer
  components/         empty and error states
  features/catalog/   product card and grid, filters, pagination, search box
  features/product/   product page parts: gallery, details, quantity stepper, reviews
  features/cart/      cart drawer, line item, summary
  features/checkout/  checkout steps, shipping and payment forms, order review, success message
  features/auth/      login form
  features/account/   profile card, order history
  features/admin/     admin layout, products table, product form
  pages/              one component per page, without the layout
  fixtures/           JSON responses saved from DummyJSON, used for types and test mocks later
  dev/gallery.tsx     a preview of all pages (see below)
  lib/utils.ts        the cn() helper for joining Tailwind classes
  index.css           Tailwind import and the color tokens
  app.tsx, main.tsx   entry point
```

## What your project needs

Packages:

```
pnpm add tailwindcss @tailwindcss/vite lucide-react clsx tailwind-merge
```

The skeleton imports files with the `@/` alias, which points to `src/`. Lesson 1.1 shows how to set it up in `vite.config.ts` and `tsconfig.app.json`.

`src/components/ui/price.tsx` imports `formatPrice` from `src/lib/format.ts`. You write that function in lesson 0.1, so the skeleton does not include it. The build fails until the file exists.

## Colors

Components use color tokens such as `bg-primary`, `text-muted-foreground` or `border-border`, never Tailwind palette colors like `text-gray-500`. The tokens are defined in `src/index.css`. To change the look of the shop, change the token values there. The `.dark` block in the same file is for the dark mode lesson.

## Gallery

Run the dev server and open `http://localhost:5173/?gallery`. A panel in the bottom right corner lists every page and a few states (loading, error, empty search, open cart). The gallery reads the page name from the query string and its links reload the whole page, so it works without a router. Delete `src/dev/` once all pages have real routes.

## Test accounts

DummyJSON accepts these logins (`POST https://dummyjson.com/auth/login`):

- `emilys` / `emilyspass`: Emily Johnson, role `admin`. The fixtures use this user. She has one cart in DummyJSON, which the account page shows as her order history.
- `averyp` / `averyppass`: a user with role `user`, for checking that the admin panel rejects regular users.
