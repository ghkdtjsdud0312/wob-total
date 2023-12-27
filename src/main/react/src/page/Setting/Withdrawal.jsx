import { useNavigate } from "react-router-dom";
import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useState } from "react";
import Button from "../../component/Button";
import Modal from "../../utils/Modal";
import SettingAxiosApi from "../../api/SettingAxiosApi";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  height: 1200px;
  margin: 0px auto;
`;

const SubContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 768px;
  min-height: 100px;
  padding-top: 70px;
  padding-left: 150px;
  line-height: 35px;

  .title {
    font-size: 32px;
  }
  .subTitle {
    font-size: 24px;
  }
  &.radio {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 설정 */
  }
  .lastText {
    color: #ff3e3e;
  }
  .btn {
    margin-left: 80%;
  }
`;
const RadioBtn = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: var(--GREEN);
    border: 3px solid white;
    box-shadow: 0 0 0 1.6px var(--GREEN);
  }
`;
const RadioContainer = styled.label`
  margin: 0;
  margin-bottom: 10px;
`;
const Withdrawal = () => {
  const navigate = useNavigate();
  const [radio, setRadio] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈
  const [modalText, setModelText] = useState("정말 탈퇴 하시겠습니까?"); // 모달에 넣을 내용

  // Modal 닫기 눌렀을 때, ModalOpen(false)
  const closeModal = () => {
    setModalOpen(false);
  };
  // Modal 확인 눌렀을 때,
  const confirmModal = async () => {
    // 탈퇴하는 axios 구현
    const rsp = await SettingAxiosApi.withdrawal(
      localStorage.getItem("email"),
      radio
    );
    console.log("탈퇴사유확인 : " + rsp.data);
    if (rsp.data === true) {
      setModalOpen(false);
      alert("탈퇴되었습니다.");
      navigate("/login");
    } else {
      alert("탈퇴가 정상적으로 처리되지 않았습니다.");
    }
  };

  // 라디오 버튼 눌렀을 때 값 저장
  const onClickRadioBtn = (e) => {
    setRadio(e);
    console.log("radio : " + e);
  };

  // 탈퇴하기 버튼 눌렀을 때,
  const onClickWithdrawalBtn = () => {
    // 만약 라디오 버튼을 선택하지 않았다면
    if (radio === "") {
      alert("탈퇴 이유를 반드시 선택해주세요.");
    } else {
      // 탈퇴 이유를 한가지 선택했다면
      setModalOpen(true);
    }
  };
  return (
    <>
      <SettingHeader title="계정 탈퇴" />
      <Container>
        <SubContainer>
          <p className="title">
            정말 떠나시는 건가요? <br />한 번 더 생각해보지 않으시겠어요?
          </p>
        </SubContainer>
        <SubContainer>
          <p className="subTitle">
            계정을 탈퇴하시려는 이유를 말씀해주세요. <br />
            제품 개선에 중요 자료로 활용하겠습니다.
          </p>
        </SubContainer>
        <SubContainer className="radio">
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("기록 삭제 목적")}
            />
            기록 삭제 목적
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("이용이 불편하고 장애가 많아서")}
            />
            이용이 불편하고 장애가 많아서
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("다른 사이트가 더 좋아서")}
            />
            다른 사이트가 더 좋아서
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("삭제하고 싶은 내용이 있어서")}
            />
            삭제하고 싶은 내용이 있어서
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("사용 빈도가 낮아서")}
            />
            사용 빈도가 낮아서
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("콘텐츠 불만")}
            />
            콘텐츠 불만
          </RadioContainer>
          <RadioContainer>
            <RadioBtn
              type="radio"
              name="탈퇴이유"
              onClick={() => onClickRadioBtn("기타")}
            />
            기타
          </RadioContainer>
        </SubContainer>
        <SubContainer>
          <p className="lastText">
            계정을 탈퇴하면 회원님의 모든 콘텐츠와 활동 기록이 삭제됩니다.
            삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
            <br />
            <br />
            클래스 결제를 통해 지불한 금액은 계정 탈퇴 시 환불이 불가합니다.
            또한 환불 신청 후 환불 처리가 완료되기 전 계정을 삭제하시는 경우
            정상적인 처리가 불가하니 주의하시기 바랍니다.
          </p>
        </SubContainer>
        <SubContainer>
          <p className="btn">
            <Button
              size={"large"}
              backgroundcolor={"red"}
              color={"white"}
              label={"탈퇴하기"}
              onClick={() => onClickWithdrawalBtn()}
            />
          </p>
        </SubContainer>
        <Modal
          open={modalOpen}
          close={closeModal}
          confirm={confirmModal}
          type={true}
          header="알림"
        >
          {modalText}
        </Modal>
      </Container>
    </>
  );
};
export default Withdrawal;
