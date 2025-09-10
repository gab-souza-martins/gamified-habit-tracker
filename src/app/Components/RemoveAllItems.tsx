import { FaTrash } from "react-icons/fa6";

const RemoveAllItems = () => {
   return (
      <>
         <button
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 border-2 border-rose-600 shadow-sm
                      text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                      active:bg-rose-700 active:text-white active:border-rose-700 active:shadow-md"
         >
            <FaTrash />
            <span className="font-semibold">Remover itens</span>
         </button>
      </>
   );
};

export default RemoveAllItems;
