// 관리자 메인 페이지
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/admin/Layout";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    cursor: pointer;
  }
  span {
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
  }
`;

const Buttons = styled.div`
  margin: 30px 10px;
`;

const Click = styled.div`
  background-color: #dfede9;
  border-radius: 20px;
  margin: 20px;
  padding: 30px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  box-shadow: 1px 2px 3px #353535;
  cursor: pointer;

  &:hover {
    background-color: #04bf8a;
  }
`;

const AdminMain = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <div className="Logo" onClick={() => handleNavigate("/")}>
        <FullLogoBth />
      </div>
      <span>관리자 메뉴</span>
      <Buttons>
        <Click onClick={() => handleNavigate("/AllMemberInfo")}>
          전체 회원 관리
        </Click>
        <Click onClick={() => handleNavigate("/AllPaymentContent")}>
          전체 결제 내역 관리
        </Click>
        <Click onClick={() => handleNavigate("/AllBoardContent")}>
          전체 종목 관리
        </Click>
        <Click onClick={() => handleNavigate("/Advertising")}>광고 관리</Click>
      </Buttons>
      <Layout />
    </Container>
  );
};

export default AdminMain;
