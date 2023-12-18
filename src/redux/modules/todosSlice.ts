import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "types/types";
import db from "../../db.json";
import axios from "axios";

export type StateType = {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
};

const initialState = {
  todos: db.todos,
  isLoading: false,
  isError: false,
};

export const __getTodos = createAsyncThunk<Todo[], void>(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/todos");
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo: Todo = action.payload;
      return { ...state, todos: [newTodo, ...state.todos] };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return {
        ...state,
        todos: state.todos.filter((item: Todo) => item.id !== id),
      };
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return {
        ...state,
        todos: state.todos.map((item: Todo) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item
        ),
      };
    },
    setTodo: (state, action) => {
      return { ...state, todos: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = action.payload;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addTodo, deleteTodo, completeTodo } = todosSlice.actions;
export default todosSlice.reducer;
