// Layout.js

import React from "react";
import Footer from "./Footer"; // 푸터 컴포넌트 불러오기
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 768px;
  margin: 0px auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 768px;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FooterContainer = styled.div`
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  align-items: center;
  width: 768px;
  margin: 0px auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Layout = () => (
  <>
    <MainContainer>
      <Header />
      <ContentContainer>
        <Outlet />
        <FooterContainer>
          <Footer /> {/* 푸터 표시 */}
        </FooterContainer>
      </ContentContainer>
    </MainContainer>
  </>
);

export default Layout;
