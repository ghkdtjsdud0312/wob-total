import { useState } from "react";
import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import Modal from "../../utils/Modal";
import Button from "../../component/Button";
import SettingAxiosApi from "../../api/SettingAxiosApi";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  max-width: 768px;
  margin: 0px auto;
`;
const SubContainer = styled.div`
  position: relative;
  align-items: center;
  width: 768px;
  &.item {
    display: flex;
    flex-direction: row;
    min-height: 100px;
    padding: 25px;
    font-size: 30px;
  }
  &.hint {
    color: gray;
    font-size: 18px;
    display: flex;
    justify-content: right;
  }
`;

const Input = styled.input`
  position: absolute;
  right: 50px;
  margin-left: 150px;
  width: 300px;
  height: 50px;
  font-size: 22px;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  border-bottom: 1px solid var(--BLACK);
  cursor: pointer;
`;
const ButtonBox = styled.div`
  margin-left: 40%;
`;

const PasswordChange = () => {
  const [pw, setPw] = useState(""); // 입력된 비밀번호
  const [rePw, setRePw] = useState(""); // 입력된 비밀번호 확인
  const [pwMessage, setPwMessage] = useState(""); // 비밀번호 밑 메세지
  const [rePwMessage, setRePwMessage] = useState(""); // 비밀번호 확인 밑 메세지
  const [isPw, setIsPw] = useState(false); // 비밀번호 제대로 입력시 true
  const [isRePw, setIsRePw] = useState(false); // 비밀번호 확인 제대로 입력시 true
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈
  const [modalText, setModelText] = useState("비밀번호가 변경되었습니다."); // 모달에 넣을 내용

  // Modal 닫기 눌렀을 때, ModalOpen(false)
  const closeModal = () => {
    setModalOpen(false);
  };

  // 수정하기 버튼 눌렀을 때,
  const onClickBtn = async () => {
    // 비밀번호 변경하기 위해 email, rePw 전달
    const rsp = await SettingAxiosApi.passwordChange(
      localStorage.getItem("email"),
      rePw
    );
    if (rsp.data) {
      setModalOpen(true);
      setPw("");
      setRePw("");
    } else {
      setModelText("비밀번호 변경이 정상적으로 처리되지 않았습니다.");
      setModalOpen(true);
      setPw("");
      setRePw("");
    }
  };

  // 비밀번호 입력 됐을 때,
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };

  // 비밀번호 확인 입력 됐을 때,
  const onChangeRePw = (e) => {
    const passwordCurrent = e.target.value;
    setRePw(passwordCurrent);
    if (passwordCurrent !== pw) {
      setRePwMessage("비밀 번호가 일치하지 않습니다.");
      setIsRePw(false);
    } else {
      setRePwMessage("비밀 번호가 일치 합니다.");
      setIsRePw(true);
    }
  };

  return (
    <>
      <SettingHeader title="비밀번호 변경" />
      <Container>
        <SubContainer className="item">
          <span className="title">새 비밀번호</span>
          <Input type="password" value={pw} onChange={onChangePw} />
        </SubContainer>
        <SubContainer className="hint">
          {pw.length > 0 && <span>{pwMessage}</span>}
        </SubContainer>
        <SubContainer className="item">
          <span className="title">새 비밀번호 확인</span>
          <Input type="password" value={rePw} onChange={onChangeRePw} />
        </SubContainer>
        <SubContainer className="hint">
          {pw.length > 0 && <span>{rePwMessage}</span>}
        </SubContainer>
        <SubContainer className="item">
          {isPw && isRePw ? (
            <ButtonBox>
              <Button
                enabled
                size={"large"}
                label="수정하기"
                onClick={() => onClickBtn()}
              ></Button>
            </ButtonBox>
          ) : (
            <ButtonBox>
              <Button disabled size={"large"} label="수정하기"></Button>
            </ButtonBox>
          )}
          <Modal open={modalOpen} close={closeModal} header="알림">
            {modalText}
          </Modal>
        </SubContainer>
      </Container>
    </>
  );
};
export default PasswordChange;
