import { FaPlus } from "react-icons/fa6";

interface AddBtnProps {
   text: string;
   onClickEvent: () => void;
}

const AddBtn: React.FC<AddBtnProps> = ({ text, onClickEvent }) => {
   return (
      <button
         onClick={(e) => {
            e.preventDefault();
            onClickEvent();
         }}
         aria-label={text}
         className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2
                     bg-cyan-300 shadow-sm hover:bg-cyan-400 hover:shadow-xl transition duration-75 ease-in-out
                     active:bg-cyan-500 active:shadow-md focus:outline-2 focus:outline-cyan-300 focus:outline-offset-2"
      >
         <FaPlus />
         <span>{text}</span>
      </button>
   );
};

export default AddBtn;
