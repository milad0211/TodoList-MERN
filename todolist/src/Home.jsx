import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import "./App.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdite = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => {
          return (
            <div className="task" key={index}>
              <div className="checkbox" onClick={() => handleEdite(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span>
                  <BsFillTrashFill
                    className="icon"
                    onClick={() => handleDelete(todo._id)}
                  />
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
