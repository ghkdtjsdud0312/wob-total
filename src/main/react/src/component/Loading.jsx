import styled from "styled-components";

const Background = styled.div`
  margin: 0px auto;
  width: 768px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const LoadingImg = styled.img`
  margin-top: 20px;
  width: 50px;
  height: 50px;
`;
const LoadingText = styled.p`
  font-size: 20px;
`;
const Loading = ({ text }) => {
    return (
        <Background>
            <LoadingText>{text}</LoadingText>
            <LoadingImg
                src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/Rolling-1s-200px.gif?alt=media&token=341ea6d7-9089-466e-8ca1-4eccd3b5974e"
                alt="로딩"
            />
        </Background>
    );
};
export default Loading;
