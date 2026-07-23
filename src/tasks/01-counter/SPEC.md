# 01 · Counter with step control

**Level 1 — Fresher · Time box: 20–25 minutes**

Build a counter whose increment size is controlled by the user.

## Requirements

1. Display the current count, starting at `0`.
2. **Increment** and **Decrement** buttons that move the count by the current *step*.
3. A **Reset** button that returns the count to `0` (step is left alone).
4. A number input for the step, defaulting to `1`.
5. The count is clamped to the range **-100 … 100** inclusive. It must never display a
   value outside that range, no matter how large the step is.
6. Increment is disabled when the count is already at the max; decrement likewise at the min.

## Edge cases you are expected to handle

- The step input is **cleared** — the field is empty. The UI must not show `NaN`, and the
  buttons must behave sanely.
- The user types something non-numeric or a negative step. Decide what the correct
  behaviour is, and make the code express that decision deliberately.
- Step is a decimal (`0.5`). The displayed count should not turn into `0.30000000000000004`.
- A step large enough to overshoot the clamp — e.g. count `95`, step `50`. Result should be
  `100`, not `145`, and not a no-op.

## Constraints

- One file: `src/tasks/01-counter/index.tsx`. Default-export the component.
- TypeScript, no `any`. The step input must be a **controlled** component.
- No new npm dependencies. No `useEffect` — none of this needs one.
- Register it in `src/tasks/registry.ts` when done.
- `npm run build` and `npm run lint` must pass before you say done.

## Not required

Styling beyond the plainest markup, persistence, keyboard shortcuts, tests, a11y beyond
using real `<button>` and `<label>` elements.

## Follow-up questions

Answer these in chat when you say done — they're part of the grade.

1. You store the step in state as you type. Is the step **derived state** or **source
   state**? What about the clamped count — should the clamp live in the setter, in render,
   or in state?
2. If a parent re-rendered this component 60 times a second, what in your implementation
   would you reach for `useMemo` / `useCallback` on — and would it actually help here?
3. How would your answer to requirement 5 change if the min/max came in as props that can
   change at runtime while a count is already stored?

---

**Rules while the timer runs: no AI assistance, no copy-paste beyond API signatures.**
Start the clock when you open the editor. Tell me your actual time when you're done.
