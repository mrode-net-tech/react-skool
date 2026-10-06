---
paths:
  - "skeleton/**"
---

# Skeleton conventions

The skeleton is static markup that the learner copies into `shop/src` in lesson 1.1.

- Components show hardcoded content taken from `src/fixtures/`, and they have no props, state, hooks or data fetching. A one-line comment at the top names the lesson that wires the component up. Some components take props as worked examples: the `ui/` primitives, `SiteLayout`, `AdminLayout`, `EmptyState`, `ErrorState` and `CheckoutSteps`.
- Colors come only from the tokens in `src/index.css`. Their names match shadcn/ui (`bg-primary`, `text-muted-foreground`, `border-border`), and the `.dark` block holds the dark values for lesson 11.2.
- File names are kebab-case and component names are PascalCase. Use named exports, `@/` imports and `cn()` from `@/lib/utils`.
- Icons come from lucide-react. Version 1 has no brand icons.
- Accessibility baseline: landmarks, a label for every input, `aria-label` on icon-only buttons, `aria-current` on the active item, and `role="dialog"` with `aria-modal` on the drawer. Later lessons query these roles in tests.
- `ui/price.tsx` imports `formatPrice` from `@/lib/format`, which the learner writes in lesson 0.1. The skeleton doesn't ship that file.

To verify a change, copy `skeleton/src` into a scratch Vite react-ts app that has the setup from lesson 1.1 and a stub `src/lib/format.ts`. Then run `tsc -b`, ESLint with the lesson 1.4 config and `vite build`, and format with the lesson 1.4 Prettier config, passing it with `--config`.

If the learner has already copied the skeleton, a change here doesn't reach their `shop/`. Tell them which files changed.
