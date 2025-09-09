import React from "react";
import Habit from "../Types/HabitType";
import { FaPlus, FaX } from "react-icons/fa6";

const HabitList = () => {
   const [habits, setHabits] = React.useState<Habit[]>([]);
   const [habitName, setHabitName] = React.useState<string>("");

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("habits");
      const parsed: Habit[] = saved ? JSON.parse(saved) : [];
      setHabits(parsed);
   }, []);

   const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newHabits: Habit[] = [
         ...habits,
         { name: habitName, streak: 0, lastCompleted: null, history: [] },
      ];
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
      setHabitName("");
   };

   const handleComplete = (toChange: string) => {
      const date: Date = new Date();

      const today: string = date.toLocaleDateString();

      const yesterday: Date = date;
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString: string = yesterday.toLocaleDateString();

      const newHabits: Habit[] = habits.map((i) => {
         if (i.name === toChange && i.lastCompleted !== today) {
            if (i.lastCompleted === yesterdayString) {
               i.streak += 1;
            } else {
               i.streak = 1;
            }
            i.lastCompleted = today;
            i.history = [...i.history, i.lastCompleted];
            console.log(`${i.lastCompleted} ${i.history} ${i.streak}`);
         }
         return i;
      });

      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
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
               <li key={index} className={`flex items-center gap-3`}>
                  <input
                     onChange={() => handleComplete(i.name)}
                     aria-label="Marcar como concluído"
                     type="checkbox"
                  />

                  <span>{i.name}</span>

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
