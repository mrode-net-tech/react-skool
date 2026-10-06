# React for PHP developers

This course has 44 lessons of about an hour each. You build one online shop, from an empty folder to a deployed Next.js app, and you test it at every level.

## What you build

You build Kramik, a small shop on top of the [DummyJSON](https://dummyjson.com/docs) API. It has:
- a catalog with categories, search, sorting and pagination
- product pages with reviews
- a cart and a three-step checkout
- login, an account page with order history
- an admin panel for products

In modules 0 to 8 the shop is a single-page app (SPA) built with Vite and React Router. In module 9 you move the same code to Next.js. Module 9 is mostly about what changes in that move and what stays the same.

DummyJSON accepts POST, PUT and DELETE requests and returns a realistic response, but it does not save anything. The course is designed around this. The cart lives in the browser, and after a change the app updates its cache from the server's response instead of loading the data again.

## How the course works

Each lesson takes about 60 minutes and ends with working code and a commit. If a lesson takes longer, finish it the next day. The schedule has about ten spare sessions for this.

Some topics are taught as a refactor. You first write the simple version, run into its limits, and then switch to the tool that solves them:
- loading data: `fetch` in `useEffect`, then a custom hook, then TanStack Query
- shared state: props passed down several levels, then Context, then Zustand
- forms: validation written by hand, then React Hook Form with Zod
- filters: component state, then the URL
- rendering: a client-only SPA, then Next.js with server components

You write all the code yourself. Claude works as your tutor, following the rules in `../CLAUDE.md`. It gives hints when you ask, reviews each lesson, and writes the next module when you finish the current one, based on your actual code.

## Lesson format

Every lesson has the same sections, in this order:

| Section | Contents |
|---|---|
| Goal | What works when you finish |
| Before you start | What state your code should be in |
| Concepts | Short explanations with links to the official docs, and a PHP comparison where it helps |
| Task | What to build, step by step |
| Acceptance criteria | A checklist that reviews use |
| Check | Commands to run |
| Commit | A suggested commit message |
| Extra | Optional work for when you have time left |

Code examples in the lessons are small and often come from a different domain than the shop, so the lesson never hands you the answer.

## Working with Claude

Polish or English both work. Useful phrases:
- "hint" or "podpowiedź" when you are stuck. Ask again if the first hint is not enough, and you get a more specific one.
- "review 1.3" when you finish a lesson.
- "show me the solution for the cart reducer" when you want to see the code for one part.
- "write module 3" when you finish module 2.

## Repo layout

```
react-skool/
  CLAUDE.md   tutor rules for Claude
  course/     lessons, this syllabus, progress.md (review log)
  skeleton/   static components, copied into shop/ in lesson 1.1
  shop/       your app, created in lesson 0.1
```

## Syllabus

Modules 0 and 1 are already written. The other modules get written when you reach them.

### Module 0: JavaScript and TypeScript for PHP developers

| | Lesson | What you do |
|---|---|---|
| 0.1 | [Project setup and your first test](m00-js-ts/01-project-setup.md) | Vite project, tsconfig, Vitest, `formatPrice`, GitHub repo |
| 0.2 | [Values, references and immutability](m00-js-ts/02-values-and-references.md) | Pure cart functions with tests |
| 0.3 | [Types that model the domain](m00-js-ts/03-domain-types.md) | Product types from real API data, unions, generics, exhaustive checks |
| 0.4 | [Async code and an API client](m00-js-ts/04-async-and-api-client.md) | Event loop, promises, `fetch`, errors, tests with a fake `fetch` |

### Module 1: React basics on the skeleton

| | Lesson | What you do |
|---|---|---|
| 1.1 | [The skeleton, JSX and Tailwind](m01-react-basics/01-skeleton-jsx-tailwind.md) | Tailwind, icons, the `@/` alias, copy the skeleton, first JSX changes |
| 1.2 | [Props, lists and composition](m01-react-basics/02-props-and-lists.md) | Product card, grid, filters and reviews rendered from fixture data |
| 1.3 | [State and events](m01-react-basics/03-state-and-events.md) | Quantity stepper, cart drawer, add to cart, a page switch kept in state |
| 1.4 | [Prettier and ESLint](m01-react-basics/04-prettier-and-eslint.md) | Formatting, type-aware lint rules, accessibility rules, PhpStorm setup |
| 1.5 | [Component tests](m01-react-basics/05-component-tests.md) | Testing Library and user-event tests for the stepper, card and cart |

### Module 2: Routing

| | Lesson | What you do |
|---|---|---|
| 2.1 | React Router | Routes, a shared layout and a 404 page. They replace the page switch from 1.3. |
| 2.2 | Dynamic routes | Product and category pages driven by URL params |

### Module 3: Server data

| | Lesson | What you do |
|---|---|---|
| 3.1 | Fetch in an effect | Loading and error state, race conditions, StrictMode |
| 3.2 | A custom hook | `useFetch<T>` and what it still lacks |
| 3.3 | TanStack Query | Query keys, cache, `staleTime`, devtools |
| 3.4 | Zod at the API boundary | Schemas replace the hand-written types from 0.3 |
| 3.5 | Pagination and categories | Params in query keys, prefetching, skeleton loaders |
| 3.6 | Search | Debounced input, empty and error states |

### Module 4: Testing with a mocked API

| | Lesson | What you do |
|---|---|---|
| 4.1 | MSW | Handlers built from fixtures. Test a page through its loading, data and error states. |
| 4.2 | Test setup that scales | `renderWithProviders`, a fresh QueryClient per test, handlers that keep state |

### Module 5: Client state

| | Lesson | What you do |
|---|---|---|
| 5.1 | From props to Context | Context with `useReducer` built on your functions from 0.2 replaces props passed through four levels |
| 5.2 | Zustand | A store with selectors, saved to localStorage |

### Module 6: State in the URL

| | Lesson | What you do |
|---|---|---|
| 6.1 | Filters in the query string | `useSearchParams`, links that keep the current filters |
| 6.2 | A typed filters hook | `useProductFilters` with Zod parsing, defaults and tests |

### Module 7: Forms

| | Lesson | What you do |
|---|---|---|
| 7.1 | Validation by hand | Shipping form with controlled inputs |
| 7.2 | React Hook Form and Zod | Schema-based validation, accessible error messages |
| 7.3 | Multi-step checkout | Step state as a union type, placing the order with `useMutation` |

### Module 8: End-to-end tests and CI/CD

| | Lesson | What you do |
|---|---|---|
| 8.1 | Playwright | Setup on WSL2, first test from catalog to cart |
| 8.2 | Checkout flow | API errors with `page.route`, the trace viewer |
| 8.3 | CI and deploy | GitHub Actions, husky and lint-staged, Vercel with preview deploys |

### Module 9: Moving to Next.js

| | Lesson | What you do |
|---|---|---|
| 9.1 | A new Next.js app | Move components and tests. Server components compared with PHP templates. |
| 9.2 | App Router | Layouts, `loading`, `error` and `not-found` files. React Router goes away. |
| 9.3 | Data in server components | Async components, `generateMetadata`, `next/image` |
| 9.4 | The client boundary | `"use client"`, `searchParams`, hydration errors |
| 9.5 | TanStack Query in Next.js | Prefetching on the server, `HydrationBoundary` |
| 9.6 | Rendering and caching | Static and dynamic pages, `generateStaticParams`, `"use cache"` |
| 9.7 | Login | A Server Action, an HttpOnly cookie, `useActionState` |
| 9.8 | Protected pages | `proxy.ts`, `/auth/me`, token refresh, account page and order history |
| 9.9 | Tests, CI and deploy | Vitest and Playwright against the Next.js build |

### Module 10: Admin panel

| | Lesson | What you do |
|---|---|---|
| 10.1 | Admin area | Role check, products table with sorting and search done by the API |
| 10.2 | Edit and create | The form from module 7 reused, `useMutation`, cache updated from the response |
| 10.3 | Delete with an optimistic update | Rollback on error, pending states |

### Module 11: Finishing touches

| | Lesson | What you do |
|---|---|---|
| 11.1 | shadcn/ui | Replace your drawer, menu and messages with components built on Radix |
| 11.2 | Dark mode | Theme toggle with no flash on page load (a cookie in Next.js) |
| 11.3 | Accessibility audit | Keyboard paths, focus, axe checks in Playwright |

### Extra, after the course

These are not part of the main course:
- a wishlist in Zustand that stays in sync between browser tabs
- infinite scroll on the search results with `useInfiniteQuery`
- filters refactored to [nuqs](https://nuqs.dev)
- the React Compiler

## Schedule

The course started on 2026-10-06. At 6 to 7 lessons a week, the main path takes about 7 weeks, which leaves a week of spare sessions. The target finish is the beginning of December 2026.
