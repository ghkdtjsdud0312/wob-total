import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PaymentAxiosApi from "../../api/PaymentAxiosApi";
import Loading from "../../component/Loading";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  min-height: 900px;
  margin: 0px auto;
  background-color: var(--MINT);
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const SubContainer = styled.div`
  width: 100%;
  padding: 50px 0 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBox = styled.div`
  width: 75%;
  box-shadow: 1px 1px 5px 0.5px #d8d8d8;
  background-color: white;
`;

const SubBottomBox = styled.div`
  border: 1px solid #d8d8d8;
`;

const BottomTextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
  display: flex;
  align-items: center;
  font-size: 18px;

  .bottomDiv1 {
    flex-direction: column;
  }
  .bottomDiv2 {
    margin-bottom: 8%;
    margin-top: 8%;
    @media only screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  }

  div {
    display: flex;
    flex-direction: row;
  }
  .bottomP1 {
    width: 150px;
    color: gray;
  }

  .bottomP2 {
    @media only screen and (max-width: 768px) {
      margin-top: 10%;
    }
  }
`;
const HomeBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;

  background-color: transparent; // 버튼 배경 없애기
  border: none;
  &:hover {
    background-color: var(--GREEN);
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
    margin-top: 5px;
    margin-bottom: -40px;
    color: gray;
  }
  .topP3 {
    margin-top: 5px;
    margin-bottom: -40px;
    color: gray;
  }
`;

// 주문 완료 페이지
const CompletePayment = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const [pay, setPay] = useState();

  useEffect(() => {
    console.log("paymentId in params : " + paymentId);
    const getPaymentId = async () => {
      const rsp = await PaymentAxiosApi.payGetById(paymentId);
      console.log("paymentId의 결제 내역 : " + rsp.data[0]);
      if (rsp.data) {
        setPay(rsp.data);
        console.log("setPay : ", pay);
      } else {
        console.log("rsp.data == 0");
      }
    };
    getPaymentId();
  }, []);

  return (
      <>
        {!pay ? (
            <Loading text={"결제가 진행 중입니다."}></Loading>
        ) : (
            <Container>
              <SubContainer className="sub1">
                {pay.postUserName === "관리자" ? (
                    <TopTextBox>
                      <p className="topP1">광고 등록이 완료되었습니다.</p>
                      <p className="topP2">
                        광고 승인 여부는 관리자 검토 후에 이메일로 알려드립니다.
                      </p>
                      <p className="topP3">
                        결제 내역은 마이페이지 &gt; 설정 &gt; 결제내역 에서 확인하실
                        수 있습니다.
                      </p>
                    </TopTextBox>
                ) : (
                    <TopTextBox>
                      <p className="topP1">결제가 완료되었습니다.</p>
                      <p className="topP2">
                        결제 내역은 마이페이지 &gt; 설정 &gt; 결제내역 에서 확인하실
                        수 있습니다.
                      </p>
                    </TopTextBox>
                )}
              </SubContainer>
              <SubContainer className="sub2">
                <BottomBox>
                  <SubBottomBox className="subBox1">
                    <BottomTextBox>
                      <div className="bottomDiv1">
                        <div className="bottomDiv2">
                          <p className="bottomP1">주문번호</p>
                          <p className="bottomP2">{pay.orderNum}</p>
                        </div>
                      </div>
                    </BottomTextBox>
                  </SubBottomBox>
                  <SubBottomBox className="subBox2">
                    <BottomTextBox>
                      <div className="bottomDiv1">
                        <div className="bottomDiv2">
                          <p className="bottomP1">상품명</p>
                          <p className="bottomP2">{pay.postTitle}</p>
                        </div>
                        <div className="bottomDiv2">
                          <p className="bottomP1">담당자</p>
                          <p className="bottomP2">{pay.postUserName}</p>
                        </div>
                        <div className="bottomDiv2">
                          <p className="bottomP1">연락처</p>
                          <p className="bottomP2">{pay.postPhoneNum}</p>
                        </div>
                        <div className="bottomDiv2">
                          <p className="bottomP1">결제금액</p>
                          <p className="bottomP2">{pay.fee}</p>
                        </div>
                      </div>
                    </BottomTextBox>
                  </SubBottomBox>
                  <SubBottomBox className="subBox3">
                    <BottomTextBox>
                      <div className="bottomDiv1">
                        <div className="bottomDiv2">
                          <p className="bottomP1">주문자명</p>
                          <p className="bottomP2">{pay.userName}</p>
                        </div>
                        <div className="bottomDiv2">
                          <p className="bottomP1">연락처</p>
                          <p className="bottomP2">{pay.phoneNum}</p>
                        </div>
                      </div>
                    </BottomTextBox>
                  </SubBottomBox>
                  <SubBottomBox className="subBox4">
                    <HomeBtn onClick={() => navigate("/")}>메인으로</HomeBtn>
                  </SubBottomBox>
                </BottomBox>
              </SubContainer>
            </Container>
        )}
      </>
  );
};

export default CompletePayment;
