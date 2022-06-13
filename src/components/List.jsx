import { ACTIONS } from "../App";
import "../styles.css";

import { useEffect, useState } from "react";
const List = ({ list, dispatch }) => {
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const handleEdit = (todo) => {
    setEdit(todo);
    setEditText(todo.name);
    if (editText) {
      dispatch({
        type: ACTIONS.EDIT_TODO,
        payload: { id: edit.id, text: editText }
      });
      setEdit(null);
      setEditText("");
    }
  };
  useEffect(() => {
    if (edit) {
      setEditText(edit.name);
    } else {
      setEditText("");
    }
  }, [edit, setEditText]);

  return (
    <div className="main">
      {list.map((todo) => (
        <div className="list" key={todo.id}>
          {edit !== todo ? (
            <span
              className="todo"
              style={{
                textDecoration: todo.completed ? "none" : "line-through"
              }}
            >
              {todo.name}
            </span>
          ) : (
            <input
              className="todo todo-input"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              type="text"
            />
          )}
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.COMPLETED_TODO,
                payload: { id: todo.id }
              })
            }
          >
            Checked
          </button>
          <button onClick={() => handleEdit(todo)}>
            {edit !== todo ? "Edit" : "Save"}
          </button>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default List;
