import React from "react";

const ItemForm = () => {
   const [name, setName] = React.useState<string>("");

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div
            className="border p-6 rounded-lg shadow-lg w-70 sm:w-96"
            style={{
               backgroundColor: "var(--background)",
               //    borderColor: "var(--light-foreground)",
            }}
         >
            <form className="flex flex-col gap-3">
               <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="border rounded-md p-2"
                  aria-label="Nome"
                  aria-required
                  placeholder="Nome"
               />
            </form>
         </div>
      </div>
   );
};

export default ItemForm;
