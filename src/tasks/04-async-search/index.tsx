import { useState } from "react";

// ---------------------------------------------------------------------------
// PROVIDED — do not replace this. It simulates a network call:
//   - variable latency, so responses can arrive out of order
//   - rejects with an AbortError when `signal` is aborted
//   - throws ~15% of the time so your error path gets exercised
// Treat it exactly like a real fetch: you get a Promise, you pass a signal.
// ---------------------------------------------------------------------------
const NAMES = [
  "Ada Lovelace", "Alan Turing", "Grace Hopper", "Edsger Dijkstra",
  "Barbara Liskov", "Donald Knuth", "Margaret Hamilton", "Linus Torvalds",
  "Ken Thompson", "Dennis Ritchie", "Katherine Johnson", "Tim Berners-Lee",
];

function searchUsers(
  query: string,
  signal: AbortSignal,
): Promise<string[]> {
  const q = query.trim().toLowerCase();
  // Latency varies 150–650ms so a later request can beat an earlier one.
  const latency = 150 + ((q.length * 137) % 500);
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      // Deterministic ~15% failure based on the query, so it's reproducible.
      if ((q.charCodeAt(0) + q.length) % 7 === 0) {
        reject(new Error("Network error — the server hiccuped."));
        return;
      }
      resolve(NAMES.filter((n) => n.toLowerCase().includes(q)));
    }, latency);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort);
  });
}

// TODO (your task):
//   1. Controlled input + ~300ms debounce (write it yourself, no lodash).
//   2. Model the view as a discriminated union: idle | loading | error | success.
//   3. Fetch in a useEffect keyed on the debounced query; abort the previous
//      request on change and on unmount via the AbortSignal above.
//   4. Render all four states distinctly; treat AbortError as a non-error.
// See SPEC.md for the full requirements and the follow-up questions.
export default function AsyncSearch() {
  const [query, setQuery] = useState("");

  // Kept referenced so the starter file lints; delete this line once you
  // wire searchUsers into your effect.
  void searchUsers;

  return (
    <div>
      <label>
        Search users{" "}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <p>TODO: implement the async search — see SPEC.md.</p>
    </div>
  );
}
