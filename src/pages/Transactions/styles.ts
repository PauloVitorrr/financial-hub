import styled from "styled-components";

export const Main = styled.main`
  max-width: 1120px;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding-top: 60px;
`;

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  /* margin-top: 1.5rem; */

  td {
    padding: 1.25rem 1.9rem;
    background: ${(props) => props.theme["gray-800"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

interface PriceHighLightProps {
  variant: "entrada" | "saída";
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === "entrada"
      ? props.theme["green-300"]
      : props.theme["red-300"]};
`;

export const ButtonDelete = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme["white"]};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme["red-300"]};
  }
`;
