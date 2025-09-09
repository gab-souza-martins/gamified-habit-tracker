interface Habit {
   name: string;
   streak: number;
   lastCompleted: string | null;
   history: string[];
}

export default Habit;
