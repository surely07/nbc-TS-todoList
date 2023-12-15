import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../common/Button";

import { Todo } from "../types/types";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  listIsDone: boolean;
};

const TodoList = ({ todos, setTodos, listIsDone }: TodoListProps) => {
  const handleDeleteButtonClick = (todo: Todo) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      cancelButtonColor: "gray",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteTodos: Todo[] = todos.filter((item: Todo): boolean => {
          return item.id !== todo.id;
        });
        setTodos(deleteTodos);
      }
    });
  };

  const handleCompleteButtonClick = (todo: Todo) => {
    const newTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    setTodos(newTodos);
  };

  return (
    <StTodoListContainer>
      <StTitle>{listIsDone ? "Done..!" : "Working.."}</StTitle>
      <StTodoWrapper>
        {todos
          .filter((todo) => todo.isDone === listIsDone)
          .map((todo) => {
            return (
              <StTodo key={todo.id}>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.contents}</p>
                </div>
                <div>
                  <Button onClick={() => handleCompleteButtonClick(todo)}>
                    {listIsDone ? "취소" : "완료"}
                  </Button>

                  <Button
                    $backgroundColor="gray"
                    onClick={() => handleDeleteButtonClick(todo)}
                  >
                    삭제
                  </Button>
                </div>
              </StTodo>
            );
          })}
      </StTodoWrapper>
    </StTodoListContainer>
  );
};

export default TodoList;

const StTodoListContainer = styled.div`
  margin: 50px auto;
`;

const StTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px;
`;

const StTodoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StTodo = styled.div`
  border: 2px solid lightcoral;
  width: 48%;
  height: 100px;
  padding: 15px;
  margin: 10px;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  & h3 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  & p {
    font-size: 1rem;
  }
`;
