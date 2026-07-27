# 05 · Sign-up form with validation

**Level 2 — Junior+ · Time box: 30–35 minutes**

Build a registration form with per-field validation, sensible error timing, and a
cross-field rule. This is the task that separates "can wire an input" from "understands
form state" — the errors must be **derived**, the timing must be **deliberate**, and one
field must depend on another.

## The form

Four controlled fields:

| Field | Rule |
| --- | --- |
| **Name** | Required, non-empty after trim, at least 2 characters |
| **Email** | Required, must look like an email (`something@something.tld` is enough) |
| **Password** | Required, at least 8 characters, at least one letter and one digit |
| **Confirm password** | Required, must **exactly match** Password |

## Requirements

1. All four fields are **controlled**. One `values` object in state, not four `useState`s
   (the shape is the point — see constraints).
2. Each field shows its **own** error message inline when it is invalid.
3. **Error timing:** a field's error is shown only after the user has *touched* it (blurred
   it at least once) — no wall of red on first render. **But** once the user presses Submit,
   every invalid field reveals its error, touched or not.
4. The **Submit** button attempts submit. On a fully valid form, "submit" means: prevent the
   default, and render the collected values (or a success message) — there is no server.
5. On an invalid submit, nothing is submitted and all errors become visible (per #3).
6. A visible summary of form validity is fine but not required; what *is* required is that
   the error timing in #3 is exactly right.

## Edge cases you are expected to handle

- **First render is clean** — no errors visible before any interaction.
- **Submit-then-fix:** after a failed submit reveals all errors, fixing a field clears *its*
  error live (you don't have to blur again once submit has been pressed).
- **The cross-field trap:** the user fills Password, then Confirm (they match), then goes
  back and edits Password. Confirm must **re-validate** and show a mismatch — a stale "valid"
  on Confirm is the bug this rule exists to catch.
- **Whitespace:** a name of all spaces is invalid; trim before checking.
- Submitting with **every field empty** shows every error and does not submit.

## Constraints

- One file: `src/tasks/05-form-validation/index.tsx`. Default-export the component.
- TypeScript, no `any`. Model `values`, `touched`, and the `submitted` flag as typed
  structures keyed by field name — `Record<Field, string>` / `Record<Field, boolean>` or a
  typed object, so adding a field is one edit, not five.
- The **errors are derived** from `values` on every render — do **not** store an `errors`
  object in state and keep it in sync. No `useEffect` for validation.
- No form libraries (no Formik, react-hook-form, zod, yup) and no validation libraries —
  write the checks yourself. No new npm dependencies.
- Register it in `src/tasks/registry.ts` when done.
- `npm run build` and `npm run lint` must pass before you say done.

## Not required

Styling beyond plain markup, async/server validation, debouncing, showing password strength
meters, accessibility beyond real `<form>`, `<label>`, `<input>` and `<button>` elements,
resetting the form after submit, tests.

## Follow-up questions

Answer these in chat when you say done — they're part of the grade.

1. Are the `errors` derived state or source state? Name the specific bug you avoid by
   deriving them on render instead of storing an `errors` object and updating it in an
   effect or in each `onChange`.
2. You track both `touched` (per field) and `submitted` (one flag). Why do you need *both*?
   Describe the exact UX bug you'd ship if you tracked only `touched`, and the one you'd ship
   if you tracked only `submitted`.
3. This form has 4 fields with independent-ish rules. At what point — what change to the
   spec — does `useReducer` start beating three `useState`s here, and what would the actions
   look like?

---

**Rules while the timer runs: no AI assistance, no copy-paste beyond API signatures.**
Start the clock when you open the editor. Tell me your actual time when you're done.
