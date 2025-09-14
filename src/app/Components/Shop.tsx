import React from "react";
import { FaCoins } from "react-icons/fa6";
import ShopItem from "../Types/ShopItem";

const Shop = () => {
   const [itemList, setItemList] = React.useState<ShopItem[]>([
      { id: crypto.randomUUID(), name: "Guloseima", cost: 5 },
      { id: crypto.randomUUID(), name: "Videogame (30 min)", cost: 10 },
   ]);

   return (
      <>
         <h2 className="text-xl">Loja</h2>

         {itemList.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
               <span>{i.name}</span>
               <span>
                  <strong>Custo:</strong> {i.cost}
               </span>
               <button
                  //    onClick={() => setIsAddFormOpen(true)}
                  aria-label="Comprar item"
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                         bg-amber-300 shadow-sm hover:bg-amber-400 hover:shadow-xl transition duration-75 ease-in-out
                         active:bg-amber-500 active:shadow-md focus:outline-2 focus:outline-amber-300 focus:outline-offset-2"
               >
                  <FaCoins />
                  <span>Comprar</span>
               </button>
            </div>
         ))}
      </>
   );
};

export default Shop;
