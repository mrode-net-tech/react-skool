# 0.4 Async code and an API client

## Goal

`src/lib/api-client.ts` loads products, a single product and categories from DummyJSON. It throws a typed error when a response fails. Its tests never touch the network. A small script prints real data from the API.

## Before you start

Lesson 0.3 is done. `Product`, `ProductList` and `Category` exist in `src/features/catalog/types.ts`.

## Concepts

### One request versus a program that keeps running

A PHP script handles one request. It starts, does blocking I/O (every `curl_exec` or PDO query waits for the answer), sends the response and exits. Nothing stays in memory afterwards.

JavaScript in the browser works differently. The page loads once, and the program keeps running while the user clicks around. It runs on a single thread. Instead of waiting for I/O, it starts the operation and moves on. When the result arrives, a callback goes into a queue and runs as soon as the thread is free. This mechanism is the event loop. Two consequences follow from it:

- Slow synchronous code, such as a huge loop, blocks everything, including clicks and rendering.
- State stays in memory between user actions. You have to think about when data becomes stale, which is a problem PHP never had.

### Promises and async/await

A `Promise<T>` is a value of type `T` that becomes available later, or an error. If you have used Guzzle's async requests or ReactPHP, it is the same idea. An `async` function always returns a promise. `await` pauses that function until the promise settles, without blocking the thread:

```ts
async function loadUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return (await response.json()) as User
}
```

Errors in async code are rejected promises, and `try/catch` around an `await` catches them. If you neither `await` a promise nor attach `.catch()`, its error gets lost. The lint rules in lesson 1.4 report these "floating" promises.

To run independent requests in parallel, use `Promise.all`:

```ts
const [user, orders] = await Promise.all([loadUser(1), loadOrders(1)])
```

### Predict the order

Before you read the explanation, create `scripts/event-loop.ts` with this code and write down the order you expect:

```ts
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
```

Run it with `node scripts/event-loop.ts`. Node 24 runs TypeScript files directly. It deletes the types and runs the rest, but it doesn't check the types.

The output is 1, 4, 3, 2. Synchronous code always finishes first. Promise callbacks (microtasks) run as soon as the current code is done. Timer callbacks (tasks) wait for the next turn of the loop, even with a delay of 0.

### fetch does not throw on HTTP errors

`fetch` rejects only when the request can't be made at all, for example when the network is down. A 404 or 500 response resolves normally, and you check `response.ok` (true for status 200–299) yourself. Guzzle throws on 4xx and 5xx by default, so this one surprises PHP developers.

### Building query strings

Build query strings with `URLSearchParams`, the equivalent of `http_build_query`:

```ts
const params = new URLSearchParams({ page: '2', q: 'lamp' })
params.toString() // 'page=2&q=lamp'
```

Values must be strings. `params.set(key, value)` adds a single value.

### Modules

Every file is a module. Nothing is global. You import what you use, by path, and there is no autoloader. This course uses named exports (`export function getProducts`). They are easier to rename and to search for than default exports.

### Classes and custom errors

JS classes look like PHP classes, and you can extend `Error`:

```ts
export class ValidationError extends Error {
  readonly field: string

  constructor(field: string, message: string) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}
```

TypeScript has a shorter syntax, `constructor(readonly field: string)`, similar to PHP 8 promoted properties. Your tsconfig doesn't allow it (`erasableSyntaxOnly`), so declare the fields as above.

Docs: [Using promises (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [async function (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [Using the Fetch API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [The event loop (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop), [DummyJSON products docs](https://dummyjson.com/docs/products), [Vitest mocking](https://vitest.dev/guide/mocking).

## Task

### 1. The client

Create `src/lib/api-client.ts` with:

- `API_URL = 'https://dummyjson.com'`
- `ApiError`, a class that extends `Error` and has `status: number` and `url: string`
- `getJson<T>(path: string): Promise<T>`. It fetches `API_URL + path`, throws `ApiError` when the response is not ok, and otherwise returns the parsed JSON. The `T` here is only a promise you make to the compiler. Nothing checks the data. In module 3, Zod replaces it with a real check.
- `getProducts(params)`, where `params` has optional `limit`, `skip`, `sortBy` (`'title' | 'price' | 'rating'`) and `order` (`'asc' | 'desc'`). It returns `Promise<ProductList>` and puts only the parameters you actually passed into the query string.
- `getProduct(id: number): Promise<Product>`
- `getCategories(): Promise<Category[]>`

Import the types with `import type`. In step 3, Node runs this file directly. Node removes type imports, but any other import without a `.ts` extension would fail there. So keep `api-client.ts` free of runtime imports.

### 2. Tests with a fake fetch

In `src/lib/api-client.test.ts`, replace `fetch` with a spy that returns a prepared response. The tests are then fast and don't depend on the network:

```ts
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

it('example of a fake response', async () => {
  const fetchSpy = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response(JSON.stringify({ hello: 'world' }), { status: 200 }))

  const response = await fetch('https://example.com/hello')

  expect(fetchSpy).toHaveBeenCalledWith('https://example.com/hello')
  expect(await response.json()).toEqual({ hello: 'world' })
})
```

You need the `afterEach` block. Vitest 5 clears the call history of mocks between tests, but it doesn't remove the spy. Without `restoreAllMocks`, the fake `fetch` would stay in place for the next test file.

Write tests for:

- the URL with all parameters, and the URL without any
- the parsed result being returned
- a 404 response leading to an `ApiError` with status 404

For the error case, use `await expect(promise).rejects.toThrow(ApiError)` or `.rejects.toMatchObject({ status: 404 })`. Always `await` an `expect(...).rejects`. Vitest 5 fails the test if you forget.

In module 4, MSW replaces this spy. MSW intercepts requests at the network level, so your code calls the real `fetch`.

### 3. Try the real API

Create `scripts/try-api.ts`. Import `getProducts` from `'../src/lib/api-client.ts'`, with the extension, because Node needs it. Ask for three products sorted by price, from highest to lowest, and print their titles and prices. Top-level `await` works in modules, so you don't need a wrapper function.

Run it:

```bash
node scripts/try-api.ts
```

The `scripts/` folder isn't covered by any tsconfig, so `pnpm typecheck` doesn't check it. That's fine for small helper scripts. Lesson 1.4 makes ESLint aware of the folder.

## Acceptance criteria

- [ ] `ApiError` has `status` and `url`, and every response that is not ok throws it.
- [ ] The query string contains only the parameters that were passed.
- [ ] The tests make no network requests. They pass with your network turned off.
- [ ] Every `expect(...).rejects` is awaited.
- [ ] `api-client.ts` has no runtime imports, only `import type`.
- [ ] `node scripts/try-api.ts` prints three products.
- [ ] `pnpm test:run` and `pnpm typecheck` pass.

## Check

```bash
pnpm test:run
pnpm typecheck
node scripts/try-api.ts
```

## Commit

```bash
git add -A
git commit -m "feat(api): add DummyJSON client with tests"
```

## Extra

- Add `searchProducts(q: string)` for `GET /products/search?q=...`.
- Let `getProducts` accept an optional `AbortSignal` and pass it to `fetch`. Write a test that aborts the request. Module 3 uses this to cancel requests that are no longer needed.
- Load the product list and the categories in parallel in `try-api.ts` with `Promise.all`.
