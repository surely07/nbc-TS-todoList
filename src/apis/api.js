import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/todos");
    console.log(response.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const addData = async (newTodoData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/todos",
      newTodoData
    );
    console.log(response.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const completeData = async (todoId, isDone) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/todos/${todoId}`,
      { isDone: !isDone }
    );
    console.log(response.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const deleteData = async (todoId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/todos/${todoId}`
    );
    console.log(response.data);
  } catch (error) {
    console.log("error:", error);
  }
};
