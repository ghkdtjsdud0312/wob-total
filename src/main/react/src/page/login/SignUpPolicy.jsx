import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import UserAgreements from "../../component/Join/UserAgreements";
import UserPolicy from "../../component/Join/UserPolicy";
import UserSelectAgreements from "../../component/Join/UserSelectAgreements";
import LoginModal from "../../utils/LoginModal";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SelectOptionBoard = styled.div`
  width: 768px;
  height: 160px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 685px;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const SelectOptionBoardHeader = styled.div`
  width: 768px;
  height: 40px;
  background-color: #dfede9;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;
const OptionBoardHeaderLogo = styled.img`
  width: 50px;
  height: auto;
  margin-left: 10px;
`;
const OptionBoardBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 2px solid #dfede9;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 615px;
`;
const UserPolicyBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #eee;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 32%; /* 나누어진 높이 */
`;

const UserAgreementsBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #eee;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 30%; /* 나누어진 높이 */
`;

const UserSelectAgreementsBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #eee;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 30%; /* 나누어진 높이 */
`;

const SelectOptionBoardFooter = styled.div`
  width: 768px;
  height: 40px;
  background-color: #04bf8a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const CheckboxInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 1rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #04bf8a;
  }
`;

const StyledLabel = styled.label`
  background-color: #fff;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 0.3rem;
  border-bottom: 2px solid #eee;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;

const Button = styled.button`
  margin-top: 10px;
  text-align: center;
  color: #cdcdcd;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

const PolicyModal = ({ open, close }) => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [term1Checked, setTerm1Checked] = useState(false);
  const [term2Checked, setTerm2Checked] = useState(false);
  const [term3Checked, setTerm3Checked] = useState(false);
  const areAllChecked = () => term1Checked && term2Checked;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  const handleAllCheckedChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTerm1Checked(newCheckedState);
    setTerm2Checked(newCheckedState);
    setTerm3Checked(newCheckedState);
  };

  const handleTerm1CheckedChange = () => {
    setTerm1Checked(!term1Checked);
    setAllChecked(areAllChecked());
  };

  const handleTerm2CheckedChange = () => {
    setTerm2Checked(!term2Checked);
    setAllChecked(areAllChecked());
  };

  const handleTerm3CheckedChange = () => {
    setTerm3Checked(!term3Checked);
    setAllChecked(areAllChecked());
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNextButtonClick = () => {
    if (!areAllChecked()) {
      setModalOpen(true);
      setModelText("필수 약관에 동의해야 합니다.");
    } else {
      navigate("/signup", {
        state: term3Checked,
      });
      console.log("Condition term3Checked : ", term3Checked);
    }
  };

  const Checkbox = ({ text, checked, onChange }) => {
    return (
      <StyledLabel>
        <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
        <StyledP>{text}</StyledP>
      </StyledLabel>
    );
  };

  return (
    <>
      {open && (
        <CenterBox>
          <SelectOptionBoard>
            <SelectOptionBoardHeader>
              <OptionBoardHeaderLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo-green.png?alt=media&token=b89ea23a-e1f1-4863-a76f-54811d63edcb" />
            </SelectOptionBoardHeader>
            <OptionBoardBody>
              <Checkbox
                text={"전체 동의하기"}
                checked={allChecked}
                onChange={handleAllCheckedChange}
              />
              <UserPolicyBody>
                <Checkbox
                  text={"개인정보처리방침 동의"}
                  checked={term1Checked}
                  onChange={handleTerm1CheckedChange}
                />
                <UserPolicy />
              </UserPolicyBody>
              <UserAgreementsBody>
                <Checkbox
                  text={"이용 약관 동의"}
                  checked={term2Checked}
                  onChange={handleTerm2CheckedChange}
                />
                <UserAgreements />
              </UserAgreementsBody>
              <UserSelectAgreementsBody>
                <Checkbox
                  text={"[선택] 개인정보 수집이용 및 약관"}
                  checked={term3Checked}
                  onChange={handleTerm3CheckedChange}
                />
                <UserSelectAgreements />
              </UserSelectAgreementsBody>
            </OptionBoardBody>
            <SelectOptionBoardFooter onClick={handleNextButtonClick}>
              동의하고 계속하기
            </SelectOptionBoardFooter>
          </SelectOptionBoard>
          <Button onClick={close}>취소</Button>
          <LoginModal open={modalOpen} close={closeModal} header="오류">
            {modalText}
          </LoginModal>
        </CenterBox>
      )}
    </>
  );
};

export default PolicyModal;
