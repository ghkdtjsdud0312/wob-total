import styled from "styled-components";

const WhiteBoard = styled.div`
  background-color: #fff;
  border-radius: 70px 70px 0 0;
  height: 90vh;
  width: 768px;
  position: fixed;
  padding-top: 80px;
  bottom: 0;
  transition: transform 0.5s ease-in-out;
  transform: translateY(${(props) => (props.show ? "0" : "100%")});
  overflow: hidden;
`;

export { WhiteBoard };
