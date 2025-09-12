import AttributeName from "./AttributeNameType";

interface Habit {
   id: string;
   name: string;
   attribute: AttributeName;
   done: boolean;
   streak: number;
   highestStreak: number;
   lastCompleted: string | null;
   history: string[];
}

export default Habit;
