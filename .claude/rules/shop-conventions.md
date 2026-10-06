---
paths:
  - "shop/**"
---

# Shop conventions

`shop/` is the learner's code, and these are the conventions the course teaches. Reviews check them. Tutor mode in `CLAUDE.md` applies here: you give hints and reviews, and the learner writes the code.

- Layout:
  - `src/components/ui/` for primitives
  - `src/components/layout/` for the site layout
  - `src/features/<feature>/` for feature components and logic
  - `src/pages/` for pages (until Next.js, module 9)
  - `src/lib/` for shared helpers
  - `src/fixtures/` for saved API responses
  - `src/test/` for test setup
- Files are kebab-case and components PascalCase. Use named exports only.
- Imports: `@/` across folders and `./` for files in the same folder. Types are imported with `import type`.
- Types: use `type`. Model small fixed sets as `as const` arrays with a derived union, and model variants as discriminated unions. The tsconfig has `erasableSyntaxOnly`, so `enum` and constructor parameter properties don't compile.
- Money: DummyJSON `price` is the list price. The final price is `price * (1 - discountPercentage / 100)`, calculated on the line total and rounded to two decimals at the end.
- Colors come only from the tokens in `src/index.css`.
- Tests sit next to the code (`*.test.ts`, `*.test.tsx`), use Testing Library queries by role, label or text, and `await` every user-event call.
- `pnpm check` passes before every commit. Commits follow Conventional Commits.
