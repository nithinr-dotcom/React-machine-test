import { useState, type ChangeEvent, type SubmitEvent } from "react";
interface Todo {
  id: string;
  task: string;
  completed: boolean;
}
const FILTER = ["all", "done", "active"] as const;

type Filter = (typeof FILTER)[number];

const matches = (todo: Todo, filter: Filter) =>
  filter === "all" || (filter === "done" ? todo.completed : !todo.completed);
export default function Learning() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  //text change handler
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //add todo handler
  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), task: text, completed: false },
    ]);
    setText("");
  };
  //change filter handler
  const changeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Filter);
  };
  const visible = todos.filter((todo) => matches(todo, filter));
  //delete handler
  const deleteHandler = (id: string) =>
    setTodos(todos.filter((v) => v.id !== id));
  //toggle handler
  const toggleHandler = (id: string) =>
    setTodos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, completed: !v.completed } : v)),
    );

  console.log({ todos });
  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" value={text} onChange={changeText} />
        <button>Add Todo</button>
      </form>
      <div>
        <select onChange={changeFilter} value={filter}>
          {FILTER.map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>
      </div>
      <div>
        {visible.map((val) => (
          <div key={val.id} className="flex gap-5 border justify-between">
            <div>{val.task}</div>
            <input
              type="checkbox"
              checked={val.completed}
              onChange={() => toggleHandler(val.id)}
            />
            <button onClick={() => deleteHandler(val.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
