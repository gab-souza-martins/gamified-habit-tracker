import React from "react";
import RedOutlineBtn from "./Buttons/RedOutlineBtn";
import { FaBan, FaFloppyDisk, FaPlus } from "react-icons/fa6";
import AttributeName from "../Types/AttributeNameType";
import EditValues from "../Types/EditValuesType";

interface ItemFormProps {
   mode: "add" | "edit";
   initialEditValues?: EditValues;
   onAdd: (
      name: string,
      attribute: AttributeName,
      difficulty: number,
      importance: number
   ) => void;
   onEdit: (
      name: string,
      attribute: AttributeName,
      difficulty: number,
      importance: number
   ) => void;
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
         setDifficulty(initialEditValues.difficulty);
         setImportance(initialEditValues.importance);
      }
   }, [initialEditValues]);

   const handleAdd = () => {
      if (mode === "add") {
         onAdd(name, attribute, difficulty, importance);
      } else {
         onEdit(name, attribute, difficulty, importance);
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
               borderColor: "var(--light-foreground)",
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

               {/* Atributos */}
               <div className="flex items-center flex-col gap-1 sm:flex-row sm:gap-3">
                  <label htmlFor="attributeSelect" className="font-semibold">
                     Atributo
                  </label>

                  <div className="flex items-center gap-2">
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
               </div>

               {/* Dificuldade */}
               <div className="flex items-center flex-col gap-1 sm:flex-row sm:gap-3">
                  <label htmlFor="difficultySelect" className="font-semibold">
                     Dificuldade
                  </label>

                  <div className="flex items-center gap-2">
                     <label>
                        <input
                           onChange={(e) =>
                              setDifficulty(Number(e.target.value))
                           }
                           checked={difficulty === 1}
                           value={1}
                           type="radio"
                           name="difficultySelect"
                        />
                        Fácil
                     </label>
                     <label>
                        <input
                           onChange={(e) =>
                              setDifficulty(Number(e.target.value))
                           }
                           checked={difficulty === 2}
                           value={2}
                           type="radio"
                           name="difficultySelect"
                        />
                        Médio
                     </label>
                     <label>
                        <input
                           onChange={(e) =>
                              setDifficulty(Number(e.target.value))
                           }
                           checked={difficulty === 3}
                           value={3}
                           type="radio"
                           name="difficultySelect"
                        />
                        Difícil
                     </label>
                  </div>
               </div>

               {/* Importância */}
               <div className="flex items-center flex-col gap-1 sm:flex-row sm:gap-3">
                  <label htmlFor="importanceSelect" className="font-semibold">
                     Importância
                  </label>

                  <div className="flex items-center gap-1.5">
                     <label>
                        <input
                           onChange={(e) =>
                              setImportance(Number(e.target.value))
                           }
                           checked={importance === 1}
                           value={1}
                           type="radio"
                           name="importanceSelect"
                        />
                        Trivial
                     </label>
                     <label>
                        <input
                           onChange={(e) =>
                              setImportance(Number(e.target.value))
                           }
                           checked={importance === 2}
                           value={2}
                           type="radio"
                           name="importanceSelect"
                        />
                        Importante
                     </label>
                     <label>
                        <input
                           onChange={(e) =>
                              setImportance(Number(e.target.value))
                           }
                           checked={importance === 3}
                           value={3}
                           type="radio"
                           name="importanceSelect"
                        />
                        Urgente
                     </label>
                  </div>
               </div>

               <div className="flex gap-2">
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        handleAdd();
                     }}
                     className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-black
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
