# 00 · Testing board

**Level 0 — Learning · No time box**

The scratchpad. Everything else in this repo is a timed, no-AI drill with a score attached.
This one is the opposite: a place to re-do a task you already attempted, poke at an API until
you understand it, or try the version of a solution you *wish* you'd written when the clock
was running.

## Purpose

1. **Re-attempt without the timer.** After a review lands in `REVIEWS.md`, rebuild the same
   task here slowly and deliberately — read docs, use AI, look things up. The point is
   understanding, not the score.
2. **Isolate a concept.** When a review says "you mutated state" or "that effect is
   unnecessary", build the smallest possible thing that demonstrates the correct version.
3. **Try before you commit.** Sketch an approach here before writing it into a real task
   folder.

## Rules

Deliberately different from the rest of the ladder:

- **AI assistance allowed.** Docs, copy-paste, whatever helps.
- **No time box.** No score. Nothing is written to `TASKS.md` for this board.
- Not a graded artifact — nothing here is reviewed, so don't polish it.

Still applies:

- TypeScript, no `any`. Fix the types rather than escaping them; that's half the learning.
- No new npm dependencies. If a drill needs one, the drill is wrong for this repo.
- `npm run build` and `npm run lint` must still pass — a broken board breaks the whole app.

## Structure

- One file: `src/tasks/00-learning/index.tsx`. Default-export the component.
- Keep the current experiment at the top; it renders as the board's content.
- Anything worth keeping goes into its own numbered task folder. Anything not worth keeping
  gets deleted — this file is not an archive, and it's expected to be thrown away and
  rewritten constantly.

## When you're finished with an experiment

Ask yourself, and answer honestly:

1. What did the timed attempt get wrong, and *why* — was it a knowledge gap or a decision
   made under pressure?
2. Could you now rebuild this from scratch, timed, without the board open? If not, the
   experiment isn't done.
3. What's the one-sentence rule you'd give yourself to avoid the same mistake next time?
