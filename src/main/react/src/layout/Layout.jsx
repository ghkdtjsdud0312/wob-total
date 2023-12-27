// Layout.js

import React from "react";
import Footer from "./Footer"; // 푸터 컴포넌트 불러오기
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;
const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
`;

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Container>
      <FooterContainer>
        <Footer /> {/* 푸터 표시 */}
      </FooterContainer>
    </Container>
  </>
);

export default Layout;
