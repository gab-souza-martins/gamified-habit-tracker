import React from "react";
import { FaBan } from "react-icons/fa6";
import RedOutlineBtn from "./Buttons/RedOutlineBtn";

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
               className="text-[var(--custom-rose)]"
               role="alert"
               aria-live="assertive"
               ref={focusRef}
               tabIndex={-1}
            >
               Você não tem moedas suficientes para comprar este item.
            </p>
            <br />

            <div className="flex">
               <RedOutlineBtn
                  btnIcon={<FaBan />}
                  btnText="Cancelar"
                  onClickEvent={closeError}
               />
            </div>
         </div>
      </div>
   );
};

export default BuyingError;
