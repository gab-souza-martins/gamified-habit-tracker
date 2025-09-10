import React from "react";
import { FaPlus, FaX } from "react-icons/fa6";
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

const TodoList = () => {
   const [todos, setTodos] = React.useState<Todo[]>([]);
   const [todoName, setTodoName] = React.useState<string>("");

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("todos");
      const parsed: Todo[] = saved ? JSON.parse(saved) : [];
      setTodos(parsed);
   }, []);

   const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (todoName.trim() !== "") {
         const newTodos: Todo[] = [
            ...todos,
            {
               id: crypto.randomUUID(),
               name: todoName.trim(),
               done: false,
            },
         ];
         setTodos(newTodos);
         localStorage.setItem("todos", JSON.stringify(newTodos));
      } else {
         console.log("Nenhum input encontrado");
      }
      setTodoName("");
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

            {editId === i.id && (
               <input
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === "Escape") {
                        handleLeaveEdit();
                     } else if (e.key === "Enter") {
                        handleEdit();
                     }
                  }}
                  onBlur={handleEdit}
                  value={editValue}
                  autoFocus
                  aria-label="Editar nome"
                  type="text"
                  placeholder="Editar"
                  className="border rounded-md p-1"
               />
            )}

            {editId !== i.id && (
               <span
                  {...listeners}
                  className={`cursor-pointer ${
                     i.done ? "text-gray-400 line-through" : ""
                  }`}
               >
                  {i.name}
               </span>
            )}

            <button
               onClick={(e) => {
                  e.preventDefault();
                  setEditId(i.id);
                  setEditValue(i.name);
               }}
               aria-label="Editar afazer"
               className="cursor-pointer p-2"
            >
               <FaEdit />
            </button>

            <button
               onClick={(e) => {
                  e.preventDefault();
                  handleRemove(i.id);
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
         }
         return i;
      });

      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
   };

   const [editId, setEditId] = React.useState<string>("");
   const [editValue, setEditValue] = React.useState<string>("");

   const handleEdit = () => {
      if (editValue.trim() !== "") {
         const newTodos: Todo[] = todos.map((i) => {
            if (i.id === editId) {
               i.name = editValue.trim();
            }
            return i;
         });
         setTodos(newTodos);
         localStorage.setItem("todos", JSON.stringify(newTodos));
         handleLeaveEdit();
      }
   };
   const handleLeaveEdit = () => {
      setEditId("");
      setEditValue("");
   };

   const handleRemove = (toRemove: string) => {
      const newTodos: Todo[] = todos.filter((i) => i.id !== toRemove);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
   };

   return (
      <>
         <h2 className="text-xl">Afazeres</h2>

         <form className="flex items-center gap-2">
            <input
               onChange={(e) => setTodoName(e.target.value)}
               value={todoName}
               aria-label="Digite o afazer"
               type="text"
               placeholder="Afazer"
               className="border rounded-md p-1"
            />

            <button
               onClick={handleAdd}
               aria-label="Adicionar afazer"
               className="cursor-pointer bg-cyan-300 rounded-md shadow-md p-2"
            >
               <FaPlus />
            </button>
         </form>

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
      </>
   );
};

export default TodoList;
