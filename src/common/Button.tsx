import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonProps = {
  $backgroundColor?: string;
  onClick: () => void;
};

export const Button = ({
  children,
  $backgroundColor,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StBtn $backgroundColor={$backgroundColor} onClick={onClick}>
      {children}
    </StBtn>
  );
};

const StBtn = styled.button<ButtonProps>`
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "lightcoral"};
  color: white;
  padding: 0.5rem;
  border-radius: 0.2rem;
`;
