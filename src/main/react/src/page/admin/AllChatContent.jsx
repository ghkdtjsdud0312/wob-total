// 관리자 채팅방 관리
import React, { useState, useEffect } from "react";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import Tr5 from "../../component/admin/ChatElement";

// 전체 큰 틀css
const ChatContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;
    cursor: pointer;
  }

  // 채팅방 목록 css
  p {
    text-align: center;
    font-size: 45px;
    padding-bottom: 50px;
  }

  .tableBox {
    //table 표
    table {
      margin: 0 auto;
      thead {
        tr {
          th {
            padding: 20px 10px;
            font-size: 20px;
            white-space: nowrap;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          white-space: nowrap;
        }
      }
    }
  }
  @media screen and (max-width: 430px) {
    padding-top: 60px;
    p {
      font-size: 30px;
      padding-bottom: 30px;
    }
    .tableBox {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      table {
        width: auto;
        thead {
          tr {
            th {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
`;

// 등록 버튼
const Buttons = styled.div`
  border: 1px solid white;
  background-color: white;
  width: 100%;
  text-align: center;
  color: none;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
    cursor: pointer;
    color: none;
  }
  @media screen and (max-width: 430px) {
    button {
      padding: 10px;
      font-size: 13px;
      margin: 15px 10px;
    }
  }
`;

// 채팅 목록 페이지
const AllChatContent = () => {
  // 맵 돌릴 리스트
  const [chatList, setChatList] = useState([]); // 채팅방 리스트
  const [num, setNum] = useState(1); // 인덱스 번호
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  // 수정 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };

  // 채팅 목록 데이터 렌더링
  useEffect(() => {
    const chatLists = async () => {
      const rsp = await SettingAxiosApi.chatList();
      console.log("rsp.data : ", rsp.data);
      if (rsp.data) {
        console.log("정상출력");
        setChatList(rsp.data);
      }
    };
    chatLists();
  }, [isChange]);

  return (
    <ChatContainer>
      <div className="Logo" onClick={() => handleClick("/AdminMain")}>
        <FullLogoBth />
      </div>
      <p>전체 관리자 1:1 문의 목록</p>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>보낸사람</th>
              <th>방번호</th>
              <th>채팅내용</th>
              <th>상태</th>
              <th>분류선택</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* map으로 반복할 요소 */}
            {chatList &&
              chatList.map((data, index) => (
                <Tr5
                  key={data.id} // 고유한 키 생성
                  data={data}
                  index={index + num}
                  active={data.active === "active"}
                  setIsChange={setIsChange}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Buttons>
        <button onClick={() => handleClick("/AdminMain")}>뒤로가기</button>
      </Buttons>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </ChatContainer>
  );
};

export default AllChatContent;
