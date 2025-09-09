"use client";
import TodoList from "./Components/TodoList";

const Home = () => {
   return (
      <>
         <h1 className="text-3xl font-bold">Quest Tracker</h1>

         <TodoList />
      </>
   );
};

export default Home;
