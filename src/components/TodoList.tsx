import React from "react";
import styled from "styled-components";
import { Todo } from "../types/types";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  listIsDone: boolean;
};

export const TodoList = ({ todos, setTodos, listIsDone }: TodoListProps) => {
  return (
    <StTodoListContainer>
      <StTitle>{listIsDone ? "Done..!" : "Working.."}</StTitle>
      {todos
        .filter((todo) => todo.isDone === listIsDone)
        .map((todo) => {
          return (
            <StTodoWrapper>
              <StTodo key={todo.id}>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.contents}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const newTodos = todos.map((item) => {
                        if (item.id === todo.id) {
                          return { ...item, isDone: !item.isDone };
                        } else {
                          return item;
                        }
                      });
                      setTodos(newTodos);
                    }}
                  >
                    {listIsDone ? "취소" : "완료"}
                  </button>
                  <button
                    onClick={() => {
                      const deleteTodos = todos.filter((item) => {
                        return item.id !== todo.id;
                      });
                      setTodos(deleteTodos);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </StTodo>
            </StTodoWrapper>
          );
        })}
    </StTodoListContainer>
  );
};

const StTodoListContainer = styled.div`
  margin: 50px auto;
`;

const StTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StTodoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StTodo = styled.div`
  border: 1px solid lightcoral;
  width: 40%;
  padding: 15px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
