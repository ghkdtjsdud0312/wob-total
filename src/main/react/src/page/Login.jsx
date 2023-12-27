import styled from "styled-components";
import { useEffect, useState } from "react";
import LoginPageAxiosApi from "../api/LoginPageAxiosApi";
import Common from "../utils/Common";
import { Link, useNavigate } from "react-router-dom";
import { KH_DOMAIN } from "../utils/Common";

const SignUp = styled.div`
  background-color: "blue";
`;
const SignUpBtn = styled.button``;
const Login = styled.div`
  background-color: "blue";
`;
const InputId = styled.input``;
const InputPassword = styled.input``;
const InputNickName = styled.input``;
const LoginBtn = styled.button``;
const TokkenTestBtn = styled.button``;

const GoogleOauth = styled.button`
  background-color: "white";
`;
const NaverOauth = styled.button`
  background-color: "green";
`;
const KakaoOauth = styled.button`
  background-color: "yellow";
`;

const TestLoginPage = () => {
  const navigate = useNavigate();
  const [signId, setSignId] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signNickname, signSetNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const hadleSignUp = async () => {
    const response = await LoginPageAxiosApi.userSignUp({
      email: signId,
      password: signPassword,
      nickname: signNickname,
    });
    if (response.status === 200) {
      console.log("sign-up 리턴 값: ", response);
    }
  };
  const handleLogin = async () => {
    const response = await LoginPageAxiosApi.userLogin({
      email: id,
      password: password,
    });
    if (response.status === 200) {
      const accessToken = response.headers.get("authorization");
      const refreshToken = response.headers.get("authorization-refresh");
      console.log("accessToken return = ", accessToken);
      console.log("refreshToken return = ", refreshToken);
      Common.setEmail(id);
      Common.setAccessToken(accessToken);
      Common.setRefreshToken(refreshToken);
      console.log("login email : ", Common.getEmail());
    }
  };
  const handleTest = async () => {
    const response = await LoginPageAxiosApi.loginTest();
    if (response.status === 200) {
      console.log("loginTest 리턴 값: ", response);
    }
  };
  const handleMain = () => {
    // Use the navigate function to go to the main page
    console.log("메인으로");
    navigate("/");
  };

  useEffect(() => {
    Common.clearLocalStorage();
  }, []);

  return (
    <>
      <SignUp>
        <div>회원가입</div>
        <InputId
          placeholder="ID"
          value={signId}
          onChange={(e) => setSignId(e.target.value)}
        />
        <InputPassword
          placeholder="Password"
          value={signPassword}
          onChange={(e) => setSignPassword(e.target.value)}
        />
        <InputNickName
          placeholder="Nickname"
          value={signNickname}
          onChange={(e) => signSetNickname(e.target.value)}
        />
        <SignUpBtn onClick={hadleSignUp}>sign-up</SignUpBtn>
      </SignUp>

      <Login>
        <div>로그인</div>
        <InputId
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <InputPassword
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginBtn onClick={handleLogin}>Login</LoginBtn>
      </Login>

      <div>소셜 회원가입 & 로그인</div>
      <GoogleOauth>
        <Link to={`${KH_DOMAIN}/oauth2/authorization/google`}>Google</Link>
      </GoogleOauth>
      <NaverOauth>
        <Link to={`${KH_DOMAIN}/oauth2/authorization/naver`}>Naver</Link>
      </NaverOauth>
      <KakaoOauth>
        <Link to={`${KH_DOMAIN}/oauth2/authorization/kakao`}>Kakao</Link>
      </KakaoOauth>

      <div>
        <TokkenTestBtn onClick={handleTest}>테스트</TokkenTestBtn>
      </div>
      <div>
        <TokkenTestBtn onClick={handleMain}>메인으로</TokkenTestBtn>
      </div>
    </>
  );
};

export default TestLoginPage;
