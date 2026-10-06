---
name: hint
description: Give the learner a graded hint for the course lesson they are stuck on, without solving it. Use when the learner asks for a hint or says they are stuck ("hint", "podpowiedź", "utknąłem", "more", "więcej").
argument-hint: "[lesson, e.g. 1.3] [more]"
---

# Hint

Request: $ARGUMENTS

Hints climb a ladder of three levels. The learner climbs it by asking for more ("more", "więcej", `/hint 1.3 more`).

| Level | What the hint contains |
|---|---|
| 1 | The concept behind the problem, a link to the official docs, and a question that points the learner in the right direction |
| 2 | Where to work (file, function) and the approach: which API or pattern, as steps or pseudocode |
| 3 | A short snippet of the pattern in a different context than the task (another domain or a smaller case), which the learner adapts |

A new problem starts at level 1. "More" on the same problem goes one level up. Above level 3, the tutor mode in `CLAUDE.md` applies: the learner gets the solution to a part when they ask for it explicitly.

## 1. Locate

Find the lesson: the one named in the request, otherwise the one the learner's latest commits and uncommitted changes in `shop/` work towards. Read the lesson file, then find the task step the learner is on by comparing their code with the task steps.

## 2. Diagnose

Read the learner's current code for that step: `git status`, `git diff` and the files involved. Run the check that shows the problem (`pnpm typecheck`, `pnpm test:run <file>` or `pnpm lint`) and read its output. When the learner pasted an error, start from that error.

This step is done when you can name the blocker in one sentence: the missing piece, the misconception, or the error and its cause.

## 3. Hint

Write the hint in Polish at the current level, in at most about eight lines.

- When an error message is involved, first explain what it means in plain words and point to the line it refers to.
- Use a PHP comparison when the mental model is similar, and say where it differs.
- End with a next step for the learner: something to try, check or read.

The learner applies the hint in `shop/`. Your hint is text in the chat.

## 4. Note heavy hints

After a level 3 hint, or when you show a solution, add an entry to `course/progress.md` in the hint format at the top of that file. Leave it uncommitted, because the next review commit includes `progress.md`.
