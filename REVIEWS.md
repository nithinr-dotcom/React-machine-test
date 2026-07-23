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
