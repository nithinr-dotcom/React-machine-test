import { useState } from 'react'

// Every todo carries its own identity. This is the single most important decision in the
// file: without an `id`, you are forced to address items by array index, and index breaks
// the moment the rendered list is a *filtered* view of the stored list.
interface Todo {
  id: string
  text: string
  done: boolean
}

const FILTERS = ['all', 'active', 'done'] as const

// `typeof FILTERS[number]` derives the union 'all' | 'active' | 'done' from the array, so
// the tab list and the type can never drift apart.
type Filter = (typeof FILTERS)[number]

const matches = (todo: Todo, filter: Filter) =>
  filter === 'all' || (filter === 'done' ? todo.done : !todo.done)

export default function Todo() {
  // Two pieces of *source* state, and nothing else. The visible list and the active count
  // are computed below on every render — storing them would mean keeping them in sync.
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  // The raw text the user typed, echoed back verbatim. Trimming here would swallow the
  // space between words on every keystroke.
  const [text, setText] = useState('')

  // Derived, not stored. Re-computed from `todos` and `filter` each render, so it is
  // impossible for it to be stale.
  const visible = todos.filter((todo) => matches(todo, filter))
  const activeCount = todos.filter((todo) => !todo.done).length

  const add = (e: React.FormEvent) => {
    e.preventDefault()

    // Trim at submit — the one place it belongs.
    const trimmed = text.trim()
    if (trimmed === '') return // rejected: input is deliberately left untouched

    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, done: false }])
    setText('')
  }

  // Address by id, never by index. Each update builds a new array, and a new object for
  // the item that changed, leaving every other object reference untouched.
  const toggle = (id: string) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    )

  const remove = (id: string) => setTodos((prev) => prev.filter((todo) => todo.id !== id))

  const clearCompleted = () => setTodos((prev) => prev.filter((todo) => !todo.done))

  return (
    <div>
      {/* A real <form> gives Enter-to-submit for free — no keydown handler needed. */}
      <form onSubmit={add}>
        <label htmlFor="new-todo">New todo </label>
        <input
          id="new-todo"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={text.trim() === ''}>
          Add
        </button>
      </form>

      <div>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
            disabled={f === filter}
          >
            {f}
          </button>
        ))}
      </div>

      {/* The two empty states are genuinely different situations. */}
      {todos.length === 0 ? (
        <p>Nothing here yet — add your first todo above.</p>
      ) : visible.length === 0 ? (
        <p>No {filter} todos.</p>
      ) : (
        <ul>
          {visible.map((todo) => (
            // Keyed by id, so two todos with identical text are still distinct to React.
            <li key={todo.id}>
              <label>
                {/* Controlled: `checked` is driven by state, not left to the DOM. */}
                <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
                <span style={todo.done ? { textDecoration: 'line-through' } : undefined}>
                  {todo.text}
                </span>
              </label>
              <button type="button" onClick={() => remove(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </p>

      <button
        type="button"
        onClick={clearCompleted}
        disabled={todos.length === activeCount}
      >
        Clear completed
      </button>
    </div>
  )
}
