import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Common from "../../utils/Common";
import SettingAxiosApi from "../../api/SettingAxiosApi";
const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SettingBtn = styled.button`
  width: 100%;
  height: 100px;
  display: flex;
  position: relative;
  align-items: center;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  cursor: pointer;

  img {
    width: 55px;
    height: 55px;
    margin-left: 50px;
  }

  .text {
    margin-left: 50px;
    font-size: 26px;
  }
  .pointer {
    position: absolute;
    right: 50px;
    font-size: 30px;
  }
`;

const Setting = () => {
  const navigate = useNavigate();

  return (
    <>
      <SettingHeader title="환경설정" />
      <Container>
        <SettingBtn onClick={() => navigate("/Account")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/person.png?alt=media&token=18faf370-c600-429b-acfe-a9202ec49dee"
            alt="계정관리"
          />
          <span className="text">계정관리</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => navigate("/Questions")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/question.png?alt=media&token=90479a46-00a2-4e88-b367-c22a1acd6c10"
            alt="문의하기"
          />
          <span className="text">문의하기</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => navigate("/PaymentDetails")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/won.png?alt=media&token=6e1058ae-9f43-4c10-add5-6e2f1a79531e"
            alt="결제내역"
          />
          <span className="text">결제내역</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => navigate("/Policy")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/insurance.png?alt=media&token=09236ab0-25ed-41b6-b0d5-ea45e88b87e4"
            alt="정책및약관"
          />
          <span className="text">정책 및 약관</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
      </Container>
    </>
  );
};
export default Setting;
