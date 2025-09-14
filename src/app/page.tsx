"use client";
import React from "react";
import HabitList from "./Components/HabitList";
import RemoveAllItems from "./Components/RemoveAllItems";
import TodoList from "./Components/TodoList";
import UserStats from "./Components/UserStats";
import ResetStats from "./Components/ResetStats";
import Stats from "./Types/StatsType";
import AttributeName from "./Types/AttributeNameType";
import Shop from "./Components/Shop";
import BuyingError from "./Components/BuyingError";

const Home = () => {
   const [currentStats, setCurrentStats] = React.useState<Stats>({
      body: { level: 1, exp: 0, expToNextLevel: 10 },
      mind: { level: 1, exp: 0, expToNextLevel: 10 },
      spirit: { level: 1, exp: 0, expToNextLevel: 10 },
      coins: 0,
   });

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("stats");
      const parsed: Stats = saved
         ? JSON.parse(saved)
         : {
              body: { level: 1, exp: 0, expToNextLevel: 10 },
              mind: { level: 1, exp: 0, expToNextLevel: 10 },
              spirit: { level: 1, exp: 0, expToNextLevel: 10 },
              coins: 0,
           };
      setCurrentStats(parsed);
   }, []);

   const handleGiveReward = (attribute: AttributeName, reward: number) => {
      let newLevel: number = currentStats[attribute].level;
      let newExpToNextLevel: number = currentStats[attribute].expToNextLevel;
      let newExp: number = currentStats[attribute].exp + reward;

      if (newExp >= newExpToNextLevel) {
         newLevel += 1;
         newExp -= newExpToNextLevel;

         if (newExpToNextLevel < 100) {
            newExpToNextLevel += 5;
         }
      }

      const newCoins: number = currentStats.coins + reward;

      const newStats: Stats = {
         ...currentStats,
         [attribute]: {
            level: newLevel,
            exp: newExp,
            expToNextLevel: newExpToNextLevel,
         },
         coins: newCoins,
      };
      setCurrentStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
   };

   const handleRemoveReward = (attribute: AttributeName, reward: number) => {
      const newLevel: number = currentStats[attribute].level; // *Aqui para consertar bug
      const newExpToNextLevel: number = currentStats[attribute].expToNextLevel; // *Aqui para consertar bug

      const newExp: number = currentStats[attribute].exp - reward;
      const newCoins: number = currentStats.coins - reward;

      const newStats: Stats = {
         ...currentStats,
         [attribute]: {
            level: newLevel,
            exp: newExp >= 0 ? newExp : 0,
            expToNextLevel: newExpToNextLevel,
         },
         coins: newCoins >= 0 ? newCoins : 0,
      };
      setCurrentStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
   };

   const [isBuyingErrorOpen, setIsBuyingErrorOpen] =
      React.useState<boolean>(false);

   const handleBuyItem = (cost: number) => {
      if (currentStats.coins >= cost) {
         const newCoins: number = currentStats.coins - cost;
         const newStats: Stats = {
            ...currentStats,
            coins: newCoins,
         };
         setCurrentStats(newStats);
         localStorage.setItem("stats", JSON.stringify(newStats));
      } else {
         setIsBuyingErrorOpen(true);
      }
   };

   const handleCloseModals = () => {
      setIsBuyingErrorOpen(false);
   };

   return (
      <>
         {isBuyingErrorOpen && <BuyingError closeError={handleCloseModals} />}

         <h1 className="text-3xl font-bold">Quest Tracker</h1>
         <RemoveAllItems />
         <ResetStats />
         <br />
         <UserStats stats={currentStats} />
         <br />
         <Shop buyItem={handleBuyItem} />
         <HabitList
            giveReward={handleGiveReward}
            removeReward={handleRemoveReward}
         />
         <TodoList
            giveReward={handleGiveReward}
            removeReward={handleRemoveReward}
         />
      </>
   );
};

export default Home;
