"use client";

import React, { useEffect, useState } from "react";

const Promo = () => {
  // const [task, setTask] = useState("");
  // const [tasks, setTasks] = useState([]);

  const [todos, setTodos] = useState([
    { id: 1, text: 'Wallet', completed: false },
    { id: 2, text: 'Paylater', completed: false },
    { id: 3, text: 'Pinjam Teman', completed: false },
    { id: 4, text: 'Pinjam Teman A', completed: false },
    { id: 5, text: 'Pinjam Teman B', completed: false },
    { id: 6, text: 'Pinjam Teman C', completed: false },
    { id: 7, text: 'Pinjam Teman D', completed: false },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  // const handleAddTask = () => {
  //   if (task.trim()) {
  //     setTasks([...tasks, { text: task, completed: false }]);
  //     setTask("");
  //   }
  // };

  // const handleDeleteTask = (index) => {
  //   setTasks(tasks.filter((_, i) => i !== index));
  // };

  // const handleToggleComplete = (index) => {
  //   setTasks(
  //     tasks.map((task, i) =>
  //       i === index ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  useEffect(() => {
    window?.flutter_inappwebview?.callHandler('Properties', `{"height": ${window?.document?.documentElement?.offsetHeight}}`);
  }, [isVisible])

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div id="methodWrapper" className="flex flex-col">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-4 px-4 py-2 bg-blue-500 rounded"
      >
        {isVisible ? 'Hide' : 'Show'} Method
      </button>

      {isVisible && (
        <ul className="list-disc pl-5">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Promo;