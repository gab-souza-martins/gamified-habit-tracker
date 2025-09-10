"use client";
import HabitList from "./Components/HabitList";
import RemoveAllItems from "./Components/RemoveAllItems";
import TodoList from "./Components/TodoList";

const Home = () => {
   return (
      <>
         <h1 className="text-3xl font-bold">Quest Tracker</h1>
         <RemoveAllItems />
         <br />
         <HabitList />
         <TodoList />
      </>
   );
};

export default Home;
