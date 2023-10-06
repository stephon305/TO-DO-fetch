import React, { useState, useEffect } from "react";


import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [task, setTask] = useState({});
  const [count, setCount] = useState(2);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/stephon")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/stephon", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then((error) => {
        console.log(error);
      });
  }, [todos]);

  const addTodos = (e) => {
    if (e.key === "Enter") {
      
      const newTask = { label: userInput, id: count, done: false };
      
     
      setTask(newTask);
      
     
      setTodos([...todos, newTask]);
      
      
      setUserInput("");
      
      
      setCount(count + 1);
    }
  };
  

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  
  const removeTodos = (i) => {
    const newArray = todos.filter((todo, index) => index !== i);
    setTodos(newArray);
  };

  return (
    <div className="text-center todoList">
      <input
        onChange={handleUserInput}
        value={userInput + " "}
        onKeyDown={(e) => addTodos(e)}
        className="my-2"
      />
      <ul className="w-25 mx-auto">
        {/* todos.length ? todos.map() : null */}
        {todos?.map((todo, index) => (
          <li className="mx-3" key={index}>
            {todo.label}
            <span>
              <i
                className="fa-solid fa fa-trash fa-bounce mx-4"
                onClick={() => removeTodos(index)}
              ></i>
            </span>
            {console.log(todo)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;