import React from "react";
import { FaBrain, FaHandFist, FaHeart, FaX } from "react-icons/fa6";
import Todo from "../Types/TodoType";
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
import AddBtn from "./Buttons/AddBtn";

interface TodoListProps {
   giveReward: (attribute: AttributeName, reward: number) => void;
   removeReward: (attribute: AttributeName, reward: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ giveReward, removeReward }) => {
   const [todos, setTodos] = React.useState<Todo[]>([]);

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("todos");
      const parsed: Todo[] = saved ? JSON.parse(saved) : [];
      setTodos(parsed);
   }, []);

   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);

   const handleAdd = (
      name: string,
      attribute: AttributeName,
      difficulty: number,
      importance: number
   ) => {
      if (name.trim() !== "") {
         const newTodos: Todo[] = [
            ...todos,
            {
               id: crypto.randomUUID(),
               name: name.trim(),
               attribute: attribute,
               difficulty: difficulty,
               importance: importance,
               done: false,
            },
         ];
         setTodos(newTodos);
         localStorage.setItem("todos", JSON.stringify(newTodos));
      } else {
         console.log("Nenhum input encontrado");
      }
   };

   const SortableItem = ({ i }: { i: Todo }) => {
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
               onChange={(e) => handleDone(i.id, e.target.checked)}
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
               aria-label="Editar afazer"
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
               aria-label="Remover afazer"
               className="cursor-pointer p-2"
            >
               <FaX />
            </button>
         </div>
      );
   };

   const handleDone = (todo: string, isDone: boolean) => {
      const newTodos: Todo[] = todos.map((i) => {
         if (i.id === todo) {
            i.done = isDone;

            if (isDone) {
               giveReward(i.attribute, i.difficulty + i.importance - 1);
            } else {
               removeReward(i.attribute, i.difficulty + i.importance - 1);
            }
         }
         return i;
      });

      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
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
         const newTodos: Todo[] = todos.map((i) => {
            if (i.id === editId) {
               i.name = name.trim();
               i.attribute = attribute;
               i.difficulty = difficulty;
               i.importance = importance;
            }
            return i;
         });
         setTodos(newTodos);
         localStorage.setItem("todos", JSON.stringify(newTodos));
      }
   };

   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);
   const [idToRemove, setIdToRemove] = React.useState<string>("");

   const handleRemove = () => {
      const newTodos: Todo[] = todos.filter((i) => i.id !== idToRemove);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
   };
   const handleCloseModal = () => {
      setIsAddFormOpen(false);
      setIsEditFormOpen(false);
      setIsConfirmRemoveOpen(false);
   };

   return (
      <div>
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

         <h2 className="text-xl">Afazeres</h2>

         <AddBtn
            text="Adicionar afazer"
            onClickEvent={() => setIsAddFormOpen(true)}
         />

         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
               if (over !== null) {
                  if (active.id === over.id) {
                     return;
                  }
                  setTodos((list) => {
                     const oldIndex = list.findIndex((i) => i.id === active.id);
                     const newIndex = list.findIndex((i) => i.id === over.id);
                     const newList = arrayMove(todos, oldIndex, newIndex);
                     localStorage.setItem("todos", JSON.stringify(newList));
                     return newList;
                  });
               }
            }}
         >
            <SortableContext
               items={todos}
               strategy={verticalListSortingStrategy}
            >
               {todos.map((i) => (
                  <SortableItem key={i.id} i={i} />
               ))}
            </SortableContext>
         </DndContext>
      </div>
   );
};

export default TodoList;
