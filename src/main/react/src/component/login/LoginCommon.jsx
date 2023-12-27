import styled from "styled-components";
const InputBar = styled.input`
  margin: 5px;
  border: none;
  border-radius: 30px;
  padding: 15px;
  width: 250px;
  &:focus {
    outline: 2px solid #04bf8a;
  }
`;
const AuthInputBar = styled.input`
  margin: 5px;
  border: none;
  border-radius: 30px;
  padding: 15px;
  width: 160px;
  &:focus {
    outline: 2px solid #04bf8a;
  }
`;

const GreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 250px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      cursor: pointer;
    }
  `}
`;

const BlackButton = styled.button`
  background-color: #353535;
  color: #fff;
  font-size: 13px;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 120px;
  &:hover {
    cursor: pointer;
  }
`;
export { InputBar, AuthInputBar, GreenButton, BlackButton };
