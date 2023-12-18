import React, { useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  StateType,
  __getTodos,
  completeTodo,
  deleteTodo,
} from "../redux/modules/todosSlice";
import { Button } from "../common/Button";

import { Todo } from "../types/types";

const TodoList = ({ listIsDone }: { listIsDone: boolean }) => {
  const dispatch = useDispatch();

  // dispatch(__getTodos());
  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const { todos, isLoading, isError } = useSelector(
    (state: StateType) => state
  );
  console.log(todos);

  const handleDeleteButtonClick = (id: string) => {
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
        dispatch(deleteTodo(id));
      }
    });
  };

  const handleCompleteButtonClick = (id: string) => {
    dispatch(completeTodo(id));
  };

  return (
    <StTodoListContainer>
      <StTitle>{listIsDone ? "Done..!" : "Working.."}</StTitle>
      <StTodoWrapper>
        {todos
          .filter((todo: Todo) => todo.isDone === listIsDone)
          .map((todo: Todo) => {
            return (
              <StTodo key={todo.id}>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.contents}</p>
                </div>
                <div>
                  <Button onClick={() => handleCompleteButtonClick(todo.id)}>
                    {listIsDone ? "취소" : "완료"}
                  </Button>
                  <Button
                    $backgroundColor="gray"
                    onClick={() => handleDeleteButtonClick(todo.id)}
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
  flex-wrap: wrap;
`;

const StTodo = styled.div`
  border: 2px solid lightcoral;
  width: 370px;
  height: 120px;
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
