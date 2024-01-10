import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;
const FooterContainer = styled.div`
  background-color: white;
  display: flex;
  position: fixed;
  bottom: 0;
`;

const SettingLayout = () => {
  // Footer만 고정인 Layout
  return (
    <>
      <Outlet />
      <Container>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Container>
    </>
  );
};
export default SettingLayout;
