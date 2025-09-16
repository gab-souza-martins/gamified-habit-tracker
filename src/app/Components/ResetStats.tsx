import React from "react";
import ConfirmRemove from "./ConfirmRemove";
import RedOutlineBtn from "./Buttons/RedOutlineBtn";
import { FaArrowsRotate } from "react-icons/fa6";

const RemoveAllItems = () => {
   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);

   const handleRemove = () => {
      localStorage.removeItem("stats");
      window.location.reload();
   };
   const handleCloseConfirmRemove = () => {
      setIsConfirmRemoveOpen(false);
   };

   return (
      <>
         {isConfirmRemoveOpen && (
            <ConfirmRemove
               confirmRemove={handleRemove}
               closeRemove={handleCloseConfirmRemove}
            />
         )}

         <RedOutlineBtn
            btnIcon={<FaArrowsRotate />}
            btnText="Resetar atributos"
            onClickEvent={() => setIsConfirmRemoveOpen(true)}
         />
      </>
   );
};

export default RemoveAllItems;
