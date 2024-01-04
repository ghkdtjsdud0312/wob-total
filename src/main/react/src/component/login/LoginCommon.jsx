import styled from "styled-components";
const InputBar = styled.input`
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 20px;
  width: 400px;
  &:focus {
    outline: 2px solid #04bf8a;
  }
  @media only screen and (max-width: 768px) {
    width: 350px;
  }
`;
const AuthInputBar = styled.input`
  margin: 5px;
  border: none;
  border-radius: 30px;
  padding: 20px;
  width: 280px;
  &:focus {
    outline: 2px solid #04bf8a;
  }
  @media only screen and (max-width: 768px) {
    width: 230px;
  }
`;

const GreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 20px;
  width: 400px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      cursor: pointer;
    }
  `}
  @media only screen and (max-width: 768px) {
    width: 350px;
  }
`;

const BlackButton = styled.button`
  background-color: #353535;
  color: #fff;
  font-size: 13px;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 190px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    width: 165px;
  }
`;
export { InputBar, AuthInputBar, GreenButton, BlackButton };
