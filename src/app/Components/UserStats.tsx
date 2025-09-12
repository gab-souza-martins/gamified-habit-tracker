import React from "react";
import Stats from "../Types/StatsType";

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
      </>
   );
};

export default UserStats;
