import React from "react";
import Stats from "../Types/StatsType";

interface UserStatsProps {
   stats: Stats;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
   return (
      <>
         <p>Nível: {stats.level}</p>
         <p>
            Experiência: {stats.exp}/{stats.expToNextLevel}
         </p>
      </>
   );
};

export default UserStats;
