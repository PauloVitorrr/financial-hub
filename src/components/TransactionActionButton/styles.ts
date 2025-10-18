import styled from "styled-components";

interface ButtonTableProps {
  variant?: "delete" | "view" | "edit";
}

export const ButtonTable = styled.button<ButtonTableProps>`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme["white"]};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.variant === "delete"
        ? props.theme["red-300"]
        : props.theme["green-500"]};
  }
`;
