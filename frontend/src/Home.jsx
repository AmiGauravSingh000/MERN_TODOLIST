import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillTrashFill,
  BsCheckCircleFill,
  BsMoonFill,
  BsSunFill,
} from "react-icons/bs";
import "./App.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };

  const handleAdd = (task) => {
    axios
      .post("http://localhost:3000/add", { task })
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`main-container ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <h2 className="main-heading">ToDo List</h2>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
        </button>
      </div>
      <Create handleAdd={handleAdd} />
      {todos.length === 0 ? (
        <div className="todos">
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            className={`todo-item ${darkMode ? "dark" : "light"}`}
            key={todo._id}
          >
            <div className="checkbox">
              {todo.done ? (
                <BsCheckCircleFill
                  className="icon"
                  onClick={() => handleEdit(todo._id)}
                />
              ) : (
                <BsCircleFill
                  className="icon"
                  onClick={() => handleEdit(todo._id)}
                />
              )}
              <p className={todo.done ? "completed" : ""}>{todo.task}</p>
            </div>
            <BsFillTrashFill
              className="icon trash-icon"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
