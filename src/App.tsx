import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Input } from "./components/Input";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/types";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      title: "제목1",
      contents: "내용1",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목2",
      contents: "내용2",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목3",
      contents: "내용3",
      isDone: true,
    },
    {
      id: uuid(),
      title: "제목4",
      contents: "내용4",
      isDone: false,
    },
  ]);

  return (
    <div>
      <GlobalStyles />
      <StHeader>Todo List</StHeader>
      <StMain>
        <Input todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} listIsDone={false} />
        <TodoList todos={todos} setTodos={setTodos} listIsDone={true} />
      </StMain>
      <StFooter>TypeScript Todo List</StFooter>
    </div>
  );
}

export default App;

const StHeader = styled.header`
  color: white;
  background-color: lightcoral;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  padding: 1.5rem;
  height: fit-content;
`;

const StMain = styled.header`
  padding: 10px;
  max-width: 1200px;
  min-width: 800px;
  margin: 10px auto;
`;

const StFooter = styled.header`
  color: white;
  background-color: lightblue;
  font-size: 1rem;
  text-align: center;
  padding: 1.5rem;
  height: fit-content;
`;
