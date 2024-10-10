import { useState } from "react";
import { Todo } from "../interface";
import useTodo from "../contexts/TodoContext";
function TodoItem({ todo }: { todo: Todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const { deleteTodo, toggleTodo, updateTodo } = useTodo();
  const [isEditable, setIsEditable] = useState(false);

  function updateTodoList() {
    setIsEditable(false);
    updateTodo(todo.id, todoMsg);
  }

  return (
    <div
      className={`d-flex justify-content-between mb-2 py-2 px-3 todoItem  ${
        todo.complete ? "completed" : ""
      }`}>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => {
          toggleTodo(todo.id);
          setIsEditable(false);
        }}
      />
      {isEditable ? (
        <input
          type="text"
          className="flex-grow-1 ml-2 mr-3 editTodo"
          readOnly={!isEditable}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
      ) : (
        <h5
          className={`flex-grow-1 py-0 px-2 todoText mb-0 ${
            todo.complete ? "lineThrough" : ""
          }`}>
          {todoMsg}
        </h5>
      )}

      <div className="d-flex align-items-center">
        {isEditable ? (
          <img
            src="/assets/image/upload.png"
            className="update"
            alt="update"
            width="20px"
            height="20px"
            onClick={updateTodoList}
          />
        ) : (
          <img
            src="/assets/image/Edit.png"
            className="edit"
            alt="Edit"
            width="20px"
            height="20px"
            onClick={() => {
              if (todo.complete) {
                return;
              } else {
                setIsEditable(true);
              }
            }}
          />
        )}
        <img
          src="/assets/image/cross.png"
          width="20px"
          height="20px"
          className="delete ml-3"
          onClick={() => deleteTodo(todo.id)}
          alt="Delete"
        />
      </div>
    </div>
  );
}

export default TodoItem;
