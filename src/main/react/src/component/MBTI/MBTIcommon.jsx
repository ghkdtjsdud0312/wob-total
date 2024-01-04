import styled from "styled-components";

const TitleAlign = styled.h2`
  text-align: center;
  color: #353535;
`;

const TextAlign = styled.div`
  text-align: center;
  color: #353535;
`;

const SelectButton = styled.button`
  padding: 15px 20px;
  font-size: 1em;
  background-color: ${(props) => (props.selected ? "#04bf8a" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "inherit")};
  border: 1px solid ${(props) => (props.selected ? "#04bf8a" : "#353535")};
  border-radius: 30px;
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #04bf8a;
    color: ${(props) => (props.selected ? "#fff" : "#04bf8a")};
  }
  @media only screen and (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.8em;
  }
`;

const InputBar = styled.input`
  font-size: 20px;
  border: 1px solid ${(props) => (props.hasValue ? "#04bf8a" : "#353535")};
  border-radius: 30px;
  padding: 20px 60px;
  grid-column: span 2;
  background-color: ${(props) => (props.disabled ? "#ebebeb" : "transparent")};
  color: ${(props) => (props.disabled ? "gray" : "inherit")};
  &:focus {
    outline-color: #04bf8a;
  }
`;

const NextButton = styled.button`
  padding: 20px 60px;
  background-color: #04bf8a;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
  color: #fff;
  border: 1px solid gray;
  border-radius: 30px;
  grid-column: span 2;
  cursor: ${(props) =>
    props.active ? "pointer" : "default"}; /* 포인터가 생기도록 설정 */
  &:focus {
    outline: none;
  }
`;
export { TitleAlign, TextAlign, SelectButton, InputBar, NextButton };
