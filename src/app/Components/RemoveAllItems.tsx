import React from "react";
import ConfirmRemove from "./ConfirmRemove";
import RedOutlineBtn from "./Buttons/RedOutlineBtn";
import { FaTrash } from "react-icons/fa6";

const RemoveAllItems = () => {
   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);

   const handleRemove = () => {
      localStorage.removeItem("habits");
      localStorage.removeItem("todos");
      localStorage.removeItem("shop");
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
            btnIcon={<FaTrash />}
            btnText="Remover itens"
            onClickEvent={() => setIsConfirmRemoveOpen(true)}
         />
      </>
   );
};

export default RemoveAllItems;
