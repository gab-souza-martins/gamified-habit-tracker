import AttributeName from "./AttributeNameType";

interface Todo {
   id: string;
   name: string;
   attribute: AttributeName;
   difficulty: number;
   importante: number;
   done: boolean;
}
export default Todo;
