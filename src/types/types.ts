export interface RootState {
  todosSlice: Todo[];
}

export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
