"use client";

// import { useState, useEffect } from 'react';

// const TodoList = () => {
//   const [todos, setTodos] = useState([
//     { id: 1, text: 'Wallet', completed: false },
//     { id: 2, text: 'Paylater', completed: false },
//     { id: 3, text: 'Pinjam Teman', completed: false },
//     { id: 4, text: 'Pinjam Teman A', completed: false },
//     { id: 5, text: 'Pinjam Teman B', completed: false },
//     { id: 6, text: 'Pinjam Teman C', completed: false },
//     { id: 7, text: 'Pinjam Teman D', completed: false },
//   ]);

//   const [isVisible, setIsVisible] = useState(false);
//   const [isFlutterInAppWebViewReady, setFlutterInAppWebViewReady] = useState(false);
//   const [paymentData, setPaymentData] = useState();
//   const [isLunas, setLunas] = useState(false);
  
//   // const submitHandler = () => {
//   //   if(isFlutterInAppWebViewReady) window?.flutter_inappwebview?.callHandler('Submitted', {...paymentData, lunas: true});
//   //   setLunas(prevState => !prevState);
//   // }

//   // useEffect(() => {
//   //   window?.addEventListener("flutterInAppWebViewPlatformReady", () => {
//   //     window?.flutter_inappwebview?.callHandler('Submitted')
//   //       .then((result) => {
//   //         setPaymentData(JSON.stringify(result));
//   //         setFlutterInAppWebViewReady(true);
//   //       });
//   //   });
    
//   //   return () => {
//   //     window?.removeEventListener("flutterInAppWebViewPlatformReady", () => {
//   //       setFlutterInAppWebViewReady(false);
//   //     });
//   //   };
//   // }, []);

//   // const toggleTodo = (id) => {
//   //   setTodos(
//   //     todos.map(todo =>
//   //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//   //     )
//   //   );
//   // };

//   // useEffect(() => {
    
//   // }, [])

//   return (
//     <div id="methodWrapper" className="p-4 flex flex-col">
//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
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

//       <button
//         className="mb-4 mt-6 px-4 py-2 bg-purple-500 text-white rounded"
//         onClick={handleSubmit1}
//       >
//         {isLunas ? 'Lunas' : 'Bayar'}
//       </button>
//       <div className="mb-4 mt-6 px-4 py-2 rounded">{paymentData}</div>
//     </div>
//   );
// };

// export default TodoList;

import { useState, useEffect } from 'react';

export default function Home() {
  const [flutterData, setFlutterData] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(null);

  useEffect(() => {
    // Define the function to receive data from Flutter
    window.receiveDataFromFlutter = function(data) {
      console.log("Data received from Flutter:", data);
      setFlutterData(data); // Store the data in state
    };

    // Define the function to handle approval status from Flutter
    window.handleApproval = function(approvalMessage) {
      const parsedMessage = JSON.parse(approvalMessage);
      setApprovalStatus(parsedMessage.status);
      console.log("Received approval status from Flutter:", parsedMessage);
    };
  }, []);

  const handleButtonClick = () => {
    if (flutterData) {
      // Modify the data and send it back to Flutter
      const modifiedData = `${flutterData} - Modified by WebView on Button Click`;
      console.log("Sending modified data back to Flutter:", modifiedData);
      window.FlutterChannel.postMessage(modifiedData);
    }
  };

  return (
    <div>
      <h1>WebView Example</h1>
      <p>This is a sample page to demonstrate WebView communication.</p>
      <button onClick={handleButtonClick}>Send Modified Data to Flutter</button>
      {approvalStatus && <p>Data approval status: {approvalStatus}</p>}
    </div>
  );
}