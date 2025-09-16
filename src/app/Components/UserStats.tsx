import React from "react";
import Stats from "../Types/StatsType";
import { FaCoins } from "react-icons/fa6";

interface UserStatsProps {
   stats: Stats;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
   return (
      <>
         <div className="flex items-center gap-2">
            Corpo {stats.body.level}:
            <div className="border rounded-md w-40">
               <div
                  className="rounded-md py-1 px-2 bg-yellow-300"
                  style={{
                     width: `calc(${stats.body.exp} / ${stats.body.expToNextLevel} * 100%)`,
                  }}
               >
                  {stats.body.exp}/{stats.body.expToNextLevel}
               </div>
            </div>
         </div>

         <div className="flex items-center gap-2">
            Mente {stats.mind.level}:
            <div className="border rounded-md w-40">
               <div
                  className="rounded-md py-1 px-2 bg-yellow-300"
                  style={{
                     width: `calc(${stats.mind.exp} / ${stats.mind.expToNextLevel} * 100%)`,
                  }}
               >
                  {stats.mind.exp}/{stats.mind.expToNextLevel}
               </div>
            </div>
         </div>

         <div className="flex items-center gap-2">
            Espírito {stats.spirit.level}:
            <div className="border rounded-md w-40">
               <div
                  className="rounded-md py-1 px-2 bg-yellow-300"
                  style={{
                     width: `calc(${stats.spirit.exp} / ${stats.spirit.expToNextLevel} * 100%)`,
                  }}
               >
                  {stats.spirit.exp}/{stats.spirit.expToNextLevel}
               </div>
            </div>
         </div>

         <p className="flex items-center gap-2">
            <FaCoins /> {stats.coins}
         </p>
      </>
   );
};

export default UserStats;
