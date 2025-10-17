import styled from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

export const SummaryCard = styled.div`
  background-color: ${(props) => props.theme["gray-700"]};
  border-radius: 6px;
  padding: 18px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 60px;
    font-size: 2rem;
  }
`;
