import React from "react";
import Habit from "../Types/HabitType";
import { FaBrain, FaHandFist, FaHeart, FaX } from "react-icons/fa6";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   useSortable,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit } from "react-icons/fa";
import ConfirmRemove from "./ConfirmRemove";
import ItemForm from "./ItemForm";
import AttributeName from "../Types/AttributeNameType";
import EditValues from "../Types/EditValuesType";
import dateUtils from "../Utils/dateUtils";
import AddBtn from "./Buttons/AddBtn";

interface HabitListProps {
   giveReward: (attribute: AttributeName, reward: number) => void;
   removeReward: (attribute: AttributeName, reward: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ giveReward, removeReward }) => {
   const [habits, setHabits] = React.useState<Habit[]>([]);

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("habits");
      const parsed: Habit[] = saved ? JSON.parse(saved) : [];

      const today = dateUtils.getToday();
      const yesterday = dateUtils.getYesterday();

      const newHabits: Habit[] = parsed.map((i) => {
         if (i.lastCompleted !== today) {
            if (i.lastCompleted !== yesterday) {
               i.streak = 0;
            }
            i.done = false;
         }
         return i;
      });

      setHabits(newHabits);
   }, []);

   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);

   const handleAdd = (
      name: string,
      attribute: AttributeName,
      difficulty: number,
      importance: number
   ) => {
      if (name.trim() !== "") {
         const newHabits: Habit[] = [
            ...habits,
            {
               id: crypto.randomUUID(),
               name: name.trim(),
               attribute: attribute,
               difficulty: difficulty,
               importance: importance,
               done: false,
               streak: 0,
               highestStreak: 0,
               lastCompleted: "",
               history: [],
            },
         ];
         setHabits(newHabits);
         localStorage.setItem("habits", JSON.stringify(newHabits));
      } else {
         console.log("Nenhum input encontrado");
      }
   };

   const SortableItem = ({ i }: { i: Habit }) => {
      const { attributes, listeners, setNodeRef, transform, transition } =
         useSortable({ id: i.id });

      const style = {
         transition,
         transform: CSS.Transform.toString(transform),
      };

      return (
         <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 flex-wrap"
         >
            <div className="flex items-center gap-2">
               <input
                  onChange={(e) => handleComplete(i.id, e.target.checked)}
                  checked={i.done}
                  aria-label="Marcar como concluído"
                  type="checkbox"
               />
               <span
                  {...listeners}
                  className={`cursor-pointer flex items-center gap-2 ${
                     i.done ? "text-gray-400 line-through" : ""
                  }`}
               >
                  {i.attribute === "body" && <FaHandFist />}
                  {i.attribute === "mind" && <FaBrain />}
                  {i.attribute === "spirit" && <FaHeart />}

                  {i.name}
               </span>
            </div>

            <div className="flex items-center gap-2">
               <span className="text-gray-500">Sequência: {i.streak}</span>
               <span className="text-gray-500">
                  Maior sequência: {i.highestStreak}
               </span>
            </div>

            <div className="flex items-center">
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     setEditId(i.id);
                     setEditValues({
                        name: i.name,
                        attribute: i.attribute,
                        difficulty: i.difficulty,
                        importance: i.importance,
                     });
                     setIsEditFormOpen(true);
                  }}
                  aria-label="Editar hábito"
                  className="cursor-pointer p-2"
               >
                  <FaEdit />
               </button>
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     setIdToRemove(i.id);
                     setIsConfirmRemoveOpen(true);
                  }}
                  aria-label="Remover hábito"
                  className="cursor-pointer p-2"
               >
                  <FaX />
               </button>
            </div>
         </div>
      );
   };

   const handleComplete = (habit: string, isDone: boolean) => {
      const today: string = dateUtils.getToday();

      if (isDone) {
         addCompletion(habit, today);
      } else {
         removeCompletion(habit, today);
      }
   };
   const addCompletion = (habit: string, today: string) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.id === habit && i.lastCompleted !== today) {
            i.history = [...i.history, today];

            i.lastCompleted = i.history[i.history.length - 1];

            i.streak += 1;
            i.highestStreak =
               i.streak >= i.highestStreak ? i.streak : i.highestStreak;

            i.done = true;
            giveReward(i.attribute, i.difficulty + i.importance - 1);
         }
         return i;
      });
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };
   const removeCompletion = (habit: string, today: string) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.id === habit && i.lastCompleted === today) {
            i.history.splice(i.history.length - 1, 1);

            i.lastCompleted =
               i.history.length === 0 ? "" : i.history[i.history.length - 1];

            i.streak -= 1;
            i.done = false;
            removeReward(i.attribute, i.difficulty + i.importance - 1);
         }
         return i;
      });
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };

   const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
   const [editId, setEditId] = React.useState<string>("");
   const [editValues, setEditValues] = React.useState<EditValues>();

   const handleEdit = (
      name: string,
      attribute: AttributeName,
      difficulty: number,
      importance: number
   ) => {
      if (name.trim() !== "") {
         const newHabits: Habit[] = habits.map((i) => {
            if (i.id === editId) {
               i.name = name.trim();
               i.attribute = attribute;
               i.difficulty = difficulty;
               i.importance = importance;
            }
            return i;
         });
         setHabits(newHabits);
         localStorage.setItem("habits", JSON.stringify(newHabits));
      }
   };

   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);
   const [idToRemove, setIdToRemove] = React.useState<string>("");

   const handleRemove = () => {
      const newHabits: Habit[] = habits.filter((i) => i.id !== idToRemove);
      setHabits(newHabits);
      localStorage.setItem("habits", JSON.stringify(newHabits));
   };
   const handleCloseModal = () => {
      setIsEditFormOpen(false);
      setIsAddFormOpen(false);
      setIsConfirmRemoveOpen(false);
   };

   return (
      <>
         {isAddFormOpen && (
            <ItemForm
               mode="add"
               onAdd={handleAdd}
               onEdit={handleEdit}
               closeForm={handleCloseModal}
            />
         )}

         {isEditFormOpen && (
            <ItemForm
               mode="edit"
               initialEditValues={editValues}
               onAdd={handleAdd}
               onEdit={handleEdit}
               closeForm={handleCloseModal}
            />
         )}

         {isConfirmRemoveOpen && (
            <ConfirmRemove
               confirmRemove={handleRemove}
               closeRemove={handleCloseModal}
            />
         )}

         <h2 className="text-xl">Hábitos</h2>

         <AddBtn
            text="Adicionar hábito"
            onClickEvent={() => setIsAddFormOpen(true)}
         />

         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
               if (over !== null) {
                  if (active.id === over.id) {
                     return;
                  }
                  setHabits((list) => {
                     const oldIndex = list.findIndex((i) => i.id === active.id);
                     const newIndex = list.findIndex((i) => i.id === over.id);
                     const newList = arrayMove(habits, oldIndex, newIndex);
                     localStorage.setItem("habits", JSON.stringify(newList));
                     return newList;
                  });
               }
            }}
         >
            <SortableContext
               items={habits}
               strategy={verticalListSortingStrategy}
            >
               {habits.map((i) => (
                  <SortableItem key={i.id} i={i} />
               ))}
            </SortableContext>
         </DndContext>
      </>
   );
};

export default HabitList;
