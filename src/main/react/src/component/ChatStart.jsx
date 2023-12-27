import styled from "styled-components";
import { useState } from "react";
import SettingAxiosApi from "../api/SettingAxiosApi";
import Common from "../utils/Common";
import { useNavigate } from "react-router-dom";

const ChatBtn = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ChatStart = ({ postId, children }) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState();

  // 채팅방 생성
  const handleCreateChatRoom = async () => {
    // 1. 해당 게시글의 roomId 값 조회
    const rsp = await SettingAxiosApi.postListById(postId); // postId 값 전달
    console.log("해당 게시글의 roomId 조회 : " + rsp.data.roomId);
    setRoomId(rsp.data.roomId);
    console.log("setRoomId : " + roomId);
    // 2. 해당 게시글의 roomId가 공백이면 ( 첫 채팅방 생성 ) 채팅방 생성하기.
    if (rsp.data.roomId === null) {
      const accessToken = Common.getAccessToken();
      try {
        // 채팅방 제목 전달하여 roomId 받아오기
        const response = await SettingAxiosApi.chatCreate(
          rsp.data.title,
          postId
        );
        const req = await SettingAxiosApi.postAddRoomId(postId, response.data);
        console.log("rsq.data : ", req.data);
        navigate(`/Chatting/${response.data}`);
      } catch (e) {
        if (e.response.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const response = await SettingAxiosApi.chatCreate(rsp.data.title);
            navigate(`/Chatting/${response.data}`);
          }
        }
      }
    } else {
      // 만약 이미 채팅방이 생성되어 있다면, 새로 생성하지 않고 채팅방 입장.
      navigate(`/Chatting/${rsp.data.roomId}`);
    }
  };
  return (
    <>
      <ChatBtn onClick={handleCreateChatRoom}>{children}</ChatBtn>
    </>
  );
};
export default ChatStart;
