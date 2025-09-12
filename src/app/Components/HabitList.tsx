import React from "react";
import Habit from "../Types/HabitType";
import { FaBrain, FaHandFist, FaHeart, FaPlus, FaX } from "react-icons/fa6";
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

interface HabitListProps {
   increaseExp: (attribute: AttributeName, exp: number) => void;
   decreaseExp: (attribute: AttributeName, exp: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ increaseExp, decreaseExp }) => {
   const [habits, setHabits] = React.useState<Habit[]>([]);

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

   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);

   const handleAdd = (name: string, attribute: AttributeName) => {
      if (name.trim() !== "") {
         const newHabits: Habit[] = [
            ...habits,
            {
               id: crypto.randomUUID(),
               name: name.trim(),
               attribute: attribute,
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
            className="flex items-center gap-3"
         >
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

            <span className="text-gray-500">Sequência atual: {i.streak}</span>
            <span className="text-gray-500">
               Maior sequência: {i.highestStreak}
            </span>

            <button
               onClick={(e) => {
                  e.preventDefault();
                  setEditId(i.id);
                  setEditName(i.name);
                  setEditAttribute(i.attribute);
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
      );
   };

   const handleComplete = (habit: string, isDone: boolean) => {
      const today: string = new Date().toLocaleDateString();

      if (isDone) {
         addCompletion(habit, today);
         increaseExp("body", 1);
      } else {
         removeCompletion(habit, today);
         decreaseExp("body", 1);
      }
   };
   const addCompletion = (habit: string, today: string) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.id === habit && i.lastCompleted !== today) {
            i.history = [...i.history, today];

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
   const removeCompletion = (habit: string, today: string) => {
      const newHabits: Habit[] = habits.map((i) => {
         if (i.id === habit && i.lastCompleted === today) {
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

   const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
   const [editId, setEditId] = React.useState<string>("");
   const [editName, setEditName] = React.useState<string>("");
   const [editAttribute, setEditAttribute] =
      React.useState<AttributeName>("body");

   const handleEdit = (name: string) => {
      if (name.trim() !== "") {
         const newHabits: Habit[] = habits.map((i) => {
            if (i.id === editId) {
               i.name = name.trim();
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
               initialEditValues={{ name: editName, attribute: editAttribute }}
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

         <button
            onClick={() => setIsAddFormOpen(true)}
            aria-label="Adicionar hábito"
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                      bg-cyan-300 shadow-sm hover:bg-cyan-400 hover:shadow-xl transition duration-75 ease-in-out
                      active:bg-cyan-500 active:shadow-md focus:outline-2 focus:outline-cyan-300 focus:outline-offset-2"
         >
            <FaPlus />
            <span>Adicionar</span>
         </button>

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
