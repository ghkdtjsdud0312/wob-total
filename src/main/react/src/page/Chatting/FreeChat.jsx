import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import { formatDate } from "../../utils/Common";
const Container = styled.div`
  position: relative;
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  min-height: 800px;
  margin: 0px auto;
  margin-bottom: 100px;
`;

const ChatUl = styled.ul`
  list-style-type: none;
  margin-top: 20px;
  padding: 0;
`;

const ChatRoom = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--MINT);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 0 10px 0;
  color: #444;
`;
const ChatDate = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0;
  text-align: right;
`;
const CircleFixedButton = styled.button`
  position: fixed; // 버튼을 부모 컨테이너에 대해 절대적 위치로 설정
  bottom: 100px;
  right: 30%;
  z-index: 10;

  width: 60px; // 버튼의 크기를 정사각형으로 설정
  height: 60px; // 버튼의 크기를 정사각형으로 설정
  border-radius: 50%; // 동그란 모양으로 만들기 위해 반지름을 50%로 설정

  display: flex; // Flexbox 레이아웃 사용
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬

  background-color: var(--GREEN); // 트위터 색상
  color: white;
  font-size: 30px; // 플러스 기호 크기
  line-height: 1; // 기본 라인 높이 제거
  // 그림자 효과
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);

  border: none; // 기본 테두리 제거
  cursor: pointer;
  outline: none; // 클릭 시 테두리 제거

  &:hover {
    background-color: var(--GREEN); // 호버 시 배경색 변경
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.4);
  }

  &:before {
    // 가상 요소로 플러스 기호 생성
    content: "+";
  }
`;

const ChatLegnthZero = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
const FreeChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 채팅방 목록을 가져오는 API 호출
    const getChatRoom = async () => {
      try {
        const rsp = await SettingAxiosApi.freeChatList();
        setChatRooms(rsp.data);
      } catch (e) {
        console.log("error : " + e);
      }
    };
    const intervalID = setInterval(getChatRoom, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const enterChatRoom = (roomId) => {
    // 채팅방으로 이동하는 로직 작성
    console.log(`Entering chat room ${roomId}`);
    navigate(`/chatting/${roomId}`);
  };

  const createChatRoom = () => {
    navigate("/ChatCreate");
  };
  return (
    <>
      <SettingHeader title="자유채팅방" />
      <Container>
        {chatRooms.length === 0 && (
          <ChatLegnthZero>
            <p>현재 진행 중인 채팅방이 없습니다.</p>
          </ChatLegnthZero>
        )}
        <ChatUl>
          {chatRooms.map((room) => (
            <ChatRoom
              key={room.roomId}
              onClick={() => enterChatRoom(room.roomId)}
            >
              <ChatName>{room.name}</ChatName>
              <ChatDate>{formatDate(room.regDate)}</ChatDate>
            </ChatRoom>
          ))}
        </ChatUl>
        <CircleFixedButton onClick={createChatRoom}></CircleFixedButton>
      </Container>
    </>
  );
};
export default FreeChat;
