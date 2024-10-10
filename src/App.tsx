import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./contexts/TodoContext";
import { Todo } from "./interface";
import TodoItem from "./components/TodoItem";
import Filter from "./components/Filter";

function App() {
  const [todosHistory, setTodoHistory] = useState<Todo[][]>(
    getLocalStorage().length > 0 ? [getLocalStorage()] : [[]]
  );
  const [todoList, setTododList] = useState<Todo[]>(getLocalStorage());
  const [filterValue, setFilterValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [_undoTimes, setUndoTimes] = useState(0);

  function addTodo(todo: string) {
    setTododList((prev) => {
      let newTodoList = [
        { id: Date.now(), text: todo, complete: false },
        ...prev,
      ];
      //For Undo
      setTodoHistory((prev) => [newTodoList, ...prev.slice(0, 3)]);
      setUndoTimes(0);

      return newTodoList;
    });
  }

  function deleteTodo(id: number) {
    setTododList((prev) => {
      let newTodoList = prev.filter((todo) => todo.id != id);
      //For Undo
      setTodoHistory((prev) => [newTodoList, ...prev.slice(0, 3)]);
      setUndoTimes(0);

      return newTodoList;
    });
  }

  function toggleTodo(id: number) {
    setTododList((prev) => {
      let newTodoList = prev.map((todo) =>
        todo.id == id ? { ...todo, complete: !todo.complete } : todo
      );
      setTodoHistory((prev) => [newTodoList, ...prev.slice(0, 3)]);
      setUndoTimes(0);
      return newTodoList;
    });
  }

  function updateTodo(id: number, text: string) {
    setTododList((prev) => {
      let newTodoList = prev.map((todo) =>
        todo.id == id ? { ...todo, text: text } : todo
      );
      setTodoHistory((prev) => [newTodoList, ...prev.slice(0, 3)]);
      setUndoTimes(0);

      return newTodoList;
    });
  }

  function filter(value: string) {
    setFilterValue(value);
  }

  function search(value: string) {
    setSearchValue(value);
  }

  function setLocalStorage() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
  }

  function getLocalStorage() {
    let todoList = localStorage.getItem("todolist");
    if (todoList) {
      return JSON.parse(todoList);
    }
    return [];
  }

  function handleUndo() {
    setUndoTimes((prev) => {
      let newUndoTime =
        prev + 1 < todosHistory.length - 1 ? prev + 1 : todosHistory.length - 1;
      setTododList(todosHistory[newUndoTime]);
      return newUndoTime;
    });
  }

  function handleRedo() {
    setUndoTimes((prev) => {
      let newUndoTime = prev - 1 > 0 ? prev - 1 : 0;
      setTododList(todosHistory[newUndoTime]);
      return newUndoTime;
    });
  }

  useEffect(setLocalStorage, [todoList]);

  return (
    <TodoProvider
      value={{
        todoList,
        filterValue,
        searchValue,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        filter,
        search,
      }}>
      <div className="main">
        <div className="container px-md-4">
          <h2 className="text-center py-3 heading">Today Todos</h2>
          <Filter />
          <div className="my-4">
            {todoList
              .filter((todo) => {
                let matchSearch =
                  searchValue == "" ||
                  todo.text.toLowerCase().includes(searchValue.toLowerCase());
                let matchFilter =
                  filterValue == "all" ||
                  (filterValue == "completed" && todo.complete) ||
                  (filterValue == "incomplete" && !todo.complete);
                return matchFilter && matchSearch;
              })
              .map((todo) => {
                return <TodoItem key={todo.id} todo={todo} />;
              })}
          </div>
          <TodoForm />
          <div className="py-4">
            <button className="undoBtn" onClick={handleUndo}>
              <img src="/assets/image/undo.png" width="30px" alt="Undo" />
            </button>
            <button className="undoBtn ml-3" onClick={handleRedo}>
              <img src="/assets/image/redo.png" width="30px" alt="Redo" />
            </button>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
