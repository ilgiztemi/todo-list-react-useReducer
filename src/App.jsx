import { nanoid } from "nanoid";
import { useReducer, useState } from "react";
import Input from "./components/Input";
import List from "./components/List";
import "./styles.css";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  COMPLETED_TODO: "completed_todo",
  DELETE_TODO: "delete_todo",
  EDIT_TODO: "edit_todo"
};

export const reducer = (list, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [newTodo(action.payload.name), ...list];
    case ACTIONS.COMPLETED_TODO:
      return list.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, completed: !el.completed };
        }
        return el;
      });
    case ACTIONS.DELETE_TODO:
      return list.filter((el) => el.id !== action.payload.id);
    case ACTIONS.EDIT_TODO:
      return handleEdit(list, action.payload.text, action.payload.id);
    default:
      return list;
  }
};
const handleEdit = (list, text, id) => {
  return [...list].map((el) => {
    if (el.id === id) {
      return { ...el, name: text };
    }
    return el;
  });
};
const newTodo = (name) => {
  return { id: nanoid(), name: name, completed: false };
};

export default function App() {
  const [list, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  return (
    <div className="App">
      <Input name={name} setName={setName} dispatch={dispatch} />
      <List dispatch={dispatch} list={list} />
    </div>
  );
}
