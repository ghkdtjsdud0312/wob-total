import styled from "styled-components";
import {
  InputBar,
  AuthInputBar,
  GreenButton,
} from "../../component/login/LoginCommon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KH_DOMAIN } from "../../utils/Common";
import { useState } from "react";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import LoginModal from "../../utils/LoginModal";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginBox = styled.div`
  background-color: #dfede9;
  width: 30em;
  padding: 20px;
  border-radius: 30px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 26em;
  }
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  @media only screen and (max-width: 768px) {
    width: 98%;
  }
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  &:hover {
    cursor: pointer;
    background-color: #dfede9;
    border-radius: 25%;
  }
`;

const BlackButton = styled(GreenButton)`
  background-color: #353535;
  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const SmallGreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 20px;
  width: 100px;
  white-space: nowrap;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:hover {
    cursor: pointer;
  }
`;

const PrevNavigateBox = styled.div`
  margin-top: 20px;
  text-decoration: underline;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈
  const [modalText, setModelText] = useState(""); // 모달에 넣을 내용
  const [modalHeader, setModalHeader] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedAgreement = state ?? false; // ConditionModal에서 undefined와 null값을 받았을경우 default값으로 false로 설정
  const successModifyPassword = "비밀번호 변경 성공";
  // console.log("Signup selectedAgreement", selectedAgreement);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleCheckEmail = async () => {
    try {
      const result = await LoginPageAxiosApi.mailConfirm({
        email: email,
      });
      // console.log(result.status);
      if (result.status === 200) {
        setEmailVerified(true);
        setModalHeader("인증번호 발송");
        setModelText(email);
        setModalOpen(true);
      }
    } catch (error) {
      // console.error("Error during nickname check:", error);
      setModalHeader("인증번호 발송실패");
      setModelText("이메일을 정확히 입력해주세요.");
      setModalOpen(true);
    }
  };

  const handleCheckCode = async () => {
    try {
      const result = await LoginPageAxiosApi.mailVerify({
        email: email,
        code: code,
      });
      // console.log(result.status);
      if (result.status === 200) {
        setCodeVerified(true);
        setModalHeader("이메일 인증 성공");
        setModelText(`유효한 인증번호 입니다. "${code}" `);
        setModalOpen(true);
      }
    } catch (error) {
      // console.error("Error during nickname check:", error);
      setModalHeader("이메일 인증 실패");
      setModelText("인증코드를 다시 인증해주세요.");
      setModalOpen(true);
    }
  };

  const handleChangePasswordClick = () => {
    if (emailVerified && codeVerified && password === passwordCheck) {
      // 이메일과 코드가 확인되었을 때 처리할 로직
      // console.log(
      //   "이메일과 인증번호가 유효합니다. 비밀번호 변경을 시작합니다."
      // );
      handleChangePassword();
    } else if (emailVerified && codeVerified && password !== passwordCheck) {
      // console.log("비밀번호와 비밀번호 확인이 불일치합니다.");
      setModalHeader("비밀번호 일치 확인");
      setModelText("비밀번호와 비밀번호 확인이 불일치합니다.");
      setModalOpen(true);
    } else {
      // console.log("이메일과 인증번호가 유효하지않습니다. 비밀번호 변경 실패");
      setModalHeader("회원가입 실패");
      setModelText("이메일과 인증번호가 유효하지않습니다.");
      setModalOpen(true);
    }
  };

  const handleChangePassword = async () => {
    const response = await LoginPageAxiosApi.modifyForgotPassword({
      email: email,
      password: password,
    });
    if (response.status === 200) {
      setModalHeader(successModifyPassword);
      setModelText("비밀번호가 변경되었습니다.");
      setModalOpen(true);
      // navigate("/");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (modalHeader === successModifyPassword) {
      navigate("/signin");
    }
  };

  const handlePrevButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <AlignBox>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo-green.png?alt=media&token=b89ea23a-e1f1-4863-a76f-54811d63edcb"
          alt="main logo"
          onClick={() => navigate("/signin")}
        />
        <LoginBox>
          <AlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <SmallGreenButton onClick={handleCheckEmail}>
                인증코드
              </SmallGreenButton>
            </RowAlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="인증 코드"
                value={code}
                onChange={handleCodeChange}
              />
              <SmallGreenButton onClick={handleCheckCode}>
                인증확인
              </SmallGreenButton>
            </RowAlignBox>
            <InputBar
              type="password"
              placeholder="Reset Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputBar
              type="password"
              placeholder="Reset Password Check"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
          </AlignBox>
          <BlackButton
            disabled={!email || !code || !password || !passwordCheck}
            onClick={handleChangePasswordClick}
          >
            비밀번호 변경하기
          </BlackButton>
        </LoginBox>
        <PrevNavigateBox onClick={handlePrevButtonClick}>
          이전으로
        </PrevNavigateBox>
      </AlignBox>
      <LoginModal open={modalOpen} close={closeModal} header={`${modalHeader}`}>
        {modalText}
      </LoginModal>
    </Container>
  );
};

export default ForgotPassword;
