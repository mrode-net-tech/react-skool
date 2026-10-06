---
name: review-lesson
description: Review the learner's finished course lesson against its acceptance criteria. Use when the learner asks for a review ("review 1.3", "zrób review").
argument-hint: "[lesson, e.g. 1.3]"
---

# Review a lesson

Lesson: $ARGUMENTS. If no lesson is given, take the lesson of the learner's latest commit in `shop/`. If that is unclear, take the first lesson in `course/README.md` that has no entry in `course/progress.md`.

1. Find the lesson file in `course/`. Dispatch the `lesson-reviewer` subagent with the lesson id and the path to that file.
2. Report to the learner in Polish, with the most important points first and at most about 10 points. Cover:
   - each acceptance criterion, met or not met
   - bugs
   - non-idiomatic React or TypeScript, naming the idiomatic alternative and linking the docs
   - gaps in the tests

   The learner writes the fixes. Show code only when they ask for the solution to a specific part.
3. Add a review entry to `course/progress.md`, in the review format at the top of that file: lesson, date, verdict, and notes with the items to revisit.
4. Commit only `course/progress.md`, with the message `docs(progress): review <lesson>`. The commit also picks up any hint entries that are not committed yet.

The review is done when the learner has the report and `progress.md` has the entry.
