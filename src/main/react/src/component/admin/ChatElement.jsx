// 채팅방 목록
import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import Modal from "../../utils/Modal";

const TrComp = styled.tr`
  td {
    outline: 1px solid #dce0df;
    padding: 15px;
    text-align: center;
    width: 50px;
    vertical-align: middle;
    background-color: ${(props) => (props.$active ? "white" : "#c4c1c1")};

    &.center {
      text-align: center;
    }

    &.selectBox {
      select {
        outline: none;
        padding: 6px;
        &:disabled {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: 430px) {
    td {
      font-size: 13px;
    }
  }
`;

const Tr5 = ({ data, index, setIsChange }) => {
  const [chatContent, setChatContent] = useState("");
  const [chatActive, setChatActive] = useState(true); // 채팅방 셀렉트 활성화 비활성화
  const [confirmRevise, setConfirmRevise] = useState(false); // 수정 -> 확인
  const [num, setNum] = useState(0); // 인덱스 번호

  // 모달 관련 변수
  const [isOpen, setIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState(false);

  // 닫는 모달
  const closeModal = () => {
    setModalOpen(false);
  };

  // 수정 모달창
  const confirmModal = async () => {
    console.log("Data in Tr5 component:", data);
    console.log("수정 데이터 : ", data.id, chatContent);
    const rsp = await SettingAxiosApi.stateChat(data.id, chatContent);
    console.log("rsp : ", rsp.data);
    if (rsp.data) {
      alert("해당 채팅방이 수정되었습니다.");
      setModalOpen(false);
      setIsChange(true);
      setConfirmRevise(false);
      setChatActive(true);
    } else {
      alert("해당 채팅방이 수정되지 않았습니다.");
    }
  };

  // 삭제 모달
  const deleteModal = async () => {
    console.log("Data in Tr5 component:", data);
    console.log("삭제 데이터 : ", data.id);
    const rsp = await SettingAxiosApi.chatDelete(data.id);
    console.log("rsp : ", rsp.data);
    if (rsp.status === 200) {
      alert("해당 채팅이 삭제 되었습니다.");
      setModalOpen(false);
      setIsChange(true);
    } else {
      alert("해당 채팅이 삭제되지 않았습니다.");
    }
  };

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setChatActive(false);
    setConfirmRevise(true);
  };

  // 채팅 활성화 또는 비활성화 요청 보내기
  const handleSelectChange = (e) => {
    setChatContent(e.target.value);
    console.log(chatContent);
  };
  // 확인에서 수정된 값 들어감
  const clickOn = async () => {
    setIsOpen(true);
    setModalText("상태를 변경하시겠습니까?");
    setModalOpen(true);
  };

  // 채팅 삭제
  const clickDelete = () => {
    setIsOpen(false);
    setModalText("채팅을 삭제하시겠습니까?");
    setModalOpen(true);
  };

  return (
    <TrComp $active={data.active === "active"}>
      {/* 숫자 자동증가 */}
      <td className="center">{index + num}</td>
      <td>{data.sender}</td> {/* 메세지보낸사람 */}
      <td>{data.roomId}</td> {/* 채팅방번호 */}
      <td>{data.message}</td> {/* 채팅방 내용 */}
      <td isEnabled={data.active}>{data.active}</td>
      {/* 셀렉트 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={chatActive}
          value={chatContent}
          onChange={handleSelectChange}>
          <option value="active">답변 진행중</option>
          <option value="inactive">답변 완료</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button type="button" label="확인" size="small" onClick={clickOn} />
        ) : (
          <Button
            type="button"
            label="수정"
            size="small"
            onClick={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          type="button"
          label="삭제"
          size="small"
          value={data.id}
          onClick={clickDelete}
        />
      </td>
      {isOpen ? (
        <Modal // 수정 모달
          open={modalOpen}
          close={closeModal}
          confirm={confirmModal}
          type={true}
          header="안내">
          {modalText}
        </Modal>
      ) : (
        <Modal // 삭제 모달
          open={modalOpen}
          close={closeModal}
          confirm={deleteModal}
          type={true}
          header="안내">
          {modalText}
        </Modal>
      )}
    </TrComp>
  );
};
export default Tr5;
