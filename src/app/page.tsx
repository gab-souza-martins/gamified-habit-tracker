"use client";
import ConfirmRemove from "./Components/ConfirmRemove";
import HabitList from "./Components/HabitList";
import TodoList from "./Components/TodoList";

const Home = () => {
   return (
      <>
         <ConfirmRemove
            confirmRemove={function (): void {
               throw new Error("Function not implemented.");
            }}
            closeRemove={function (): void {
               throw new Error("Function not implemented.");
            }}
         />

         <h1 className="text-3xl font-bold">Quest Tracker</h1>

         <HabitList />
         <TodoList />
      </>
   );
};

export default Home;
