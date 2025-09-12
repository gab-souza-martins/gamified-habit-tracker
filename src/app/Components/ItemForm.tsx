import React from "react";
import RedOutlineBtn from "./RedOutlineBtn";
import { FaBan, FaFloppyDisk, FaPlus } from "react-icons/fa6";
import AttributeName from "../Types/AttributeNameType";

interface ItemFormProps {
   mode: "add" | "edit";
   initialEditValues?: { name: string; attribute: AttributeName }; // !adicionar dificuldade e importância
   onAdd: (name: string, attribute: AttributeName) => void;
   onEdit: (name: string, attribute: AttributeName) => void;
   closeForm: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
   mode,
   initialEditValues,
   onAdd,
   onEdit,
   closeForm,
}) => {
   const [name, setName] = React.useState<string>("");
   const [attribute, setAttribute] = React.useState<AttributeName>("body");
   const [difficulty, setDifficulty] = React.useState<number>(1);
   const [importance, setImportance] = React.useState<number>(1);

   React.useEffect(() => {
      if (initialEditValues) {
         setName(initialEditValues.name);
         setAttribute(initialEditValues.attribute);
         // !adicionar dificuldade e importância
      }
   }, [initialEditValues]);

   const handleAdd = () => {
      if (mode === "add") {
         onAdd(name, attribute);
      } else {
         onEdit(name, attribute);
      }

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

               <div className="flex items-center gap-3">
                  <label>
                     <input
                        onChange={(e) =>
                           setAttribute(e.target.value as AttributeName)
                        }
                        checked={attribute === "body"}
                        value="body"
                        type="radio"
                        name="attributeSelect"
                     />
                     Corpo
                  </label>
                  <label>
                     <input
                        onChange={(e) =>
                           setAttribute(e.target.value as AttributeName)
                        }
                        checked={attribute === "mind"}
                        value="mind"
                        type="radio"
                        name="attributeSelect"
                     />
                     Mente
                  </label>
                  <label>
                     <input
                        onChange={(e) =>
                           setAttribute(e.target.value as AttributeName)
                        }
                        checked={attribute === "spirit"}
                        value="spirit"
                        type="radio"
                        name="attributeSelect"
                     />
                     Espírito
                  </label>
               </div>

               <div className="flex gap-2">
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        handleAdd();
                     }}
                     className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                               bg-cyan-300 shadow-sm hover:bg-cyan-400 hover:shadow-xl transition duration-75 ease-in-out
                               active:bg-cyan-500 active:shadow-md focus:outline-2 focus:outline-cyan-300 focus:outline-offset-2"
                  >
                     {mode === "add" ? <FaPlus /> : <FaFloppyDisk />}
                     <span className="font-semibold">
                        {mode === "add" ? "Adicionar" : "Salvar"}
                     </span>
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
