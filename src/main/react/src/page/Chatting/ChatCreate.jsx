import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SettingAxiosApi from "../../api/SettingAxiosApi";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격

  &.btn1 {
    margin-top: 5%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ChatCreate = () => {
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const navigate = useNavigate();

  const createChatRoom = async () => {
    try {
      const response = await SettingAxiosApi.freeChatCreate(chatRoomTitle);
      console.log(response.data);
      navigate(`/chatting/${response.data}`);
    } catch (e) {
      console.log("error : ", e);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <SettingHeader title={"채팅방생성"} />
      <Container>
        <ButtonContainer className="btn1">
          <Input
            type="text"
            value={chatRoomTitle}
            onChange={(e) => setChatRoomTitle(e.target.value)}
          />
        </ButtonContainer>

        <ButtonContainer>
          <Button onClick={createChatRoom}>확인</Button>
          <Button onClick={handleCancel}>취소</Button>
        </ButtonContainer>
      </Container>
    </>
  );
};
export default ChatCreate;
