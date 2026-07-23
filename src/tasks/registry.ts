import Learning from "./00-learning";
import Counter from "./01-counter";
import Todo from "./02-todo";
import type { Task } from "./types";

// Add one entry per task as you finish it, e.g.
//   import Counter from './01-counter'
//   { id: '01', title: 'Counter with step control', level: 1, Component: Counter },

export const tasks: Task[] = [
  {
    id: "00",
    title: "Testing board (untimed practice)",
    level: 0,
    Component: Learning,
  },
  {
    id: "01",
    title: "Counter with step control",
    level: 1,
    Component: Counter,
  },
  { id: "02", title: "Todo list", level: 1, Component: Todo },
];
