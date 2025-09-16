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
                  className={`rounded-md py-1 px-2 bg-yellow-300 w-${stats.body.exp}/${stats.body.expToNextLevel}`}
               >
                  {stats.body.exp}/{stats.body.expToNextLevel}
               </div>
            </div>
         </div>
         <p>
            Mente {stats.mind.level}: {stats.mind.exp}/
            {stats.mind.expToNextLevel}
         </p>
         <p>
            Espírito {stats.spirit.level}: {stats.spirit.exp}/
            {stats.spirit.expToNextLevel}
         </p>
         <p className="flex items-center gap-2">
            <FaCoins /> {stats.coins}
         </p>
      </>
   );
};

export default UserStats;
