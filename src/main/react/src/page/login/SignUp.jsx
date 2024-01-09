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
    width: 96%;
  }
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.img`
  margin-top: 170px;
  width: 300px;
  &:hover {
    cursor: pointer;
    background-color: #dfede9;
    border-radius: 25%;
  }
`;
const OauthLogo = styled.img`
  width: 60px;
  margin: 10px 30px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  &:hover {
    outline: 2px solid #04bf8a;
  }
`;

const BlackButton = styled(GreenButton)`
  background-color: #353535;
  margin-top: 20px;
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
  margin: 20px 0;
  text-decoration: underline;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
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
  // console.log("Signup selectedAgreement", selectedAgreement);
  const successSignUp = "회원가입 성공";

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

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleCheckNickName = async () => {
    try {
      const result = await LoginPageAxiosApi.userNickNameCheck({
        nickname: nickName,
      });
      // console.log("결과는? ", result.data);
      const message = result.data
        ? "사용 불가능한 닉네임입니다."
        : "사용 가능한 닉네임입니다.";
      setModalHeader("닉네임 중복 확인");
      setModelText(message);
      setModalOpen(true);
    } catch (error) {
      // console.error("Error during nickname check:", error);
      setModalOpen(true);
      setModalHeader(error.message || "에러 발생");
      setModelText("에러 발생");
    }
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

  const handleSignUpClick = () => {
    if (emailVerified && codeVerified && password === passwordCheck) {
      // 이메일과 코드가 확인되었을 때 처리할 로직
      // setModalHeader("회원가입 성공");
      // setModelText("이메일과 인증번호가 유효합니다.");
      // setModalOpen(true);
      handleSignUp();
    } else if (emailVerified && codeVerified && password !== passwordCheck) {
      setModalHeader("비밀번호 일치 확인");
      setModelText("비밀번호와 비밀번호 확인이 불일치합니다.");
      setModalOpen(true);
    } else {
      // console.log("이메일과 인증번호가 유효하지않습니다. 회원가입 실패");
      setModalHeader("회원가입 실패");
      setModelText("이메일과 인증번호가 유효하지않습니다.");
      setModalOpen(true);
    }
  };

  const handleSignUp = async () => {
    const response = await LoginPageAxiosApi.userSignUp({
      email: email,
      password: password,
      nickname: nickName,
      selectedAgreement: selectedAgreement,
    });
    if (response.status === 200) {
      // console.log("sign-up 리턴 값: ", response);
      setModalHeader(successSignUp);
      setModelText("환영합니다.");
      setModalOpen(true);
      // handleLogin();
    }
  };

  const handleLogin = async () => {
    const response = await LoginPageAxiosApi.userLogin({
      email: email,
      password: password,
    });
    if (response.status === 200) {
      const accessToken = response.headers.get("authorization");
      const refreshToken = response.headers.get("authorization-refresh");
      // console.log("accessToken return = ", accessToken);
      // console.log("refreshToken return = ", refreshToken);
      Common.setEmail(email);
      Common.setAccessToken(accessToken);
      Common.setRefreshToken(refreshToken);
      // console.log("login email : ", Common.getEmail());
      navigate("/interestenter");
    }
  };

  // Modal 닫기 눌렀을 때, ModalOpen(false)
  const closeModal = () => {
    setModalOpen(false);
    if (modalHeader === successSignUp) {
      handleLogin();
    }
  };

  const handlePrevButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <AlignBox>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo.png?alt=media&token=ee78e613-1205-4e3d-8a9f-da0c898af49b"
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
            <RowAlignBox>
              <AuthInputBar
                placeholder="Nick Name"
                value={nickName}
                onChange={handleNickNameChange}
              />
              <SmallGreenButton onClick={handleCheckNickName}>
                중복확인
              </SmallGreenButton>
            </RowAlignBox>
            <InputBar
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputBar
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
          </AlignBox>
          <BlackButton
            disabled={
              !email || !code || !nickName || !password || !passwordCheck
            }
            onClick={handleSignUpClick}
          >
            동의하고 시작하기
          </BlackButton>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/google`}>
            <OauthLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/google-log.png?alt=media&token=a417ad1a-6da7-4f81-b28f-0226d8f0096c" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/naver`}>
            <OauthLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/naver-log.png?alt=media&token=afba4a4c-d10d-4727-9855-0d68729a5562" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/kakao`}>
            <OauthLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/kakao-log.png?alt=media&token=aefe60b6-c0e5-41dd-b2c3-43ed4249873a" />
          </Link>
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

export default SignUp;
