import axios from "axios";
import { Todo } from "../types/types";

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/todos");
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const addData = async (newTodoData: Todo): Promise<void> => {
  await axios.post("http://localhost:4000/todos", newTodoData);
};

const completeData = async (todoId: string, isDone: Boolean): Promise<void> => {
  await axios.patch(`http://localhost:4000/todos/${todoId}`, {
    isDone: !isDone,
  });
};

const deleteData = async (todoId: string): Promise<void> => {
  await axios.delete(`http://localhost:4000/todos/${todoId}`);
};

export { getData, addData, completeData, deleteData };
