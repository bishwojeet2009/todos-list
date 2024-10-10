import { useState } from "react";
import useTodo from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (todo != "") {
      addTodo(todo);
      setTodo("");
    }
  }
  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <input
        type="text"
        className="mb-2 p-2 addTaskInp"
        placeholder="Enter new Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="bg-dark text-white p-1 addTask">Add Task</button>
    </form>
  );
}

export default TodoForm;
