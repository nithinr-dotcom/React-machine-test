import Learning from "./00-learning";
import Counter from "./01-counter";
import Todo from "./02-todo";
import Accordion from "./03-accordion";
import AsyncSearch from "./04-async-search";
import FormValidation from "./05-form-validation";
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

  {
    id: "03",
    title: "Accordion",
    level: 1,
    Component: Accordion,
  },
  {
    id: "04",
    title: "Async search (typeahead)",
    level: 2,
    Component: AsyncSearch,
  },
  {
    id: "05",
    title: "Sign-up form with validation",
    level: 2,
    Component: FormValidation,
  },
];
