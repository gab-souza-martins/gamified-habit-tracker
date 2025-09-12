import AttributeName from "./AttributeNameType";

interface Habit {
   id: string;
   name: string;
   attribute: AttributeName;
   difficulty: number;
   importante: number;

   done: boolean;
   history: string[];
   lastCompleted: string | null;
   streak: number;
   highestStreak: number;
}

export default Habit;
