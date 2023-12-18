import React, { useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Button } from "../common/Button";
import { Todo } from "../types/types";
import { completeData, deleteData, getData } from "../apis/todos";
import { useQuery } from "@tanstack/react-query";
import { deleteTodo, completeTodo } from "../redux/modules/todosSlice";

const TodoList = ({ listIsDone }: { listIsDone: boolean }) => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getData,
  });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteButtonClick = (id: string) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      cancelButtonColor: "gray",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteTodo(id));
          await deleteData(id);
          refetch();
        } catch (error) {
          console.log("Error:", error);
        }
      }
    });
  };

  const handleCompleteButtonClick = async (id: string, isDone: boolean) => {
    dispatch(completeTodo(id));
    try {
      await completeData(id, isDone);
      refetch();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>알 수 없는 문제가 발생하였습니다.</div>;
  }

  return (
    <StTodoListContainer>
      <StTitle>{listIsDone ? "Done..!" : "Working.."}</StTitle>
      <StTodoWrapper>
        {data
          .filter((todo: Todo) => todo.isDone === listIsDone)
          .map((todo: Todo) => {
            return (
              <StTodo key={todo.id}>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.contents}</p>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      handleCompleteButtonClick(todo.id, todo.isDone)
                    }
                  >
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
