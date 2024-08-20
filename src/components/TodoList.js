"use client";

import { useState, useEffect } from 'react';

const TodoList = () => {
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
  const [isFlutterInAppWebViewReady, setFlutterInAppWebViewReady] = useState(false);
  const [paymentData, setPaymentData] = useState();
  
  const updateHeight = () => {
    window?.flutter_inappwebview?.callHandler('Properties').then(res => {
      setPaymentData(res);
    })
  };

  const handleEvent = () => {
    setFlutterInAppWebViewReady(true)
    updateHeight();
  }
  useEffect(() => {
    window?.addEventListener("flutterInAppWebViewPlatformReady", handleEvent);
    
    return () => {
      window?.removeEventListener("flutterInAppWebViewPlatformReady", () => {
        setFlutterInAppWebViewReady(false);
      });
    };
  }, []);

  // useEffect(() => {
  //   window?.flutter_inappwebview?.callHandler('Properties').then(res => {
  //     setPaymentData(res);
  //   })
  // }, [isFlutterInAppWebViewReady]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div id="methodWrapper" className="p-4 flex flex-col">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
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

      <button
        className="mb-4 mt-6 px-4 py-2 bg-purple-500 text-white rounded"
      >
        Bayar
      </button>
      {`${paymentData ? paymentData : ''}`}
    </div>
  );
};

export default TodoList;