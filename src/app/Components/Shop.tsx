import React from "react";
import { FaCoins, FaX } from "react-icons/fa6";
import ShopItem from "../Types/ShopItem";
import AddBtn from "./Buttons/AddBtn";

interface ShopProps {
   buyItem: (cost: number) => void;
}

const Shop: React.FC<ShopProps> = ({ buyItem }) => {
   const [itemList, setItemList] = React.useState<ShopItem[]>([
      { id: crypto.randomUUID(), name: "Guloseima", cost: 5 },
      { id: crypto.randomUUID(), name: "Videogame (30 min)", cost: 10 },
   ]);

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

         {itemList.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
               <span>{i.name}</span>

               <span>
                  <strong>Custo:</strong> {i.cost}
               </span>

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
                  <span>Comprar</span>
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
         ))}
      </>
   );
};

export default Shop;
