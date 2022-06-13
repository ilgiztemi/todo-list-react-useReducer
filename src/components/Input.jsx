import { ACTIONS } from "../App";
import "../styles.css";

const Input = ({ dispatch, setName, name }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    }
    setName("");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>TODO-LIST</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter your todo..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Input;
