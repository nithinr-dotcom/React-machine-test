# 02 · Todo list

**Level 1 — Fresher · Time box: 20–25 minutes**

Build a todo list with add, toggle, delete and filtering.

## Requirements

1. A text input + **Add** button. Submitting adds a todo with the typed text, unchecked.
2. Each todo renders with a checkbox (toggles done) and a **Delete** button.
3. Done todos are visually distinguished (a line-through is enough).
4. Filter controls: **All / Active / Done**. Exactly one is active at a time, and the
   current filter is visibly indicated.
5. A count line: how many items are left active (e.g. `2 items left`).
6. A **Clear completed** button that removes all done todos.

## Edge cases you are expected to handle

- **Empty or whitespace-only** input must not create a todo. Decide whether Add is disabled
  or the submit is rejected — make the code express that decision deliberately.
- The input is **cleared after a successful add**, and not cleared on a rejected one.
- Pressing **Enter** in the input adds the todo (not just clicking the button).
- **Duplicate texts** are allowed — so your list keys must survive two identical strings,
  and deleting one must not delete the other.
- The list is **empty** (no todos at all) vs. **empty under the current filter** (todos
  exist but none match). These are different states; show something sensible for each.
- Singular/plural in the count line (`1 item left`, not `1 items left`).

## Constraints

- One file: `src/tasks/02-todo/index.tsx`. Default-export the component.
- TypeScript, no `any`. The text input must be **controlled**.
- All list updates **immutable** — no `push`, `splice`, or mutating an item in place.
- No new npm dependencies. No `useEffect` — none of this needs one.
- The filtered list must be **derived**, not stored in a second piece of state.
- Register it in `src/tasks/registry.ts` when done.
- `npm run build` and `npm run lint` must pass before you say done.

## Not required

Styling beyond plain markup, persistence, editing a todo's text, reordering, animations,
tests, a11y beyond real `<button>`, `<label>` and `<input>` elements.

## Follow-up questions

Answer these in chat when you say done — they're part of the grade.

1. Why is `index` a bad key here? Give the concrete scenario in *this* component where an
   index key produces a visible bug — not the general rule.
2. The filtered list and the active count are both derived on every render. When would you
   reach for `useMemo` on them, and what would you need to know about the app to justify it?
3. You have `todos` and `filter` in state. Would `useReducer` be better than two
   `useState`s here? What specific thing would have to change about the spec to make the
   answer flip?

---

**Rules while the timer runs: no AI assistance, no copy-paste beyond API signatures.**
Start the clock when you open the editor. Tell me your actual time when you're done.
