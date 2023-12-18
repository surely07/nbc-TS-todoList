import { StateType } from "redux/modules/todosSlice";

export interface RootState {
  todosSlice: StateType;
}

export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
