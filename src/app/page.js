import Head from 'next/head';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="A simple to-do list app with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
        <TodoList />
      </main>
    </div>
  );
}