import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import { Todo } from "../types/types";

type InputProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Input = ({ todos, setTodos }: InputProps) => {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const handleSubmitClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newTodo = {
      id: uuid(),
      title: title,
      contents: contents,
      isDone: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
    setContents("");
  };

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  return (
    <StInputContainer>
      <StConfirm onSubmit={handleSubmitClick}>
        <div>
          <label>제목</label>
          <input value={title} onChange={handleInputTitle} />
          <label>내용</label>
          <input
            width="20rem"
            value={contents}
            onChange={handleInputContents}
          />
        </div>
        <button type="submit">추가</button>
      </StConfirm>
    </StInputContainer>
  );
};

const StInputContainer = styled.div`
  background-color: lightgray;
  padding: 20px;
  border-radius: 0.5rem;
`;

type InputTagProps = {
  width?: string;
};

const StConfirm = styled.form<InputTagProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  & label {
    font-weight: 600;
  }
  & input {
    border: none;
    width: ${(props) => (props.width ? props.width : "15rem")};
    height: 30px;
    border-radius: 2rem;
    padding: 1rem;
    &:last-child {
      width: 20rem;
    }
  }
`;
