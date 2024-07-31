import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const LeftPanel = styled.div`
  width: 342px;
  padding-left: 60px;
  box-sizing: border-box;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  padding-top: 47px;
`;

export const RightPanel = styled.div`
  width: 1039px;
  background-color: white;
  min-height: 865px;
  margin-bottom: 85px;
`;

export const Button = styled.button`
  font-size: 16px;
  color: #bababa;
  background-color: transparent;
  border: none;
  margin-top: 36px;
  text-align: left;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    color: var(--color-blue);
  `}
`;

export const logoutButton = styled.button`
  font-size: 16px;
  color: black;
  background-color: transparent;
  border: none;
  margin-top: 60px;
  text-align: left;
  cursor: pointer;
`;
