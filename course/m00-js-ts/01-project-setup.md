# 0.1 Project setup and your first test

## Goal

`shop/` contains a Vite + React + TypeScript app that runs in the browser. Vitest runs your first test, for `formatPrice`, and the code is on GitHub.

## Before you start

Check that you have Node 24 and pnpm 11 (`node -v`, `pnpm -v`). The repo `react-skool` is already on GitHub, with `course/`, `skeleton/` and `CLAUDE.md` in it. Work in your local clone of it.

## Concepts

### The tools, compared with PHP

| JS | PHP |
|---|---|
| `package.json` | `composer.json` |
| `dependencies` and `devDependencies` | `require` and `require-dev` |
| `pnpm-lock.yaml` | `composer.lock` |
| `node_modules/` | `vendor/` |
| `pnpm add zod`, `pnpm add -D vitest` | `composer require`, `composer require --dev` |
| `"scripts"` in package.json, run with `pnpm <name>` | `"scripts"` in composer.json |
| `tsc` (TypeScript compiler) | PHPStan: checks types, never runs your code |
| Vitest | PHPUnit or Pest |
| ESLint and Prettier (lesson 1.4) | PHPStan rules, PHP-CS-Fixer |

### What Vite does

There is no long-running server like PHP-FPM behind a React app. During development, `pnpm dev` starts the Vite dev server. It serves `index.html` and, when the browser asks for a `.tsx` file, converts it to plain JavaScript. When you save a file, the page updates without a full reload. `pnpm build` writes static HTML, JS and CSS files to `dist/`, and any web server can host them.

`index.html` is the entry point, much like `public/index.php` in a framework. It loads `src/main.tsx`, which mounts the React app into `<div id="root">`.

### Type checking is a separate step

Vite removes the types from your code without checking them, so a type error does not stop `pnpm dev`. `tsc` does the checking. In this project it produces no files (`noEmit`). Run it yourself with `pnpm typecheck`. PhpStorm also shows the errors as you type, and later the CI pipeline runs it on every push. It's the same role PHPStan plays in a PHP project.

### The tsconfig files

The template has three. `tsconfig.json` only points to the other two. `tsconfig.app.json` covers your code in `src/`, which runs in the browser. `tsconfig.node.json` covers `vite.config.ts`, which runs in Node.

Some options in `tsconfig.app.json` affect the code you write from the next lesson on:

- `verbatimModuleSyntax`: you import types with `import type { X } from '...'`.
- `erasableSyntaxOnly`: TypeScript features that generate JavaScript are not allowed. The two you would miss coming from PHP are `enum` and constructor parameter properties (PHP 8 promoted properties). With this option, tools such as Node can run your TypeScript just by deleting the types.
- `noUnusedLocals` and `noUnusedParameters`: unused variables and parameters are errors.

Strict mode is on by default in TypeScript 6, even though the template doesn't list it.

### Tests with Vitest

Vitest is the test runner made for Vite projects. Tests live in `*.test.ts` files next to the code they test. The API maps well to PHPUnit: `describe` groups tests, `it` (or `test`) is one test case, and `expect(actual).toBe(expected)` is an assertion.

