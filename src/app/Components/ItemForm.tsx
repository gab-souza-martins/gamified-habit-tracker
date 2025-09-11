import React from "react";
import RedOutlineBtn from "./RedOutlineBtn";
import { FaBan, FaPlus } from "react-icons/fa6";

interface ItemFormProps {
   onAdd: (name: string) => void;
   closeForm: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd, closeForm }) => {
   const [name, setName] = React.useState<string>("");

   const handleAdd = () => {
      onAdd(name);
      if (name.trim() === "") {
         return;
      }
      closeForm();
   };

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div
            className="border p-6 rounded-lg shadow-lg w-70 sm:w-96"
            style={{
               backgroundColor: "var(--background)",
               //    borderColor: "var(--light-foreground)",
            }}
         >
            <form className="flex flex-col gap-3">
               <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="border rounded-md p-2"
                  aria-label="Nome"
                  aria-required
                  placeholder="Nome"
               />

               <div className="flex items-center gap-2">
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        handleAdd();
                     }}
                     className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                               bg-cyan-300 shadow-sm hover:bg-cyan-400 hover:shadow-xl transition duration-75 ease-in-out
                               active:bg-cyan-500 active:shadow-md focus:outline-2 focus:outline-cyan-300 focus:outline-offset-2"
                  >
                     <FaPlus />
                     <span>Adicionar</span>
                  </button>
                  <RedOutlineBtn
                     btnIcon={<FaBan />}
                     btnText="Cancelar"
                     onClickEvent={closeForm}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default ItemForm;
