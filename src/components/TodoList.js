"use client";

import { useState, useEffect } from 'react';

const TodoList = () => {
  // const [todos, setTodos] = useState([
  //   { id: 1, text: 'Wallet', completed: false },
  //   { id: 2, text: 'Paylater', completed: false },
  //   { id: 3, text: 'Pinjam Teman', completed: false },
  //   { id: 4, text: 'Pinjam Teman A', completed: false },
  //   { id: 5, text: 'Pinjam Teman B', completed: false },
  //   { id: 6, text: 'Pinjam Teman C', completed: false },
  //   { id: 7, text: 'Pinjam Teman D', completed: false },
  // ]);

  // const [isVisible, setIsVisible] = useState(false);
  const [isFlutterInAppWebViewReady, setFlutterInAppWebViewReady] = useState(false);
  const [paymentData, setPaymentData] = useState();
  const [isLunas, setLunas] = useState(false);
  const [flutterData, setFlutterData] = useState('');
  
  const submitHandler = () => {
    if(isFlutterInAppWebViewReady) window?.flutter_inappwebview?.callHandler('Updated', true);
    setLunas(prevState => !prevState);
  }

  useEffect(() => {
    window?.addEventListener("flutterInAppWebViewPlatformReady", () => {
      window?.flutter_inappwebview?.callHandler('Submitted')
        .then((result) => {
          setPaymentData(JSON.parse(JSON.stringify(result)));
          setFlutterInAppWebViewReady(true);
        });
      window?.flutter_inappwebview?.callHandler('Properties', `{"height": ${window?.document?.documentElement?.offsetHeight}}`);
    });

    window.readFromFlutter = function(event) {
      setFlutterData(event);
    };
    
    return () => {
      window?.removeEventListener("flutterInAppWebViewPlatformReady", () => {
        setFlutterInAppWebViewReady(false);
      });
    };
  }, []);

  // useEffect(() => {
  //   if(isFlutterInAppWebViewReady) window?.flutter_inappwebview?.callHandler('Properties', `{"height": ${window?.document?.documentElement?.offsetHeight}}`);
  // }, [isVisible])

  useEffect(() => {
    if(flutterData){
      setLunas(prevState => !prevState);
    }
  }, [flutterData])

  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map(todo =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  return (
    <div id="methodWrapper" className="flex flex-col">
      <div>Poket</div>
      <button
        className="mb-4 mt-6 px-4 py-2 bg-purple-500 rounded"
        onClick={submitHandler}
      >
        {isLunas ? (
          <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : `Bayar Rp${paymentData?.total_price}`}
      </button>
      <div>{flutterData}</div>
    </div>
  );
};

export default TodoList;

// <button
//         onClick={() => setIsVisible(!isVisible)}
//         className="mb-4 px-4 py-2 bg-blue-500 rounded"
//       >
//         {isVisible ? 'Hide' : 'Show'} Method
//       </button>

//       {isVisible && (
//         <ul className="list-disc pl-5">
//           {todos.map(todo => (
//             <li key={todo.id} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => toggleTodo(todo.id)}
//                 className="mr-2"
//               />
//               <span className={todo.completed ? 'line-through' : ''}>
//                 {todo.text}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}