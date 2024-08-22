import Head from 'next/head';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="container mx-auto p-4 rounded-t-lg mt-2 bg-white">
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="A simple to-do list app with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TodoList />
      </main>
    </div>
  );
}