import React from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import Input from "./components/Input";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <GlobalStyles />
      <StHeader>Todo List</StHeader>
      <StMain>
        <Input />
        <TodoList listIsDone={false} />
        <TodoList listIsDone={true} />
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
