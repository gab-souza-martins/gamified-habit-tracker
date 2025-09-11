import { ReactNode } from "react";

interface RedOutlineBtnProps {
   btnIcon: ReactNode;
   btnText: string;
   onClickEvent: () => void;
}

const RedOutlineBtn: React.FC<RedOutlineBtnProps> = ({
   btnIcon,
   btnText,
   onClickEvent,
}) => {
   return (
      <button
         onClick={(e) => {
            e.preventDefault();
            onClickEvent();
         }}
         className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 border-2 border-rose-600 shadow-sm
                   text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                   active:bg-rose-700 active:text-white active:border-rose-700 active:shadow-md"
      >
         {btnIcon}
         <span className="font-semibold">{btnText}</span>
      </button>
   );
};

export default RedOutlineBtn;
