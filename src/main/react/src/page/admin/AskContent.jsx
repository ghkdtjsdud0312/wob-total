// 관리자 1:1 문의 채팅 관리
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";

// 전체 큰 틀css
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;

    span {
      font-size: 40px;
      font-weight: bold;
    }
  }
`;

// 게시판 목록 페이지
const AskContent = () => {
  return (
    <BoardContainer>
      <div className="Logo">
        <FullLogoBth />
        <span>관리자 1:1 채팅 목록</span>
      </div>

      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </BoardContainer>
  );
};

export default AskContent;
