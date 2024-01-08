import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import { formatDate } from "../../utils/Common";
import Modal from "../../utils/Modal";
import { Container } from "../../component/Container";

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
  right: 10%;
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ModalText1 = styled.p`
  font-size: 1.3rem;
  white-space: nowrap;
  width: 30%;
`;
const ModalText2 = styled.input`
  font-size: 24px;
  width: 60%;
`;

const FreeChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const navigate = useNavigate();

  // 모달 닫기 버튼
  const closeModal = () => {
    setModalOpen(false);
  };

  // 채팅방 생성하는 코드
  const confirmModal = async () => {
    if (isTitle) {
      try {
        const response = await SettingAxiosApi.freeChatCreate(chatRoomTitle);
        console.log(response.data);
        navigate(`/chatting/${response.data}`);
      } catch (e) {
        alert("error : 채팅방을 생성하지 못했습니다.");
      }
    } else {
      alert("방 제목을 입력해주세요.");
    }
  };

  useEffect(() => {
    // 서버로부터 채팅방 목록을 가져오는 API 호출
    const getChatRoom = async () => {
      try {
        const rsp = await SettingAxiosApi.freeChatList();
        setChatRooms(rsp.data);
      } catch (e) {
        alert(
            "error : 채팅방 목록을 불러오지 못했습니다. 이전 페이지로 이동합니다."
        );
        navigate(-1);
      }
    };
    const intervalID = setInterval(getChatRoom, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  // 채팅방으로 이동하는 로직 작성
  const enterChatRoom = (roomId) => {
    navigate(`/chatting/${roomId}`);
  };

  // 채팅방 생성하기 위해 방제목 입력하는 모달 띄우기
  const createChatRoom = () => {
    setModalOpen(true);
  };

  // 채팅방 제목 저장
  const onChangeTitle = (e) => {
    if (e.target.value === null && "") {
      setIsTitle(false);
    } else {
      setChatRoomTitle(e.target.value);
      setIsTitle(true);
    }
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
          <Modal
              open={modalOpen}
              close={closeModal}
              confirm={confirmModal}
              type={true}
              header="새 채팅방 제목을 입력해주세요."
          >
            <ModalContainer>
              <ModalText1>방제목</ModalText1>
              <ModalText2
                  value={chatRoomTitle}
                  onChange={onChangeTitle}
              ></ModalText2>
            </ModalContainer>
          </Modal>
        </Container>
      </>
  );
};
export default FreeChat;
