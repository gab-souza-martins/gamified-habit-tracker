import React from "react";
import { FaCoins, FaX } from "react-icons/fa6";
import ShopItem from "../Types/ShopItem";
import AddBtn from "./Buttons/AddBtn";
import { FaEdit } from "react-icons/fa";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   useSortable,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ShopProps {
   buyItem: (cost: number) => void;
}

interface SortableItemProps {
   i: ShopItem;
   editId: string;
   editName: string;
   editCost: number;
   setEditId: React.Dispatch<React.SetStateAction<string>>;
   setEditName: React.Dispatch<React.SetStateAction<string>>;
   setEditCost: React.Dispatch<React.SetStateAction<number>>;
   handleEdit: () => void;
   handleCancelEdit: () => void;
   handleRemove: (id: string) => void;
   buyItem: (cost: number) => void;
   focusRef: React.RefObject<HTMLInputElement | null>;
}

const SortableItem: React.FC<SortableItemProps> = ({
   i,
   editId,
   editName,
   editCost,
   setEditId,
   setEditName,
   setEditCost,
   handleEdit,
   handleCancelEdit,
   handleRemove,
   buyItem,
   focusRef,
}) => {
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
         className="flex items-center gap-2"
      >
         {editId === i.id ? (
            <form
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     handleEdit();
                  } else if (e.key === "Escape") {
                     handleCancelEdit();
                  }
               }}
            >
               <input
                  onChange={(e) => setEditName(e.target.value)}
                  value={editName}
                  ref={focusRef}
                  type="text"
                  className="border rounded-md p-2"
                  aria-label="Editar nome"
                  placeholder="Editar nome"
               />
               <input
                  onChange={(e) => setEditCost(Number(e.target.value))}
                  value={editCost}
                  type="number"
                  min={1}
                  className="border rounded-md p-2"
                  aria-label="Editar custo"
                  placeholder="Editar custo"
               />
            </form>
         ) : (
            <>
               <span {...listeners} className="cursor-pointer">
                  {i.name}
               </span>
               <span
                  {...listeners}
                  className="cursor-pointer flex items-center gap-1"
               >
                  <FaCoins /> {i.cost}
               </span>
            </>
         )}

         <button
            onClick={(e) => {
               e.preventDefault();
               buyItem(i.cost);
            }}
            aria-label="Comprar item"
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                      bg-amber-300 shadow-sm hover:bg-amber-400 hover:shadow-xl transition duration-75 ease-in-out
                      active:bg-amber-500 active:shadow-md focus:outline-2 focus:outline-amber-300 focus:outline-offset-2"
         >
            <FaCoins />
            <span className="hidden sm:inline">Comprar</span>
         </button>

         <div className="flex items-center">
            <button
               onClick={(e) => {
                  e.preventDefault();
                  setEditId(i.id);
                  setEditName(i.name);
                  setEditCost(i.cost);
               }}
               aria-label="Editar item"
               className="cursor-pointer p-2"
            >
               <FaEdit />
            </button>
            <button
               onClick={(e) => {
                  e.preventDefault();
                  handleRemove(i.id);
               }}
               aria-label="Remover item"
               className="cursor-pointer p-2"
            >
               <FaX />
            </button>
         </div>
      </div>
   );
};

const Shop: React.FC<ShopProps> = ({ buyItem }) => {
   const [itemList, setItemList] = React.useState<ShopItem[]>([]);

   React.useEffect(() => {
      const saved: string | null = localStorage.getItem("shop");
      const parsed: ShopItem[] = saved
         ? JSON.parse(saved)
         : [
              { id: crypto.randomUUID(), name: "Guloseima", cost: 5 },
              { id: crypto.randomUUID(), name: "Videogame (30 min)", cost: 10 },
           ];
      setItemList(parsed);
   }, []);

   const [itemName, setItemName] = React.useState<string>("");
   const [itemCost, setItemCost] = React.useState<number>(1);
   const handleAdd = () => {
      if (itemName.trim() !== "") {
         const newShop: ShopItem[] = [
            ...itemList,
            { id: crypto.randomUUID(), name: itemName.trim(), cost: itemCost },
         ];
         setItemList(newShop);
         localStorage.setItem("shop", JSON.stringify(newShop));
      }
   };

   const [editId, setEditId] = React.useState<string>("");
   const [editName, setEditName] = React.useState<string>("");
   const [editCost, setEditCost] = React.useState<number>(1);

   const focusRef = React.useRef<HTMLInputElement>(null);
   React.useEffect(() => {
      if (editId && focusRef.current) {
         focusRef.current.focus();
      }
   }, [editId]);

   const handleEdit = () => {
      if (editName.trim() !== "") {
         const newShop: ShopItem[] = itemList.map((i) =>
            i.id === editId
               ? {
                    ...i,
                    name: editName.trim(),
                    cost: editCost > 0 ? editCost : 1,
                 }
               : i
         );
         setItemList(newShop);
         localStorage.setItem("shop", JSON.stringify(newShop));
         setEditId("");
      }
   };
   const handleCancelEdit = () => {
      setEditId("");
   };

   const handleRemove = (idToRemove: string) => {
      const newShop: ShopItem[] = itemList.filter((i) => i.id !== idToRemove);
      setItemList(newShop);
      localStorage.setItem("shop", JSON.stringify(newShop));
   };

   return (
      <>
         <h2 className="text-xl">Loja</h2>

         <form className="flex items-center gap-2 flex-wrap">
            <input
               onChange={(e) => setItemName(e.target.value)}
               value={itemName}
               type="text"
               className="border rounded-md p-2"
               aria-label="Nome do item"
               aria-required
               placeholder="Nome"
            />
            <input
               onChange={(e) => setItemCost(Number(e.target.value))}
               value={itemCost}
               type="number"
               min={1}
               className="border rounded-md p-2 w-16"
               aria-label="Custo do item"
               aria-required
               placeholder="Custo"
            />
            <AddBtn text="Adicionar item" onClickEvent={handleAdd} />
         </form>

         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
               if (over !== null) {
                  if (active.id === over.id) {
                     return;
                  }
                  setItemList((list) => {
                     const oldIndex = list.findIndex((i) => i.id === active.id);
                     const newIndex = list.findIndex((i) => i.id === over.id);
                     const newShop = arrayMove(list, oldIndex, newIndex);
                     localStorage.setItem("shop", JSON.stringify(newShop));
                     return newShop;
                  });
               }
            }}
         >
            <SortableContext
               items={itemList}
               strategy={verticalListSortingStrategy}
            >
               {itemList.map((i) => (
                  <SortableItem
                     key={i.id}
                     i={i}
                     editId={editId}
                     editName={editName}
                     editCost={editCost}
                     setEditId={setEditId}
                     setEditName={setEditName}
                     setEditCost={setEditCost}
                     handleEdit={handleEdit}
                     handleCancelEdit={handleCancelEdit}
                     handleRemove={handleRemove}
                     buyItem={buyItem}
                     focusRef={focusRef}
                  />
               ))}
            </SortableContext>
         </DndContext>
      </>
   );
};

export default Shop;
