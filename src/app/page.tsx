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
      body: { level: 1, exp: 0, expToNextLevel: 10 },
      mind: { level: 1, exp: 0, expToNextLevel: 10 },
      spirit: { level: 1, exp: 0, expToNextLevel: 10 },
   });

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("stats");
      const parsed: Stats = saved
         ? JSON.parse(saved)
         : {
              body: { level: 1, exp: 0, expToNextLevel: 10 },
              mind: { level: 1, exp: 0, expToNextLevel: 10 },
              spirit: { level: 1, exp: 0, expToNextLevel: 10 },
           };
      setCurrentStats(parsed);
   }, []);

   const handleIncreaseExp = (
      attribute: "body" | "mind" | "spirit",
      exp: number
   ) => {
      let newLevel: number = currentStats[attribute].level;
      let newExpToNextLevel: number = currentStats[attribute].expToNextLevel;
      let newExp: number = currentStats[attribute].exp + exp;

      if (newExp >= newExpToNextLevel) {
         newLevel += 1;
         newExp -= newExpToNextLevel;

         if (newExpToNextLevel < 50) {
            newExpToNextLevel += 5;
         }
      }

      const newStats: Stats = {
         ...currentStats,
         [attribute]: {
            level: newLevel,
            exp: newExp,
            expToNextLevel: newExpToNextLevel,
         },
      };
      setCurrentStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
   };

   const handleDecreaseExp = (
      attribute: "body" | "mind" | "spirit",
      exp: number
   ) => {
      const newLevel: number = currentStats[attribute].level; // *Aqui para consertar bug
      const newExpToNextLevel: number = currentStats[attribute].expToNextLevel; // *Aqui para consertar bug

      const newExp: number = currentStats[attribute].exp - exp;

      const newStats: Stats = {
         ...currentStats,
         [attribute]: {
            level: newLevel,
            exp: newExp >= 0 ? newExp : 0,
            expToNextLevel: newExpToNextLevel,
         },
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
