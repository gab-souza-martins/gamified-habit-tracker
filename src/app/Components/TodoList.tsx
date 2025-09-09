import React from "react";

const TodoList = () => {
   const [todos, setTodos] = React.useState<string[]>(["afazer 1", "afazer 2"]);

   return (
      <>
         <h2 className="text-xl">Afazeres</h2>

         <ul>
            {todos.map((t, index) => (
               <li key={index}>{t}</li>
            ))}
         </ul>
      </>
   );
};

export default TodoList;
