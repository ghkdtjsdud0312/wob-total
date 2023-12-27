// 광고 목록
import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import Modal from "../../utils/Modal";

const TrComp = styled.tr`
  td {
    outline: 1px solid #dce0df;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    width: 50px;
    vertical-align: middle;

    &.center {
      text-align: center;
    }
    &.image {
      .imgBox {
        width: 30%;
        padding-bottom: 30%;
        img {
          width: 80px;
          height: 70px;
        }
      }
    }
    &.selectBox {
      select {
        outline: none;
        padding: 6px;
        &:disabled {
          opacity: 1;
        }

        option {
        }
      }
    }
  }
`;

const Tr3 = ({ data, index }) => {
  const [categoryContent, setCategoryContent] = useState("");
  const [categoryActive, setCategoryActive] = useState(true);
  const [confirmRevise, setConfirmRevise] = useState(false);
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
    console.log("수정 데이터 : ", data.categoryId, categoryContent);
    const rsp = await AdminAxiosApi.categoryListState(
      data.categoryId,
      categoryContent
    );
    console.log("rsp : ", rsp.data);
    if (rsp.data) {
      alert("해당 광고가 수정되었습니다.");
      setModalOpen(false);
    } else {
      alert("해당 광고가 수정되지 않았습니다.");
    }
  };

  // 삭제 모달
  const deleteModal = async () => {
    const rsp = await AdminAxiosApi.boardDelete(data.categoryId);
    console.log(data.categoryId);
    if (rsp.status === 200) {
      alert("해당 광고가 삭제 되었습니다.");
      setModalOpen(false);
    } else {
      alert("해당 광고가 삭제되지 않았습니다.");
    }
  };

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setCategoryActive(false);
    setConfirmRevise(true);
  };

  // 게시글 활성화 또는 비활성화 요청 보내기
  const handleSelectChange = (e) => {
    setCategoryContent(e.target.value);
    console.log(categoryContent);
  };
  // 확인에서 수정된 값 들어감
  const clickOn = async () => {
    setIsOpen(true);
    setModalText("상태를 변경하시겠습니까?");
    setModalOpen(true);
  };

  // 광고 삭제
  const clickDelete = () => {
    setIsOpen(false);
    setModalText("광고를 삭제하시겠습니까?");
    setModalOpen(true);
  };

  return (
    <TrComp>
      {/* 숫자 자동증가 */}
      <td className="center">{index + num}</td>
      <td>{data.categoryName}</td>
      <td className="image">
        <span className="imgBox">
          <img src={data.image} alt="logo" />
        </span>
      </td>
      <td>{data.period}</td>
      <td>{data.fee}</td>
      <td>{data.regDate}</td>
      {/* 셀렉트 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          value={categoryContent}
          onChange={handleSelectChange}>
          <option value="active">활동게시글</option>
          <option value="inactive">비활동게시글</option>
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
export default Tr3;
