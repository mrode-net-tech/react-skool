---
name: write-module
description: Write the next module of the React course in course/, based on the learner's real code in shop/. Use when the learner asks to write or generate a module ("write module 3", "napisz moduł 3").
argument-hint: "[module number]"
---

# Write a course module

Module: $ARGUMENTS. If no number is given, take the first module in `course/README.md` that has no lesson files.

You write in `course/` and `CLAUDE.md`. The learner writes every solution in `shop/`, so treat it as read-only.

## 1. Gather context

Read:

- `course/README.md`. The module's table is the scope. The lesson format and the refactor arcs apply.
- `course/progress.md`. Work the items marked to revisit into the new lessons where they fit.
- The previous module's lessons. Match their tone, length and format.
- `shop/`: `git log --oneline -30`, the tree of `shop/src`, `package.json`, and every file the module will touch.
- `skeleton/src`, for the components this module wires up.

This step is done when you can name, for each planned lesson, the learner's files and identifiers it touches.

Next, check the previous module's acceptance criteria against `shop/`. If any criterion fails, stop. Tell the learner what is missing and ask whether to write the module anyway.

## 2. Plan

Plan the lessons from the syllabus table. Each lesson is about 60 minutes of work for a senior PHP developer who is new to React.

If the plan no longer fits, ask with AskUserQuestion before you change the syllabus. For example, a topic may need two lessons, or the learner's code may make a lesson unnecessary. The budget is 44 lessons in total, 1 hour a day, 8 weeks from 2026-10-06.

This step is done when every lesson has a one-line goal and the learner has agreed to any change to the syllabus.

## 3. Check facts

Dispatch the `docs-researcher` subagent with one question per library the module introduces or changes:
- the version to use (installed in `shop/package.json`, or the latest stable on npm)
- the current API for what the lessons teach
- what changed compared with older tutorials

Run independent questions as parallel dispatches.

This step is done when every API the lessons use is confirmed in the current docs.

## 4. Write the lessons

- One file per lesson, at `course/mNN-<slug>/NN-<slug>.md`, with the sections from the lesson format in `course/README.md`.
- Concepts are short and concrete and link to the official docs. Add a PHP comparison where the mental model is similar, and say where it differs.
- Examples show the idea with another domain or a smaller case. The solution to the task stays with the learner.
- Acceptance criteria are checkable items that a review can tick off.
- Refactor arcs: a lesson that writes the simple version first names the later lesson that replaces it. A lesson that closes an arc refers back to the earlier version by the learner's file names.
- Suggested commit messages follow Conventional Commits.
- Text follows `.claude/rules/course-writing.md`.

## 5. Verify

Dispatch in parallel, both with the list of new lesson files:
- `lesson-verifier`, which runs every command and config snippet in a scratch copy of `shop/`
- `style-checker`, which checks the text against the course writing rules

Fix what they report. Run them again on the lessons you changed.

This step is done when the verifier reports every command and snippet as passing and the style checker reports nothing.

## 6. Publish

1. In `course/README.md`:
   - link the new lessons in the module's table
   - update any lesson titles that changed
   - update the line that says which modules are written
2. If you found a version or tool change that affects later modules, note it in the Stack section of `CLAUDE.md`.
3. Commit with `docs(course): add module N lessons`, and put any `CLAUDE.md` change in a separate `docs:` commit. Push to `origin main`.
4. Report to the learner:
   - the lessons, one line each
   - anything that surprised you during verification
   - what the learner must have done before starting
