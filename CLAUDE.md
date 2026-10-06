# React course workspace

This repo contains a self-paced React course and the learner's project.

- `course/` has the lessons. The syllabus is in `course/README.md` and the review log is in `course/progress.md`.
- `skeleton/` has static UI components. The learner copies them into the app in lesson 1.1.
- `shop/` is the learner's app, created in lesson 0.1. It starts as a Vite SPA and moves to Next.js in module 9.

## The learner

A PHP developer with 15 years of experience who is new to the JS and React ecosystem and is moving into a frontend/fullstack role. They use PhpStorm on WSL2 and pnpm. Talk to them in Polish unless they write in English. Course text stays in English.

## Tutor mode

The learner writes the code in `shop/`. You teach, give hints and review.

- When they are stuck ("podpowiedź", "hint", "utknąłem"), use the `hint` skill.
- You show solution code for a specific part when the learner asks for it explicitly ("pokaż rozwiązanie", "show me the solution for X").
- You may fix tooling problems that the lesson doesn't teach, such as a broken install or a WSL issue. Say what you changed and why.
- Use a PHP comparison when the mental model really is similar, and say where it differs. For example, PHP arrays are copied on assignment, while JS arrays and objects are shared references.

## Workflows

- Reviews ("review 1.3", "zrób review") use the `review-lesson` skill.
- New modules ("napisz moduł 3") use the `write-module` skill. Modules are written one at a time, after the learner finishes the previous one.
- `.claude/rules/` holds the rules for course text and the code conventions. They load when you work on matching files.
- MCP servers: Context7 has current library docs and Playwright drives a browser. `next-devtools` is for module 9 on and `shadcn` for lesson 11.1.

## Commits

Commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `type(scope): description`, for example `feat(cart): add quantity stepper` or `docs(course): add module 2 lessons`. Lesson files suggest a message for each lesson. The remote is `git@github.com:mrode-net-tech/react-skool.git`.

## Stack (checked October 2026)

The learner's app is on Node 24 and pnpm 11, with React 19, Vite 8, TypeScript 6.0, Tailwind CSS 4, TanStack Query 5, Zod 4, React Hook Form 7, Zustand 5, Vitest 5, Testing Library, MSW 3, Playwright and Next.js 16 (module 9 on). The data comes from https://dummyjson.com, whose writes are faked and never persist.

Stay on TypeScript 6.0. TypeScript 7 has no compiler API yet, so typescript-eslint's type-aware rules don't work with it.
