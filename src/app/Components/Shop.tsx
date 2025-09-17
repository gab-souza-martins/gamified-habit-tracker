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
         const newShop: ShopItem[] = itemList.map((i) => {
            if (i.id === editId) {
               i.name = editName.trim();
               i.cost = editCost > 0 ? editCost : 1;
            }
            return i;
         });
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

         <form className="flex items-center gap-2">
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
               className="border rounded-md p-2"
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
                     const newShop = arrayMove(itemList, oldIndex, newIndex);
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
                  <SortableItem key={i.id} i={i} />
               ))}
            </SortableContext>
         </DndContext>
      </>
   );
};

export default Shop;
