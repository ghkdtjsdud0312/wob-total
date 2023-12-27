import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  color: --var(MINT);
  align-items: center;
  width: 100%;
`;

const HeaderBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
`;

const BackBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  cursor: pointer;

  img {
    width: 80%;
    height: 60%;
  }
`;

const MenuText = styled.div`
  // 부모로부터 텍스트 중앙 정렬
  position: absolute;
  left: 45%;
  font-size: 28px;
`;

const SettingHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderBox>
        <BackBtn onClick={() => navigate(-1)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%EB%92%A4%EB%A1%9C%EA%B0%80%EA%B8%B0%EB%B2%84%ED%8A%BC.png?alt=media&token=5fab2a09-453f-4736-8d86-3ac2850a7007"
            alt="뒤로가기버튼"
          />
        </BackBtn>
        <MenuText>{title}</MenuText>
      </HeaderBox>
    </Container>
  );
};
export default SettingHeader;
