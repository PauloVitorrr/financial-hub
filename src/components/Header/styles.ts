import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme["gray-900"]};
  padding: 38px 0;
`;

export const HeaderContent = styled.div`
  width: 100%;
  h1 {
    text-align: center;
  }
`;
