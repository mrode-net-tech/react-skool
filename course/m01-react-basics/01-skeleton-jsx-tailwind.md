# 1.1 The skeleton, JSX and Tailwind

## Goal

Your app shows the Kramik home page, built from the skeleton and styled with Tailwind. The gallery at `/?gallery` shows every page of the shop. You make your first changes in JSX.

## Before you start

Module 0 is done. `src/lib/format.ts` exports `formatPrice`. The skeleton's `Price` component imports it.

## Concepts

### JSX

JSX is HTML-like syntax inside JavaScript. The compiler turns every tag into a function call:

```tsx
<Button variant="outline">Save</Button>
// becomes roughly
jsx(Button, { variant: 'outline', children: 'Save' })
```

So JSX is an expression. You can store it in a variable, return it from a function, or put it in an array. A few rules differ from HTML:

- `className` instead of `class`, and `htmlFor` instead of `for`
- attributes are camelCase: `onClick`, `tabIndex`, `aria-label` (aria and data attributes keep their dashes)
- every tag must be closed, so `<img />` and `<br />`
- a component returns a single root element. Use a fragment, `<>...</>`, when you don't want an extra `<div>`.
- curly braces embed any JavaScript expression: `{product.title}`, `{price * 2}`, `{isOpen ? 'Close' : 'Open'}`. Statements such as `if` or `for` don't work inside braces.
- comments look like this: `{/* comment */}`

### Compared with PHP templates

In a PHP template you write markup and drop into PHP with `<?= ?>`, or `{{ }}` in Blade. JSX works the other way round: you write JavaScript, and markup is one kind of value in it. A component is a function that takes data and returns markup.

React escapes every value you put in `{}`, like Blade's `{{ }}` or `htmlspecialchars`. The unescaped version is called `dangerouslySetInnerHTML`, the counterpart of `{!! !!}`. You won't need it in this course.

### Components

A component is a function whose name starts with a capital letter. React uses the case to tell them apart: `<button>` is an HTML element and `<Button>` is your component. The skeleton exports every component by name (`export function Header()`) and imports it where it's needed. This course doesn't use default exports.

### Tailwind CSS

Tailwind gives you small utility classes that you combine in the markup instead of writing CSS files:

```html
<a class="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent">
```

This means `display: flex`, vertically centered items, a gap of 0.5rem, rounded corners, padding, and a background color on hover. Some patterns you will see in the skeleton:

- Breakpoints are mobile-first. `md:grid-cols-3` applies from the `md` width upwards, and a class without a prefix applies to all widths.
- State prefixes: `hover:`, `focus-visible:`, `disabled:`, `group-hover:`, and `aria-[current=page]:`, which matches an attribute.
- Arbitrary values in square brackets: `lg:grid-cols-[14rem_1fr]`.

Tailwind v4 is configured in CSS. There is no `tailwind.config.js`, which most tutorials still show because they are written for v3. Look at the skeleton's `src/index.css`. It imports Tailwind, defines color variables in `:root`, and maps them to Tailwind colors in `@theme inline`. That's why components use names like `bg-primary` and `text-muted-foreground` instead of `bg-indigo-600`. The dark mode lesson only has to switch the variables.

`cn()` in `src/lib/utils.ts` joins class names. It also skips empty values, such as when a condition is false, and lets a later class override an earlier one: `cn('px-2', 'px-4')` gives `'px-4'`.

### The @/ alias

Without an alias, imports in deep folders turn into `../../../components/ui/button`. The skeleton imports from `@/components/ui/button`, where `@/` points to `src/`. It's the same idea as a PSR-4 mapping such as `"App\\": "src/"` in composer.json. TypeScript reads the mapping from `paths` in `tsconfig.app.json`, and Vite 8 reads it from the same place.

### File names

The skeleton uses kebab-case file names (`product-card.tsx`) and PascalCase component names (`ProductCard`). shadcn/ui and Next.js use the same convention (`page.tsx`, `not-found.tsx`), so you won't have to rename anything later.

Docs: [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx), [JavaScript in JSX with curly braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces), [Your first component](https://react.dev/learn/your-first-component), [Tailwind: styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes), [Tailwind: theme variables](https://tailwindcss.com/docs/theme), [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite).

## Task

### 1. Install the packages

In `shop/`:

```bash
pnpm add tailwindcss @tailwindcss/vite lucide-react clsx tailwind-merge
```

lucide-react has the icons. clsx and tailwind-merge are used by `cn()`.

### 2. Configure Vite and TypeScript

In `vite.config.ts`, add the Tailwind plugin and turn on tsconfig paths:

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
})
```

In `tsconfig.app.json`, add this to `compilerOptions`:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

Older guides also add `"baseUrl": "."`. Don't add it. TypeScript 6 deprecated `baseUrl`, and `paths` works without it.

### 3. Replace the template with the skeleton

Delete the template files that the skeleton replaces:

```bash
rm -r src/App.tsx src/App.css src/index.css src/main.tsx src/assets
```

Copy the skeleton. `--update=none` makes `cp` skip files that already exist, so your `format.ts` and the fixtures from lesson 0.3 stay untouched:

```bash
cp -r --update=none ../skeleton/src/. src/
```

In `index.html`, change the `<title>` to `Kramik`.

### 4. Look around

Run `pnpm dev` and open `/`, then `/?gallery`. The gallery panel in the corner lists every page. Open each page once. Open the matching files in `src/pages/` and `src/features/` next to the browser and find where each part of the page comes from.

Read `src/components/ui/button.tsx` and `button-classes.ts` carefully. This is how a reusable component usually looks, and lesson 1.2 builds on it.

In `src/index.css`, change the value of `--primary` and watch the buttons, links and badges change color everywhere. Keep the new color or change it back.

### 5. First changes in JSX

1. The logo markup appears twice, in `header.tsx` and in `footer.tsx`. Create `src/components/layout/logo.tsx` with a `Logo` component and use it in both places. The two versions differ a little in size. Either choose one look, or give `Logo` an optional `className` prop and merge it with `cn()`. `badge.tsx` shows how.
2. In the footer, add a line `© 2026 Kramik`. Calculate the year with `new Date().getFullYear()` inside `{}`.
3. Change the hero text on the home page to something of your own.

## Acceptance criteria

- [ ] `/` shows the styled home page, and `/?gallery` opens all 17 entries without errors in the browser console.
- [ ] The template files (`App.tsx`, `App.css`, `assets/`) are gone.
- [ ] `Logo` is a separate component used in the header and in the footer.
- [ ] The footer year is calculated, not typed in.
- [ ] Imports use `@/`, and `pnpm typecheck`, `pnpm test:run` and `pnpm build` pass.

## Check

```bash
pnpm typecheck
pnpm test:run
pnpm build
```

## Commit

Two commits keep the history readable. Use `git add -p` or add files one by one:

```bash
git commit -m "chore(shop): add Tailwind, icons and the @ alias"
git commit -m "feat(ui): add skeleton components and extract Logo"
```

## Extra

- Open the gallery at phone width with your browser's device toolbar. Find three classes that only apply from a breakpoint up.
- In `rating-stars.tsx`, work out how the half star is drawn. It's two icons on top of each other.
