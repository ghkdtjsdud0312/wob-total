// 전체 결제 내역 관리(전체 결제 내역 목록)
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import { useNavigate } from "react-router-dom";

// 전체 큰 틀css
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;
    cursor: pointer;

    span {
      font-size: 40px;
      font-weight: bold;
    }
  }
`;

// 게시판 목록 페이지
const AllPaymentList = () => {
  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <BoardContainer>
      <div className="Logo" onClick={() => handleClick("/AdminMain")}>
        <FullLogoBth />
        <span>전체 결제 내역 목록</span>
      </div>

      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </BoardContainer>
  );
};

export default AllPaymentList;
