// 회원 목록
import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import AdminAxiosApi from "../../api/AdminAxiosApi";
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

const Tr2 = ({ data, index, setIsChange }) => {
  const [userContent, setUserContent] = useState("");
  const [userActive, setUserActive] = useState(true); // 회원 셀렉트 활성화 비활성화
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
    console.log("Data in Tr component:", data);
    console.log("수정 데이터 : ", data.id, userContent);
    const rsp = await AdminAxiosApi.userListState(data.id, userContent);
    console.log("rsp : ", rsp.data);
    if (rsp.data) {
      alert("해당 회원이 승인되었습니다.");
      setModalOpen(false); // 모달 여는 것
      setIsChange(true);
      setConfirmRevise(false);
      setUserActive(true);
    } else {
      alert("해당 회원이 수정되지 않았습니다.");
    }
  };

  // 삭제
  const deleteModal = async () => {
    console.log("Data in Tr2 component:", data);
    console.log("삭제 데이터 : ", data.email);
    const resp = await AdminAxiosApi.userDelete(data.email);
    console.log("resp : ", resp.data);
    if (resp.status === 200) {
      alert("해당 회원정보가 삭제 되었습니다.");
      setModalOpen(false);
      setIsChange(true);
    } else {
      alert("해당 회원정보가 삭제되지 않았습니다.");
    }
  };

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setUserActive(false);
    setConfirmRevise(true);
  };

  // 게시글 활성화 또는 비활성화 요청 보내기
  const handleSelectChange = (e) => {
    setUserContent(e.target.value);
    console.log(userContent);
  };
  // 확인에서 수정된 값 들어감
  const clickOn = async () => {
    setIsOpen(true);
    setModalText("상태를 변경하시겠습니까?");
    setModalOpen(true);
  };

  // 회원 삭제 모달
  const clickDelete = () => {
    setIsOpen(false);
    setModalText("해당 회원을 삭제하시겠습니까?");
    setModalOpen(true);
  };

  return (
    <TrComp $active={data.active === "active"}>
      {/* 숫자 자동증가 */}
      <td className="center">{index + num}</td>
      <td>{data.email}</td>
      <td>{data.nickname}</td>
      <td>{data.withdrawal}</td>
      <td>{data.selectedAgreement}</td>
      <td>{data.name}</td>
      <td>{data.phoneNumber}</td>
      <td isEnabled={data.active}>{data.active}</td>
      {/* 셀렉트 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={userActive}
          value={userContent}
          onChange={handleSelectChange}>
          <option value="active">활동계정</option>
          <option value="inactive">휴먼계정</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button type="button" label="확인" size="normal" onClick={clickOn} />
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
          value={data.email}
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
export default Tr2;
