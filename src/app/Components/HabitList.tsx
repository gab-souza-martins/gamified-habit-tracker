import React from "react";
import Habit from "../Types/HabitType";
import { FaPlus, FaX } from "react-icons/fa6";

const HabitList = () => {
   const [habits, setHabits] = React.useState<Habit[]>([]);
   const [habitName, setHabitName] = React.useState<string>("");

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("habits");
      const parsed: Habit[] = saved ? JSON.parse(saved) : [];

      const newHabits: Habit[] = parsed.map((i) => {
         if (i.lastCompleted !== new Date().toLocaleDateString()) {
            i.done = false;
         }
         return i;
      });

      setHabits(newHabits);
   }, []);

   const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newHabits: Habit[] = [
         ...habits,
         {
            name: habitName,
            done: false,
            streak: 0,
            highestStreak: 0,
            lastCompleted: "",
            history: [],
         },
      ];
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
      setHabitName("");
   };

   const addCompletion = (
      toChange: string,
      today: string,
      yesterday: string
   ) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.name === toChange && i.lastCompleted !== today) {
            i.history =
               i.lastCompleted === yesterday ? [...i.history, today] : [today];

            i.streak = i.history.length;
            i.highestStreak = i.streak >= i.streak ? i.streak : i.highestStreak;

            i.lastCompleted = i.history[i.history.length - 1];
            i.done = true;
            console.log(`${i.lastCompleted} ${i.history}`); //*Para teste
         }
         return i;
      });
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };

   const removeCompletion = (toChange: string, today: string) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.name === toChange && i.lastCompleted === today) {
            i.history.splice(i.history.length - 1, 1);

            i.lastCompleted =
               i.history.length === 0 ? "" : i.history[i.history.length - 1];

            i.streak = i.history.length;
            i.done = false;
            console.log(`${i.lastCompleted} ${i.history}`); //*Para teste
         }
         return i;
      });
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };

   const handleComplete = (habit: string, isDone: boolean) => {
      const date: Date = new Date();

      const today: string = date.toLocaleDateString();

      const yesterday: Date = date;
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString: string = yesterday.toLocaleDateString();

      if (isDone) {
         addCompletion(habit, today, yesterdayString);
      } else {
         removeCompletion(habit, today);
      }
   };

   const handleRemove = (toRemove: string) => {
      const newHabits: Habit[] = habits.filter((i) => i.name !== toRemove);
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };

   return (
      <>
         <h2 className="text-xl">Hábitos</h2>

         <form className="flex items-center gap-2">
            <input
               onChange={(e) => setHabitName(e.target.value)}
               value={habitName}
               aria-label="Digite o hábito"
               type="text"
               placeholder="Hábito"
               className="border rounded-md p-1"
            />

            <button
               onClick={handleAdd}
               aria-label="Adicionar hábito"
               className="cursor-pointer bg-cyan-300 rounded-md shadow-md p-2"
            >
               <FaPlus />
            </button>
         </form>

         <ul>
            {habits.map((i, index) => (
               <li key={index} className="flex items-center gap-3">
                  <input
                     onChange={(e) => handleComplete(i.name, e.target.checked)}
                     checked={i.done}
                     aria-label="Marcar como concluído"
                     type="checkbox"
                  />

                  <span
                     className={`${i.done ? "text-gray-400 line-through" : ""}`}
                  >
                     {i.name}
                  </span>
                  <span className="text-gray-500">
                     Sequência atual: {i.streak}
                  </span>
                  <span className="text-gray-500">
                     Maior sequência: {i.highestStreak}
                  </span>

                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        handleRemove(i.name);
                     }}
                     aria-label="Remover hábito"
                     className="cursor-pointer p-2"
                  >
                     <FaX />
                  </button>
               </li>
            ))}
         </ul>
      </>
   );
};

export default HabitList;
