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

  const handleSubmitClick = (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <StInputContainer>
      <form onSubmit={handleSubmitClick}>
        <label>제목</label>
        <input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label>내용</label>
        <input
          value={contents}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContents(e.target.value)
          }
        />
        <button type="submit">추가</button>
      </form>
    </StInputContainer>
  );
};

const StInputContainer = styled.div`
  background-color: lightgray;
  padding: 20px;
  border-radius: 0.5rem;
`;
