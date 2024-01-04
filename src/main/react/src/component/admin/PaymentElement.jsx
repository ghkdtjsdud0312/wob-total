// 결제 목록
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
      font-size: 15px;
    }
  }
`;

const Tr4 = ({ data, index, setIsChange }) => {
  const [paymentContent, setPaymentContent] = useState("");
  const [categoryActive, setCategoryActive] = useState(true); // 결제 셀렉트 활성화 비활성화
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
    console.log("Data in Tr4 component:", data);
    console.log("수정 데이터 : ", data.id, paymentContent);
    const rsp = await AdminAxiosApi.paymentListState(data.id, paymentContent);
    console.log("rsp : ", rsp.data);
    if (rsp.data) {
      alert("해당 결제가 승인되었습니다.");
      setModalOpen(false);
      setIsChange(true);
      setConfirmRevise(false);
      setCategoryActive(true);
    } else {
      alert("해당 결제가 수정되지 않았습니다.");
    }
  };

  // 삭제 모달
  const deleteModal = async () => {
    const rsp = await AdminAxiosApi.paymentDelete(data.id);
    console.log(data.id);
    if (rsp.status === 200) {
      alert("해당 결제내역이 삭제 되었습니다.");
      setModalOpen(false);
      setIsChange(true);
    } else {
      alert("해당 결제내역이 삭제되지 않았습니다.");
    }
  };

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setCategoryActive(false);
    setConfirmRevise(true);
  };

  // 결제 활성화 또는 비활성화 요청 보내기
  const handleSelectChange = (e) => {
    setPaymentContent(e.target.value);
    console.log(paymentContent);
  };
  // 확인에서 수정된 값 들어감
  const clickOn = async () => {
    setIsOpen(true);
    setModalText("상태를 변경하시겠습니까?");
    setModalOpen(true);
  };

  // 등록한 결제 삭제
  const clickDelete = () => {
    setIsOpen(false);
    setModalText("해당 결제를 삭제하시겠습니까?");
    setModalOpen(true);
  };

  return (
    <TrComp $active={data.active === "active"}>
      {/* 숫자 자동증가 */}
      <td className="center">{index + num}</td>
      <td>{data.orderNum}</td> {/* 주문번호 */}
      <td>{data.userEmail}</td> {/* 주문자 이메일 */}
      <td>{data.userName}</td> {/* 주문자 이름 */}
      <td>{data.phoneNum}</td> {/* 주문자 전화번호 */}
      <td>{data.fee}</td> {/* 주문 금액 */}
      <td>{data.postUserName}</td> {/* 강사명 */}
      <td>{data.postPhoneNum}</td> {/* 강사 전화번호 */}
      <td isEnabled={data.active}>{data.active}</td>
      {/* 셀렉트 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          value={paymentContent}
          onChange={handleSelectChange}>
          <option value="active">결제승인</option>
          <option value="inactive">결제미승인</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button type="button" label="확인" size="normal" onClick={clickOn} />
        ) : (
          <Button
            type="button"
            label="수정"
            size="normal"
            onClick={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          type="button"
          label="삭제"
          size="normal"
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
export default Tr4;
