# 02 · Todo list — attempt 1 (3/10)

Preserved for comparison against `index.tsx`. See `REVIEWS.md` for the full review.
Kept as markdown rather than `.tsx` so it stays out of the build and lint gates.

```tsx
import { useEffect, useState, type ChangeEvent } from "react";
type Status = "pending" | "completed";
interface Todo {
  task: string;
  status: Status;
}
const emptyTodo: Todo = { task: "", status: "pending" };
export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToAdd, setTodoToAdd] = useState<Todo>(emptyTodo);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter,setFilter]=useState("all")
  console.log({ todos, filteredTodos });
  //add todo handler
  const todoAddHandler = () => {
    if (todoToAdd.task.trim() !== "") setTodos((prev) => [...prev, todoToAdd]);
    setTodoToAdd(emptyTodo);
    return;
  };
  //todo input change handler
  const todoChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") return;
    setTodoToAdd({ task: e.target.value.trim(), status: "pending" });
  };
  //complete handler
  const completeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const updatedTodos = todos.map((v, id) => {
      if (id === idx) {
        if (e.target.checked) v.status = "completed";
        else v.status = "pending";
        return v;
      } else {
        return v;
      }
    });
    setTodos(updatedTodos);
  };
  //delete handler
  const deleteHandler = (idx: number) => {
    const updatedTodos = todos.filter((_, id) => id != idx);
    setTodos(updatedTodos);
  };

  //filter handler
  const filterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  };
  useEffect(() => {
    const upatedTodo = filter === "all" ? todos : filter === "open" ? todos.filter(v => v.status !== "completed") : todos.filter(v => v.status === "completed")
    console.log({upatedTodo})
    setFilteredTodos(upatedTodo)
  },[filter])
  return (
    <div>
      <p>
        <select onChange={filterHandler}>
          <option value={"all"}>all</option>
          <option value={"completed"}>completed</option>
          <option value={"open"}>open</option>
        </select>
      </p>
      <input type="text" value={todoToAdd.task} onChange={todoChangeHandler} />
      <button onClick={todoAddHandler}>Add</button>
      <div>
        <label>Todo List</label>
        <ul>
          {filteredTodos.map((t, i) => (
            <li
              key={t.task}
              style={{
                display: "flex",
                gap: "20px",
                border: "5px",
                ...(t.status === "completed" && {
                  textDecoration: "line-through",
                }),
              }}
            >
              <p>{t.task}</p>
              <p>{t.status}</p>
              <p>
                <label>mark completed</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    completeHandler(e, i)
                  }
                  type="checkbox"
                />
              </p>
              <button onClick={() => deleteHandler(i)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```
