import React from "react";
import Stats from "../Types/StatsType";

interface UserStatsProps {
   stats: Stats;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
   return (
      <>
         <p>Nível: {stats.level ?? 1}</p>
         <p>Experiência: {stats.exp ?? 0}/10</p>
      </>
   );
};

export default UserStats;
