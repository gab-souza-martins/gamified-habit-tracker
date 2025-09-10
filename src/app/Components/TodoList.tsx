import React from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import Todo from "../Types/TodoType";

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
            { name: todoName.trim(), done: false },
         ];
         setTodos(newTodos);
         localStorage.setItem("todos", JSON.stringify(newTodos));
      } else {
         console.log("Nenhum input encontrado");
      }
      setTodoName("");
   };

   const handleDone = (toChange: string, isDone: boolean) => {
      const newTodos: Todo[] = todos.map((i) => {
         if (i.name === toChange) {
            i.done = isDone;
         }
         return i;
      });

      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
   };

   const handleRemove = (toRemove: string) => {
      const newTodos: Todo[] = todos.filter((i) => i.name !== toRemove);
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

         <ul>
            {todos.map((i, index) => (
               <li
                  key={index}
                  className={`flex items-center gap-3 ${
                     i.done ? "text-gray-400 line-through" : ""
                  }`}
               >
                  <input
                     onChange={(e) => handleDone(i.name, e.target.checked)}
                     checked={i.done}
                     aria-label="Marcar como concluído"
                     type="checkbox"
                  />

                  <span>{i.name}</span>

                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        handleRemove(i.name);
                     }}
                     aria-label="Remover afazer"
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

export default TodoList;
