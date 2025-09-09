import React from "react";
import { FaPlus } from "react-icons/fa";

const TodoList = () => {
   const [todos, setTodos] = React.useState<string[]>([]);
   const [todoName, setTodoName] = React.useState<string>("");

   const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newTodos: string[] = [...todos, todoName];
      setTodos(newTodos);
      setTodoName("");
   };

   return (
      <>
         <h2 className="text-xl">Afazeres</h2>

         <form className="flex items-center gap-2">
            <input
               onChange={(e) => setTodoName(e.target.value)}
               value={todoName}
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

         <ul>
            {todos.map((t, index) => (
               <li key={index}>{t}</li>
            ))}
         </ul>
      </>
   );
};

export default TodoList;
