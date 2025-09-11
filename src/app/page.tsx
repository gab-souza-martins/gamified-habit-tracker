"use client";
import React from "react";
import HabitList from "./Components/HabitList";
import RemoveAllItems from "./Components/RemoveAllItems";
import TodoList from "./Components/TodoList";
import UserStats from "./Components/UserStats";

const Home = () => {
   const [currentExp, setCurrentExp] = React.useState<number>(0);

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("exp");
      const parsed: number = saved ? JSON.parse(saved) : 0;
      setCurrentExp(parsed);
   }, []);

   const handleIncreaseExp = (exp: number) => {
      const newExp: number = currentExp + exp;
      setCurrentExp(newExp);
      localStorage.setItem("exp", JSON.stringify(newExp));
   };
   const handleDecreaseExp = (exp: number) => {
      const newExp: number = currentExp - exp;
      setCurrentExp(newExp);
      localStorage.setItem("exp", JSON.stringify(newExp));
   };

   return (
      <>
         <h1 className="text-3xl font-bold">Quest Tracker</h1>
         <RemoveAllItems />
         <br />
         <UserStats exp={currentExp} />
         <br />
         <HabitList />
         <TodoList
            increaseExp={handleIncreaseExp}
            decreaseExp={handleDecreaseExp}
         />
      </>
   );
};

export default Home;
