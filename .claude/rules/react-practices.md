---
paths:
  - "shop/**/*.{ts,tsx}"
---

# React and TypeScript practices

These are the reference practices for reviewing the learner's code and for giving hints. Each item applies from the module that teaches it, so judge a lesson by what the course has covered at that point.

## Components and state

- Render is pure: props are read-only and render has no side effects.
- State is minimal. Anything you can calculate from props or state is derived during render, not stored.
- Updates are immutable and use the updater form when the next value depends on the previous one.
- State lives in the closest common parent of the components that use it, and stays as low in the tree as possible.
- Lists use stable keys from the data. The index is a key only for static lists that never reorder.
- Callback props are named `onX` and handlers `handleX`. Event props receive a function, not the result of calling one.
- Prefer composition with `children` over long lists of boolean props.

## Effects

- An effect synchronises with something outside React: a DOM API, a subscription, a timer, a socket. Data transformations happen during render, and responses to user actions happen in event handlers.
- Every effect that subscribes returns a cleanup function, and its dependency array is complete (react-hooks lint).
- Server data comes from TanStack Query from module 3 on. Doing it with `useState` and `useEffect` is a lesson 3.1 exercise only.

## Hooks

- Custom hooks start with `use`, return data and functions rather than JSX, and follow the rules of hooks.
- Add `useMemo`, `useCallback` and `memo` only after measuring a real problem.

## Data and state libraries

- TanStack Query:
  - Query keys are arrays that contain every parameter of the request, built by one key factory per feature.
  - Query data is read from the query, not copied into local state.
  - Mutations update the cache with `setQueryData` from the response, or invalidate the affected keys.
- Zustand: components select the slice they need (`useCartStore((s) => s.items)`).
- Forms: one Zod schema is the source of both the validation and the TypeScript type. Error messages are linked with `aria-describedby`.

## TypeScript

- Props have an explicit type. Narrowing replaces `as` casts. External data enters as `unknown` and is parsed with Zod at the API boundary.
- Multi-state values (loading/error/success, checkout steps) are discriminated unions with exhaustive switches.

## Accessibility

- Buttons do actions and links navigate. Every input has a label, images have `alt` (empty when decorative), and focus goes somewhere sensible after dialogs open and close.

## Tests

- Tests check behaviour through roles, labels and text. Each test covers one behaviour.
- MSW mocks the network from module 4 on, and each test gets a fresh QueryClient.

## Next.js (module 9 on)

- Components are server components by default. `"use client"` goes on the smallest component that needs state, effects or browser APIs.
- Data loads in server components. Secrets and tokens stay on the server, in HttpOnly cookies.
