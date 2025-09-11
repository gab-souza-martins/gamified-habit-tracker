import ConfirmRemove from "./ConfirmRemove";
import React from "react";
import RedOutlineBtn from "./RedOutlineBtn";

const RemoveAllItems = () => {
   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);

   const handleRemove = () => {
      localStorage.removeItem("habits");
      localStorage.removeItem("todos");
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
            btnText="Remover itens"
            onClickEvent={() => setIsConfirmRemoveOpen(true)}
         />
      </>
   );
};

export default RemoveAllItems;
