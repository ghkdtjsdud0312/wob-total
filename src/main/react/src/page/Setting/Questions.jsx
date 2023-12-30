import styled from "styled-components";
import SettingHeader from "../../layout/SettingHeader";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
  background-color: var(--MINT);
  height: 100%;
  margin-bottom: 100px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.sub1 {
    height: 160px;
  }
`;

const TopTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .topP1 {
    font-size: 38px;
    margin-bottom: 30px;
  }
  .topP2 {
    margin-bottom: -20px;
    color: gray;
  }
`;
const BottomBox = styled.div`
  width: 75%;
  height: 100%;
  margin-bottom: 15%;
  box-shadow: 1px 1px 5px 0.5px #d8d8d8;
  background-color: white;
`;

const SubBottomBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #d8d8d8;
`;

const BottomTextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
  }
  .bottomP1 {
    margin-bottom: 20px;
    font-size: 24px;
  }
  .bottomP2 {
    color: gray;
    font-size: 18px;
  }
`;

const Questions = () => {
  return (
    <>
      <SettingHeader title="문의하기" />
      <Container>
        <SubContainer className="sub1">
          <TopTextBox>
            <p className="topP1">자주 묻는 질문 FAQ</p>
            <p className="topP2">
              자세한 사항는 dobby22023@naver.com 으로 문의해주세요 :)
            </p>
          </TopTextBox>
        </SubContainer>
        <SubContainer className="sub2">
          <BottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">결제 취소는 어떻게 하나요?</p>
                  <p className="bottomP2">
                    현재 테스트 버전으로 실제 결제된 금액은 매일 자정에 자동으로
                    환불되오니 걱정하지 않으셔도 됩니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">결제 내역을 확인하고 싶어요.</p>
                  <p className="bottomP2">
                    결제 내역은 마이페이지 &gt; 설정 &gt; 결제내역 에서 확인하실
                    수 있습니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">
                    계정이 하나 있는 상태에서 다른 소셜 계정으로 가입할 수
                    있나요?
                  </p>
                  <p className="bottomP2">
                    이미 본인 소유의 계정이 존재하더라도, 새로운 소셜 계정으로
                    가입이 가능합니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">
                    비밀번호 변경하는 방법을 알려주세요.
                  </p>
                  <p className="bottomP2">
                    비밀번호 변경은 마이페이지 &gt; 설정 &gt; 계정관리 &gt;
                    비밀번호 변경 에서 확인하실 수 있습니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">로그아웃은 어디에서 하나요?</p>
                  <p className="bottomP2">
                    로그아웃은 마이페이지 &gt; 설정 &gt; 계정관리 &gt; 로그아웃
                    에서 확인하실 수 있습니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">계정 이메일 주소를 바꿀 수 없나요?</p>
                  <p className="bottomP2">
                    죄송하지만, 한번 가입한 계정 이메일 주소는 변경하실 수
                    없습니다. 탈퇴 후에도 같은 계정으로 가입은 불가능하오니
                    참고부탁드립니다.
                  </p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
          </BottomBox>
        </SubContainer>
      </Container>
    </>
  );
};
export default Questions;