Docs: [Vite guide](https://vite.dev/guide/), [Vitest guide](https://vitest.dev/guide/), [TSConfig reference](https://www.typescriptlang.org/tsconfig/), [Intl.NumberFormat (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

## Task

### 1. Create the app

In the repo root, run:

```bash
pnpm create vite@latest shop --template react-ts --eslint --no-immediate --no-interactive
cd shop
pnpm install
pnpm dev
```

Open the URL that Vite prints (usually http://localhost:5173).

You need the `--eslint` flag. Without it, create-vite now sets up Oxlint, a newer and faster linter. This course uses ESLint, because that is what most existing projects use.

pnpm 11 may print a warning about `minimumReleaseAge`. pnpm waits about a day before it installs a newly published version, which protects you from a compromised release. You can ignore the warning.

Open these files and get a rough picture of them: `index.html`, `src/main.tsx`, `src/App.tsx`, the `scripts` in `package.json`, `vite.config.ts` and `tsconfig.app.json`. Change some text in `App.tsx`, save, and watch the browser update. Lesson 1.1 replaces `App.tsx` with the skeleton, so don't spend time on it.

### 2. Make TypeScript stricter

In `tsconfig.app.json`, add two options to `compilerOptions`:

```json
"strict": true,
"noUncheckedIndexedAccess": true
```

`strict` is already the default, but writing it down makes it visible. `noUncheckedIndexedAccess` changes the type of `items[0]` from `Item` to `Item | undefined`. That matches the runtime: PHP would give you a warning and `null`, and JS gives you `undefined`. With the option on, the compiler makes you handle that case.

Add a script to `package.json`:

```json
"typecheck": "tsc -b"
```

Run `pnpm typecheck`. It should finish without output.

### 3. Add Vitest

```bash
pnpm add -D vitest
```

Add two scripts:

```json
"test": "vitest",
"test:run": "vitest run"
```

`pnpm test` starts watch mode and runs the tests again whenever a file changes. Keep it open in a second terminal while you work. `pnpm test:run` runs all tests once, the way CI will.

### 4. First the test, then the code

Create `src/lib/format.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {
  it('formats a price in US dollars', () => {
    expect(formatPrice(9.99)).toBe('$9.99')
  })

  it('adds a thousands separator and two decimals', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })
})
```

Run `pnpm test`. The test fails, because `format.ts` doesn't exist yet.

Create `src/lib/format.ts` with `export function formatPrice(amount: number): string`. Use `Intl.NumberFormat` with the `en-US` locale and the `USD` currency, since DummyJSON prices are in dollars. Create the formatter once, outside the function, and reuse it for every call.

Keep this name and this path. The skeleton's `Price` component imports `formatPrice` from `@/lib/format` in lesson 1.1.

Then add two more tests yourself: one for `0` and one for a negative amount. Decide what output you expect before you run them.

### 5. Commit and push

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). A message has the form `type(scope): description`. The types you will use most are `feat` (new behaviour), `fix`, `test`, `refactor`, `chore` (setup, tooling, dependencies) and `docs`. The scope is optional, and in this course it is usually the feature: `cart`, `catalog`, `checkout`.

Make two commits, one for the scaffold and one for your code:

```bash
cd ..
git status
git add shop
git commit -m "chore(shop): scaffold Vite React TypeScript app"
```

Look at `git status` before you add files. `shop/node_modules` must not appear in it, because the template's `.gitignore` excludes it. To make two separate commits, add only the scaffold files first and leave `src/lib/` and your changes to `package.json` and `tsconfig.app.json` for the second commit, `feat(format): add formatPrice with tests`. If this is too fiddly, one commit is fine. Then run `git push`.

### 6. PhpStorm

Open the `react-skool` folder in PhpStorm. Go to Settings, then Languages & Frameworks, then Node.js. Choose the Node interpreter from WSL. If PhpStorm runs on Windows, pick "Add WSL..." in the interpreter list. Set the package manager to pnpm.

Right-click `format.test.ts` and run it. PhpStorm detects Vitest and shows the results in its test runner. You set up ESLint and Prettier in lesson 1.4.

## Acceptance criteria

- [ ] `pnpm dev` shows the app in the browser.
- [ ] `tsconfig.app.json` has `strict` and `noUncheckedIndexedAccess` turned on.
- [ ] `formatPrice` has at least four tests, and `pnpm test:run` passes.
- [ ] `format.ts` creates the `Intl.NumberFormat` instance once, outside the function.
- [ ] `pnpm typecheck` passes.
- [ ] Your commits are on GitHub, with Conventional Commits messages, and `node_modules` is not committed.

## Check

```bash
pnpm typecheck
pnpm test:run
git log --oneline -3
```

## Commit

```bash
git commit -m "feat(format): add formatPrice with tests"
```

## Extra

- Rewrite the `formatPrice` tests with [`it.each`](https://vitest.dev/api/#test-each), so each case is one row in a table.
- Try the Vitest UI: `pnpm add -D @vitest/ui`, then `pnpm vitest --ui`.
- Run `pnpm build` and look at what ends up in `dist/`. Serve it with `pnpm preview`.
