# React Machine Coding Ladder

Format: timed, interview-realistic. Spec + time box → you code alone → say "done" → review.
Score out of 10 per rubric in `REVIEWS.md`.

## Level 0 — Testing board · untimed

- **00 · Testing board** — untimed scratchpad for re-doing tasks and isolating concepts.
  AI allowed, not scored. Spec: `src/tasks/00-learning/SPEC.md`.

## Level 1 — Fresher (~0–1 yr) · 20–25 min

- [x] **01 · Counter with step control** — `useState`, controlled input, clamping — _score: 9/10_
- [ ] **02 · Todo list** — add/toggle/delete/filter, keys, immutable updates — _score: 3/10 — re-attempt_
- [ ] **03 · Accordion** — conditional render, lifting state, single vs multi open — _score: —_

## Level 2 — Junior+ (~1–2 yr) · 30 min

- [ ] **04 · Star rating** — hover vs selected, half stars, keyboard + a11y — _score: —_
- [ ] **05 · Form with validation** — per-field errors, touched, submit gating — _score: —_
- [ ] **06 · Fetch user list** — loading/error/empty, cleanup, AbortController — _score: —_

## Level 3 — Mid (~2–4 yr) · 35–40 min

- [ ] **07 · Debounced autocomplete** — `useDebounce`, race conditions, keyboard nav — _score: —_
- [ ] **08 · Sortable paginated table** — derived state, `useMemo` — _score: —_
- [ ] **09 · Custom hooks** — `useLocalStorage` + `useFetch`, generics, stale closures — _score: —_
- [ ] **10 · Modal via portal** — `createPortal`, focus trap, Esc, scroll lock — _score: —_

## Level 4 — Senior (~4+ yr) · 45–60 min

- [ ] **11 · Infinite scroll feed** — `IntersectionObserver`, cursor paging, retry — _score: —_
- [ ] **12 · Compound `<Tabs>`** — Context, controlled + uncontrolled — _score: —_
- [ ] **13 · Drag-and-drop kanban** — pointer events, reorder, optimistic move — _score: —_
- [ ] **14 · Nested comment tree** — recursion, `useReducer`, normalized state — _score: —_
- [ ] **15 · Mini state manager** — `createStore` + `useSyncExternalStore`, selectors — _score: —_

## Rules

- No AI assistance while the timer runs. No copy-paste from docs beyond API signatures.
- No new npm dependencies unless the spec says so.
- Each task lives in `src/tasks/NN-name/index.tsx` and is registered in `src/tasks/registry.ts`.
- `npm run build` and `npm run lint` must pass before review.
