# 03 · Accordion

**Level 1 — Fresher · Time box: 20–25 minutes**

Build an accordion: a list of sections, each with a header you click to reveal its body.

## Requirements

1. Render a list of sections from a data array. Each section has a **title** and a **body**.
   Hard-code 4–5 sections at module scope; you are not fetching anything.
2. Clicking a section header toggles that section open/closed. Clicking an open header
   closes it again.
3. **Single-open mode**: opening a section closes whichever one was open.
4. A toggle control (checkbox or button) that switches the accordion into **multi-open
   mode**, where any number of sections can be open at once.
5. Each header shows an open/closed indicator that reflects its actual state (`▸` / `▾`,
   `+` / `−`, whatever — it must be driven by state, not CSS-only).
6. The body of a closed section must **not be in the DOM** — conditional render, not
   `display: none`.

## Edge cases you are expected to handle

- **Switching modes while sections are open.** Multi-open with three sections expanded →
  user flips to single-open. What happens? There is no single right answer, but there is a
  wrong one: leaving three sections open in a mode that promises one. Decide, and make the
  code say so.
- **Switching the other way** (single → multi) must not lose the section that was open.
- The section list could contain **two sections with the same title**. Your keys and your
  "which one is open" bookkeeping must both survive that.
- An **empty section list** renders without crashing.

## Constraints

- One file: `src/tasks/03-accordion/index.tsx`. Default-export the component.
- TypeScript, no `any`. The open-state must be modelled so that an **impossible state is
  unrepresentable** — think about what shape holds "one open" vs "many open" and whether
  that is one piece of state or two.
- No new npm dependencies. No `useEffect` — none of this needs one.
- Do not store a `isOpen` boolean **on each section object**. Section data is static input;
  which one is open is UI state, and the two do not belong in the same array.
- Extract the row into its own `<AccordionItem>` component. The parent owns the open-state;
  the item receives what it needs as props and reports clicks upward. This is the
  lifting-state-up drill — a single monolithic component does not pass.
- Register it in `src/tasks/registry.ts` when done.
- `npm run build` and `npm run lint` must pass before you say done.

## Not required

Animation or height transitions, a11y beyond real `<button>` elements for the headers
(no `aria-expanded` needed — though see follow-up 3), keyboard arrow navigation,
persistence, styling beyond plain markup, tests.

## Follow-up questions

Answer these in chat when you say done — they're part of the grade.

1. You had to pick a shape for the open-state. Walk me through what you chose (`string |
   null`? `Set<string>`? `Record<string, boolean>`?) and what the *other* options would have
   cost you. Which one makes the single-vs-multi switch cheapest?
2. `<AccordionItem>` gets an `onToggle` prop that is a new function identity on every parent
   render. Does that matter? Under what specific condition would it start to matter, and
   what are the two things you'd have to change together to fix it?
3. Requirement 6 says a closed body must not be in the DOM. Name a concrete situation where
   that decision is *wrong* — where you'd want the body mounted but hidden — and what breaks
   if you get it backwards.

---

**Rules while the timer runs: no AI assistance, no copy-paste beyond API signatures.**
Start the clock when you open the editor. Tell me your actual time when you're done.
