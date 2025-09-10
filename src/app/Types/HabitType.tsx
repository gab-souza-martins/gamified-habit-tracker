interface Habit {
   id: string;
   name: string;
   done: boolean;
   streak: number;
   highestStreak: number;
   lastCompleted: string | null;
   history: string[];
}

export default Habit;
