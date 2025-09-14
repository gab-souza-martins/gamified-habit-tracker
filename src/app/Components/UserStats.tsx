import React from "react";
import Stats from "../Types/StatsType";
import { FaCoins } from "react-icons/fa6";

interface UserStatsProps {
   stats: Stats;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
   return (
      <>
         <p>
            Corpo {stats.body.level}: {stats.body.exp}/
            {stats.body.expToNextLevel}
         </p>
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
