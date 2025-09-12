interface Habit {
   id: string;
   name: string;
   attribute: "body" | "mind" | "spirit";
   done: boolean;
   streak: number;
   highestStreak: number;
   lastCompleted: string | null;
   history: string[];
}

export default Habit;
