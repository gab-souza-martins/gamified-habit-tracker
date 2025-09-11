"use client";
import React from "react";
import HabitList from "./Components/HabitList";
import RemoveAllItems from "./Components/RemoveAllItems";
import TodoList from "./Components/TodoList";
import UserStats from "./Components/UserStats";
import ResetStats from "./Components/ResetStats";
import Stats from "./Types/StatsType";

const Home = () => {
   const [currentStats, setCurrentStats] = React.useState<Stats>({
      level: 1,
      exp: 0,
      expToNextLevel: 10,
   });

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("stats");
      const parsed: Stats = saved
         ? JSON.parse(saved)
         : { level: 1, exp: 0, expToNextLevel: 10 };
      setCurrentStats(parsed);
   }, []);

   const handleIncreaseExp = (exp: number) => {
      let newLevel: number = currentStats.level;
      let newExpToNextLevel: number = currentStats.expToNextLevel;
      let newExp: number = currentStats.exp + exp;

      if (newExp >= newExpToNextLevel) {
         newLevel += 1;
         newExp -= newExpToNextLevel;

         if (newExpToNextLevel < 50) {
            newExpToNextLevel += 5;
         }
      }

      const newStats: Stats = {
         level: newLevel,
         exp: newExp,
         expToNextLevel: newExpToNextLevel,
      };
      setCurrentStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
   };

   const handleDecreaseExp = (exp: number) => {
      const newExp: number = currentStats.exp - exp;
      const newStats: Stats = {
         ...currentStats,
         exp: newExp >= 0 ? newExp : 0,
      };
      setCurrentStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
   };

   return (
      <>
         <h1 className="text-3xl font-bold">Quest Tracker</h1>
         <RemoveAllItems />
         <ResetStats />
         <br />
         <UserStats stats={currentStats} />
         <br />
         <HabitList
            increaseExp={handleIncreaseExp}
            decreaseExp={handleDecreaseExp}
         />
         <TodoList
            increaseExp={handleIncreaseExp}
            decreaseExp={handleDecreaseExp}
         />
      </>
   );
};

export default Home;
