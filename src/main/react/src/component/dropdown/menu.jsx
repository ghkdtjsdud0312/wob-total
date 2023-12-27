import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MenuContainer = styled.div`
  background-color: #fff;
  color: #ed342e;
  display: flex;
  position: fixed;
  bottom: 12%;
  right: -1%;
  width: 200px;
  height: 76%;
  border-radius: 0.35rem;
  opacity: 0.9;
  border: 1px solid #ed342e;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  z-index: 1000;
  transition: all 0.5s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
`;

const MenuItem = styled.div`
  margin: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const menuOptions = {
  user: {
    menuItem1: "기업 리뷰",
    menuItem2: "채용 공고",
    menuItem3: "글쓰기",
    menuItem4: "숨쉬기",
  },
  admin: {
    menuItem1: "회원정보 관리",
    menuItem2: "게시글 관리",
    menuItem3: "채용 공고 관리",
    menuItem4: "광고 관리",
  },
  guest: {
    menuItem1: "기업 리뷰",
    menuItem2: "채용 공고",
    menuItem3: "글쓰기",
    menuItem4: "로그인",
  },
};

const Menu = ({ user, open }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  // 사용자의 타입에 따른 메뉴 정보 가져오기
  const { menuItem1, menuItem2, menuItem3, menuItem4 } =
    menuOptions[user] || menuOptions["guest"];

  // 메뉴 항목 클릭 시 해당 URL로 이동하는 함수
  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "로그인":
        // 로그인 항목 클릭 시 특별한 동작 수행 (예: 모달 열기, 함수 호출 등)
        navigate("/LoginPage");
        break;
      case "기업 리뷰":
        navigate("/companyInfo");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <MenuContainer open={open}>
      {/* 동적으로 메뉴 항목 생성 */}
      {[menuItem1, menuItem2, menuItem3, menuItem4].map((item, index) => (
        <MenuItem key={index} onClick={() => handleMenuClick(item)}>
          {item}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};
export default Menu;
