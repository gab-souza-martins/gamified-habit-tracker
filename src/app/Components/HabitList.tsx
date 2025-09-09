import React from "react";
import Habit from "../Types/HabitType";

const HabitList = () => {
   const [habits, setHabits] = React.useState<Habit[]>([]);
   const [habitName, setHabitName] = React.useState<string>("");

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("habits");
      const parsed: Habit[] = saved ? JSON.parse(saved) : [];
      setHabits(parsed);
   }, []);

   return (
      <>
         <h2 className="text-xl">Hábitos</h2>
      </>
   );
};

export default HabitList;
