import styled from "styled-components";
import {
  InputBar,
  GreenButton,
  BlackButton,
} from "../../component/login/LoginCommon";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { KH_DOMAIN } from "../../utils/Common";
import Common from "../../utils/Common";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import Modal from "../../utils/Modal";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background-color: #dfede9;
  width: 320px;
  padding: 20px;
  border-radius: 30px;
  text-align: center; /* Center the content */
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* Center the content */
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 5px;
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
const OauthLogo = styled.img`
  width: 40px;
  margin: 10px 20px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  &:hover {
    outline: 2px solid #04bf8a;
  }
`;

const Checkbox = styled.input``;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe === "true" && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleForgotPasswordClick = () => {
    navigate("/forgot-pw");
  };

  const handleSignUpClick = () => {
    navigate("/condition");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // const handleNextButtonClick = () => {
  //   if (!areAllChecked()) {
  //     setModalOpen(true);
  //     setModelText("필수 약관에 동의해야 합니다.");
  //   } else {
  //     navigate("/signup", {
  //       state: term3Checked,
  //     });
  //     console.log("Condition term3Checked : ", term3Checked);
  //   }
  // };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Your logic to send API request when the button is clicked
  const handleSignInClick = async () => {
    if (!isSignInDisabled) {
      try {
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
          navigate("/");

          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
          }
        }
      } catch (error) {
        // console.error("Error during login:", error);
        setModalOpen(true);
        setModalHeader(error.message || "에러 발생");
        setModelText("로그인에 실패하였습니다.");
      } finally {
        // setModalOpen(false);
      }
    }
  };

  const isSignInDisabled = !email || !password;
  return (
    <Container>
      <AlignBox>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo.png?alt=media&token=ee78e613-1205-4e3d-8a9f-da0c898af49b"
          alt="main logo"
          onClick={() => navigate("/")}
        />
        <LoginBox>
          <AlignBox>
            <InputBar
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBar
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AlignBox>
          <RememberMe>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span>이메일/비밀번호 기억</span>
          </RememberMe>
          <GreenButton disabled={isSignInDisabled} onClick={handleSignInClick}>
            로그인
          </GreenButton>
          <RowAlignBox>
            <BlackButton onClick={handleForgotPasswordClick}>
              Forgot Password?
            </BlackButton>
            <BlackButton onClick={handleSignUpClick}>회원가입</BlackButton>
          </RowAlignBox>
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
      </AlignBox>
      <Modal open={modalOpen} close={closeModal} header={`${modalHeader}`}>
        {modalText}
      </Modal>
    </Container>
  );
};

export default SignIn;
