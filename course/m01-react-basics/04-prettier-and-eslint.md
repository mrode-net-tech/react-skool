# 1.4 Prettier and ESLint

## Goal

PhpStorm formats your code on save. ESLint runs type-aware rules and accessibility rules, and one command, `pnpm check`, runs every check the project has.

## Before you start

Lesson 1.3 is done and committed. Formatting changes many files at once, so start from a clean `git status`.

## Concepts

### Two tools, two jobs

Prettier only formats: indentation, line breaks, quotes, commas. It has very few options on purpose, so teams stop arguing about style. It's like PHP-CS-Fixer with a fixed rule set.

ESLint finds problems in the code itself: unused variables, promises nobody waits for, hooks called inside an `if`, images without `alt`. It's closer to PHPStan with extra rule sets. Some old ESLint rules also deal with formatting. `eslint-config-prettier` turns those off, so the two tools don't fight.

### Flat config

ESLint is configured in `eslint.config.js`, which exports an array of config objects. ESLint applies them in order, and later objects win. Each object can limit itself to some files (`files`), pull in shared configs (`extends`), and set parser options. The older `.eslintrc` format is gone in ESLint 10, though many tutorials still show it.

### What the rule sets do

The template already includes these:

- `@eslint/js` recommended: general JavaScript mistakes.
- `typescript-eslint` recommended: TypeScript-specific rules.
- `react-hooks`: the rules of hooks from lesson 1.3, and later the dependencies of effects.
- `react-refresh`: makes sure files export only components, so hot reload keeps the state. That's why `buttonClasses` lives in a separate file.

You add these:

- `typescript-eslint` recommendedTypeChecked: rules that use type information. They find un-awaited promises (`no-floating-promises`), an async function passed where a normal callback is expected (`no-misused-promises`), and `any` that leaks into typed code. `projectService` lets ESLint find the right tsconfig for every file.
- `jsx-a11y`: accessibility rules for JSX, such as missing `alt` text, inputs without a label, or a click handler on a `<div>` that a keyboard user can't reach.
- `eslint-config-prettier`: turns off the rules that Prettier covers. It must come last.

### Sorting Tailwind classes

`prettier-plugin-tailwindcss` sorts the classes in every `className` into Tailwind's recommended order. Two people who write the same classes then produce the same line, and diffs stay small. In Tailwind v4 the plugin needs to know where your CSS entry file is (`tailwindStylesheet`).

Docs: [Prettier: rationale](https://prettier.io/docs/rationale), [ESLint: configuration files](https://eslint.org/docs/latest/use/configure/configuration-files), [typescript-eslint: linting with type information](https://typescript-eslint.io/getting-started/typed-linting), [jsx-a11y rules](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#supported-rules), [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

## Task

### 1. Prettier

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Create `prettier.config.js`:

```js
/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/index.css',
}
```

Create `.prettierignore` with one line, `pnpm-lock.yaml`. Prettier already skips what `.gitignore` lists.

Add two scripts:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

Run `pnpm format` and look at the diff. Prettier also rewrites the template's `README.md` and the quotes in `index.css`. Commit the formatting on its own, so the next diffs show only real changes:

```bash
git add -A
git commit -m "style: format code with Prettier"
```

### 2. ESLint

```bash
pnpm add -D eslint-plugin-jsx-a11y eslint-config-prettier
```

The latest jsx-a11y release still lists ESLint 9 as its highest supported version, although it works with ESLint 10. pnpm warns about it. To accept that version explicitly, create `pnpm-workspace.yaml` in `shop/`:

```yaml
peerDependencyRules:
  allowedVersions:
    eslint-plugin-jsx-a11y>eslint: '10'
```

Extend `eslint.config.js`. Keep what the template has and add the new parts:

```js
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: { allowDefaultProject: ['scripts/*.ts'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
])
```

`allowDefaultProject` covers `scripts/` from lesson 0.4, which no tsconfig includes.

### 3. Fix what ESLint finds

Run `pnpm lint`. For each problem, look up the rule by its name (for example `@typescript-eslint/no-floating-promises`), read why it exists, and fix the code. Don't switch the rule off.

You will probably get a jsx-a11y error on the drawer overlay from 1.3: a `<div>` with `onClick` that a keyboard can't reach. The rule is right. The real fix is a dialog that closes on Escape and keeps focus inside, and you get that in lesson 11.1 with a Radix-based component. When a rule is right but the fix comes later, disable it for that one line and give the reason:

```tsx
{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- mouse shortcut only, keyboard users have the close button; replaced by a Radix dialog in 11.1 */}
```

Use this sparingly. Every disable comment needs a reason after `--`.

### 4. One command for all checks

Add a script that runs everything CI will run later:

```json
"check": "pnpm typecheck && pnpm lint && pnpm format:check && pnpm test:run"
```

### 5. PhpStorm

- Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint: select "Automatic ESLint configuration" and "Run eslint --fix on save".
- Settings → Languages & Frameworks → JavaScript → Prettier: select "Automatic Prettier configuration" and "Run on save".

Make a messy change in a component (wrong indentation, double quotes, unsorted classes), save it, and watch it get fixed.

## Acceptance criteria

- [ ] `pnpm lint` reports no problems, and every `eslint-disable` comment has a reason.
- [ ] `pnpm format:check` passes, and Tailwind classes are sorted.
- [ ] `pnpm check` runs typecheck, lint, format check and tests, and passes.
- [ ] PhpStorm formats and fixes on save.
- [ ] The formatting commit is separate from the config commit.

## Check

```bash
pnpm check
```

## Commit

```bash
git commit -m "chore(lint): add type-aware ESLint rules, jsx-a11y and Prettier"
```

## Extra

- In a component, add the statement `fetch('https://dummyjson.com/products')` on its own line, without `await` and without assigning the result. Run `pnpm lint` and read the message. Remove the line afterwards.
- Look at the [strictTypeChecked](https://typescript-eslint.io/users/configs#strict-type-checked) config. Switch to it for a moment and see what it would add for your code.
