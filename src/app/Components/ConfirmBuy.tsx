import React from "react";
import { FaBan } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";

interface ConfirmBuyProps {
   confirmBuy: () => void;
   closeConfirm: () => void;
}

const ConfirmBuy: React.FC<ConfirmBuyProps> = ({
   confirmBuy,
   closeConfirm,
}) => {
   const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      confirmBuy();
      closeConfirm();
   };

   const focusRef = React.useRef<HTMLParagraphElement>(null);
   React.useEffect(() => {
      if (focusRef.current) {
         focusRef.current.focus();
      }
   }, []);

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div
            className="border p-6 rounded-lg shadow-lg w-70 sm:w-96"
            style={{
               backgroundColor: "var(--background)",
               //    borderColor: "var(--light-foreground)",
            }}
         >
            <p role="alert" aria-live="assertive" ref={focusRef} tabIndex={-1}>
               As moedas usadas nesta compra não serão retornadas. Deseja
               prosseguir?
            </p>
            <br />

            <div className="flex gap-2">
               <button
                  onClick={handleConfirm}
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                             bg-amber-300 shadow-sm hover:bg-amber-400 hover:shadow-xl transition duration-75 ease-in-out
                             active:bg-amber-500 active:shadow-md 
                             focus:outline-2 focus:outline-amber-300 focus:outline-offset-2"
               >
                  <FaCoins />
                  <span className="font-semibold">Comprar</span>
               </button>

               <button
                  onClick={closeConfirm}
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 border-2 border-rose-600 shadow-sm
                            text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                            active:bg-rose-700 active:text-white active:border-rose-700 active:shadow-md"
               >
                  <FaBan />
                  <span className="font-semibold">Cancelar</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmBuy;
