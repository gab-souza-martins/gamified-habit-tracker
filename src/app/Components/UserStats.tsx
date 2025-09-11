import React from "react";

interface UserStatsProps {
   exp: number;
}

const UserStats: React.FC<UserStatsProps> = ({ exp }) => {
   return (
      <>
         <p>Nível: 1</p>
         <p>Experiência: {exp ?? 0}</p>
      </>
   );
};

export default UserStats;
