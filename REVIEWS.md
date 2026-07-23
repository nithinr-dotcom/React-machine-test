# Reviews

One entry per attempt. Written after each task so feedback survives across sessions.

## Rubric

| Dimension | What's graded |
| --- | --- |
| Correctness | Meets spec including the stated edge cases |
| React idiom | Unnecessary effects, derived vs stored state, keys, immutability |
| Edge cases | Empty/loading/error, races, double-submit, unmount cleanup |
| Types | Real types vs `any`, props modeled correctly, unions where apt |
| Structure | Component split, naming, when to extract a hook |
| Follow-ups | Verbal questions an interviewer would ask on top |

---

<!-- Reviews appended below, newest last. -->

## 01 · Counter with step control — 9/10

Build + lint pass.

- **Correctness** — All edge cases handled: empty step (tests the *text* for emptiness, not `Number("")`), overshoot clamped before `setCount` (95+50 → 100), negative step handled by deriving `nextUp`/`nextDown`, float noise rounded. Disabled logic asks "would this change anything?" (`next === count`) — stricter and more correct than "at max".
- **React idiom** — Step stored as source text, number derived, clamp in the write path, no `useEffect`. Rounding keeps counts on a 0.01 grid, making the `next === count` float equality safe.
- **Types/structure** — No `any`, controlled input, single file, registered. All constraints met.
- **Deduction** — `roundFloat` comment says "10 decimals" but code rounds to 2 (`*100/100`). Comment is wrong, and 2-dp silently swallows steps finer than 0.01. In-spec (only 0.5 required) but a real doc/precision gap. Fix: `Number(v.toPrecision(12))` removes float noise without a decimal-places cap.
- **Follow-ups** — step = source state, number = derived; clamp belongs in setter (as done). `useMemo`/`useCallback` would not help (nothing memoized downstream). Runtime min/max props are the case where re-clamping stored count on prop change is warranted — the one place clamp-in-render earns its keep.

## 02 · Todo list — 3/10

Build passes, **lint fails** (`react-hooks/set-state-in-effect` error + `exhaustive-deps` warning) — the stated gate was not met. Follow-up questions unanswered.

- **Correctness** — The component does not work as specified. `useEffect(..., [filter])` writes `filteredTodos` state; `todos` is not a dep, so adding/toggling/deleting never updates the rendered list — items only appear after changing the filter. Missing outright: Enter-to-submit, active-count line (and its singular/plural), Clear completed, and both empty states.
- **React idiom** — Three constraint violations, each explicit in the spec: derived list stored in a second state, `useEffect` used to compute it, and in-place mutation (`v.status = "completed"` at line 32 — `map` returns a new array, so it re-renders by luck, but the item identity is unchanged). Checkbox is uncontrolled (no `checked=`), so done-ness lives in the DOM.
- **Edge cases** — `todoChangeHandler` calls `.trim()` on every keystroke, so a trailing space is swallowed on re-render: **multi-word todos are impossible to type**, and backspacing to empty early-returns. Trim at submit, never on change. `key={t.task}` breaks on the duplicate texts the spec called out.
- **Types/structure** — No `any`, `Status` union is a good call. Root modeling error: `Todo` has no `id`. That single omission causes both the duplicate-key bug and the index bug — handlers receive an index from `filteredTodos.map` and apply it to `todos`, so with any filter active, toggle/delete hit the wrong row. Adding `id: string` and keying handlers on it fixes both. `console.log` left in at lines 13 and 53; `id != idx` should be `!==`.
- **Fix list** — (1) delete `filteredTodos` + the effect, derive in render; (2) add `id`, key and address by it; (3) store raw input, trim at submit; (4) spread instead of mutate; (5) `checked=` on the checkbox; (6) wrap in `<form onSubmit>`; (7) add count, Clear completed, empty states.
- **Follow-ups** — Q1 is now concrete rather than hypothetical: this attempt shipped the index bug live. Re-attempt and answer all three.

## 03 · Accordion — 7/10

Scored against the `00-learning` re-attempt. Build + lint pass (whole repo).

- **Correctness** — All six requirements met. Both modes work, indicator is state-driven, closed bodies are conditionally rendered (not `display:none`). Edge cases handled: multi→single collapses to the first-open id (`prev.values().next().value`, deliberate), single→multi keeps everything, and an empty list would map to nothing without crashing. The one gap vs the SPEC's intent: `LIST_ITEMS` uses `crypto.randomUUID()` for ids, so the "two sections with the same title" case is never actually exercised — the bookkeeping *is* id-based so it would survive, but you didn't prove it.
- **React idiom** — Strong. One `Set<string>` serving both modes is exactly the right shape (impossible state — "many open" in single mode — is unrepresentable), and the mode switch stays cheap. **Latent bug though:** `toggleHandler` reads `const isOpen = activeIds.has(id)` from the *closure* instead of the updater's `prev`. It works today only because `activeIds` happens to be current; inside a functional `setState` you must read `prev`, or a batched/stale render will toggle against the wrong snapshot. One-word fix: `prev.has(id)`.
- **Edge cases** — Covered in logic (see above). Deduction is that they're asserted in code, not demonstrated in the data.
- **Types** — `useState(new Set())` infers `Set<unknown>`, not `Set<string>`. No literal `any`, but this is the same hole by inference — `activeIds.has(id)` type-checks against `unknown`. Annotate: `useState<Set<string>>(new Set())`. Also `id` is declared in `AccordionProps` but never used inside the item (the handler is pre-bound in the parent) — drop it or use it.
- **Structure** — Row extracted into its own `Accordion` component, parent owns all state, child is a pure function of props and reports clicks up. Lifting-state-up drill: passed.
- **Deduction (main)** — The header is `<div onClick={toggleHandler}>`, not a real `<button>`. The SPEC names real `<button>` headers as the *baseline* a11y bar (it only waives things *beyond* that). A `<div>` isn't focusable and won't fire on Enter/Space — this is the one explicit requirement missed. Swap to `<button type="button">`.
- **Follow-ups** — Not answered. They're part of the grade; answer Q1 (state shape trade-offs), Q2 (`onToggle` identity — when does it matter, what two things change together), Q3 (when keeping a closed body mounted-but-hidden is correct).

**To reach 9/10:** (1) `<button>` headers, (2) `prev.has(id)` in the updater, (3) `useState<Set<string>>`, (4) answer the three follow-ups.
