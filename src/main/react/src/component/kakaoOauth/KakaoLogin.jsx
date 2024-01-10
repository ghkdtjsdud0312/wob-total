import { KH_DOMAIN } from "../../utils/Common";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";
import KakaoAxiosApi from "../../api/KakaoAxiosApi";
import Common from "../../utils/Common";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";

import styled from "styled-components";
import KakaoImg from "../../images/kakao_login_medium_wide.png";
import KakaoSmallImg from "../../images/kakao_login_small.png";

export const SocialLinks = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

export const SocialLink = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${KakaoImg});
  background-size: contain;
  background-repeat: no-repeat; // 추가
  transition: background-image 0.5s ease-in-out;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;

const KakaoSignin = () => {
  const navigate = useNavigate();

  // 카카오 로그인
  const onKakaoLoginSuccess = async (data) => {
    console.log(
      // JSON.stringify(data) : 콘솔에서 [object Object]와 같이 찍히는 데이터를 문자열로 변환하여 출력하는 방법
      "카카오 로그인 시 서버에 날라가는 데이터 : " + JSON.stringify(data) // 이때 전송되는 액세스 토큰은 카카오에서 제공
    );

    // 카카오 서버에서 받은 액세스 토큰을 서버로 전송
    const res = await KakaoAxiosApi.kakaoLogin({
      access_token: data.response.access_token,
    });

    console.log("카카오 서버의 응답 : " + JSON.stringify(res.data));
    console.log("kakaLogin 액세스 토큰 : " + res.data.accessToken);
    console.log("kakaLogin 리프레시 토큰 : " + res.data.refreshToken);

    // 서버로부터 받은 토큰을 로컬 스토리지에 저장
    // 로그인 상태를 업데이트
    Common.setAccessToken(res.data.accessToken);
    Common.setRefreshToken(res.data.refreshToken);
    Common.setSocialId(res.data.socialId);

    const email = await LoginPageAxiosApi.getUUIDEmail(Common.getSocialId());

    console.log(email.data);
    Common.setEmail(email.data);
    navigate("/");
  };

  // 카카오 로그인에 실패하면 실행할 함수
  const onKakaoLoginFailure = (error) => {
    console.error("카카오 로그인에 실패했습니다 : " + error);
  };
  return (
    <SocialLinks>
      <SocialLink>
        <SocialLinks>
          <SocialLink>
            <KakaoLogin
              // 속성들의 이름은 카카오에서 지정해준 것들이기 때문에 변경 불가

              token="7d2704d73271739cc11730f6f0006c00" // JavaScript 키
              onSuccess={onKakaoLoginSuccess} // 카카오 로그인의 결과 데이터를 인자로 받아 실행, 이는 KakaoLogin 컴포넌트가 내부적으로 처리
              onFailure={onKakaoLoginFailure}
              getProfile={true} // 로그인 성공 후 사용자 정보를 가져올 것인지 설정
              render={({ onClick }) => {
                // onClick 이벤트가 발생했을 때, return 문 안의 태그들을 반환한다.
                /*
              render : 컴포넌트 간에 코드를 재사용 하는 방법으로,
              컴포넌트가 렌더링할 무언가를 반환,
              일반적으로 함수를 값으로 가지며 해당 함수는 컴포넌트가 어떻게 렌더링될지를 정의한다.
              */
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onClick();
                    }}
                    style={{
                      // 카카오 모달 창
                      background: "none",
                      border: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  ></button>
                );
              }}
            />
          </SocialLink>
        </SocialLinks>
      </SocialLink>
    </SocialLinks>
  );
};

export default KakaoSignin;
