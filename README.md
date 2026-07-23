# React Machine Coding Practice

React 19 + TypeScript + Vite + Tailwind CSS v4 sandbox for interview machine-coding drills.

Tailwind is wired via `@tailwindcss/vite` — no config file, no PostCSS. Design tokens live in
the `@theme` block in `src/index.css` and are available as utilities (`bg-surface`,
`text-muted`, `border-line`, `bg-accent`), flipping to a dark palette automatically.

## Run

```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build — must pass before review
npm run lint     # eslint, incl. react-hooks rules
```

## How it works

- `TASKS.md` — the task ladder, checkboxes and scores.
- `REVIEWS.md` — written review per attempt.
- `src/tasks/NN-name/index.tsx` — one folder per task.
- `src/tasks/registry.ts` — register each task so it appears in the sidebar.

## Adding a task

```ts
// src/tasks/registry.ts
import Counter from './01-counter'

export const tasks: Task[] = [
  { id: '01', title: 'Counter', level: 1, Component: Counter },
]
```

## Rules

- No AI assistance while the timer runs.
- No new npm dependencies unless the spec says so.
- `npm run build` and `npm run lint` must pass before asking for review.
