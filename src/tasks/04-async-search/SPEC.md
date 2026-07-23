# 04 · Async search (typeahead)

**Level 2 — Junior+ · Time box: 30–35 minutes**

Build a search box that queries an async source as the user types and renders the results —
with loading, error and empty states, debounced input, and no race conditions.

This is the first task where `useEffect` is the **correct** tool, not a banned one. It is
also the first task graded on the async column of the rubric: races, cancellation, and
cleanup on unmount.

## The data source

A helper is already in the starter file — **use it, do not replace it**:

```ts
searchUsers(query: string, signal: AbortSignal): Promise<string[]>
```

It simulates a network: variable latency (so responses can arrive out of order), it rejects
on `signal.abort()` with an `AbortError`, and it fails ~15% of the time with a thrown error
so your error path actually gets exercised. No real network, no new dependencies.

## Requirements

1. A controlled text input. As the user types, results are fetched and rendered as a list.
2. **Debounce** the input — one request per pause in typing (~300 ms), not one per keystroke.
3. Four view states, each visibly distinct: **idle** (empty query — no request fired),
   **loading**, **error** (with a message), and **success** (the list, or an explicit
   "no matches" when the list is empty).
4. **Latest query wins.** A slow request for an *earlier* query must never overwrite the
   results of a *later* one. Type `a`, then `ab` quickly; if `a`'s response lands last, the
   UI must still show `ab`'s results.
5. **Cancel in flight.** Starting a new search aborts the previous request (via the
   `AbortSignal`), and unmounting the component aborts too.
6. An empty or whitespace-only query fires **no request** and shows the idle state.

## Edge cases you are expected to handle

- **Type fast, then delete back to empty.** No stale results may flash; the UI lands on
  idle, and any in-flight request for the deleted text is discarded.
- **Out-of-order responses** (requirement 4). Decide the mechanism and make the code say so —
  an abort on the old request, an ignore-flag on the stale closure, or both.
- **Error, then a successful retry.** The error state must clear when the next query
  succeeds — you cannot leave a stale error under a fresh result.
- **Unmount mid-flight.** No "state update on an unmounted component" and no setState after
  the effect is torn down. The cleanup function is doing this job.
- An `AbortError` is **not** a real error — it is the expected result of your own
  cancellation and must not render the error state.

## Constraints

- One file: `src/tasks/04-async-search/index.tsx`. Default-export the component.
- TypeScript, no `any`. Model the view as a **discriminated union**
  (`idle | loading | error | success`), so an impossible combo like *loading &&
  error* is unrepresentable — the same "make illegal states unrepresentable" thread as 03,
  now applied to async. Four separate booleans do not pass.
- `useEffect` is allowed and expected. No data-fetching libraries (no React Query, SWR,
  axios), no lodash — write the debounce yourself.
- No new npm dependencies.
- Register it in `src/tasks/registry.ts` when done.
- `npm run build` and `npm run lint` must pass before you say done.

## Not required

Styling beyond plain markup, highlighting matched substrings, keyboard navigation of the
result list, caching previous queries, pagination, persistence, tests, a11y beyond real
`<input>` and `<label>` elements.

## Follow-up questions

Answer these in chat when you say done — they're part of the grade.

1. Your effect has a dependency array. What is in it, and why does the effect's **cleanup
   function** fix *both* the race and the unmount leak — rather than those being two
   separate mechanisms you bolt on?
2. Where does the debounce live — inside the effect, or in the input's `onChange`? What does
   each choice cost, and how does it interact with the dependency array?
3. You modelled the view as a discriminated union. Give the concrete bug that four booleans
   (`isLoading`, `isError`, `hasData`, `isIdle`) would let you ship in *this* component that
   the union makes impossible.

---

**Rules while the timer runs: no AI assistance, no copy-paste beyond API signatures.**
Start the clock when you open the editor. Tell me your actual time when you're done.
