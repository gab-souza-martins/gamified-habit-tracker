import React from "react";
import { FaBan } from "react-icons/fa6";

interface BuyingErrorProps {
   closeError: () => void;
}

const BuyingError: React.FC<BuyingErrorProps> = ({ closeError }) => {
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
            <p
               className="text-rose-500"
               role="alert"
               aria-live="assertive"
               ref={focusRef}
               tabIndex={-1}
            >
               Você não tem moedas suficientes para comprar este item.
            </p>
            <br />

            <div className="flex">
               <button
                  onClick={closeError}
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

export default BuyingError;
