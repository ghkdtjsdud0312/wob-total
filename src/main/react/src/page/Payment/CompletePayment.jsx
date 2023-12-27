import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PaymentAxiosApi from "../../api/PaymentAxiosApi";

const Container = styled.div`
  /* padding: 24px; */
  width: 768px;
  min-height: 900px;
  margin: 0px auto;
  background-color: var(--MINT);
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.sub1 {
    height: 200px;
  }
  &.sub2 {
    height: 700px;
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
    margin-bottom: -40px;
    color: gray;
  }
`;
const BottomBox = styled.div`
  width: 75%;
  height: 95%;
  box-shadow: 1px 1px 5px 0.5px #d8d8d8;
  background-color: white;
`;

const SubBottomBox = styled.div`
  width: 100%;
  min-height: 60px;
  border: 1px solid #d8d8d8;

  &.subBox1 {
    height: 100px;
  }
  &.subBox2 {
    height: 300px;
  }
  &.subBox3 {
    height: 200px;
  }
  &.subBox4 {
    height: 65px;
  }
`;

const BottomTextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;

  .bottomDiv1 {
    flex-direction: column;
  }
  .bottomDiv2 {
    margin-bottom: 9%;
    margin-top: 9%;
  }

  div {
    display: flex;
    flex-direction: row;
  }
  .bottomP1 {
    width: 150px;
    color: gray;
  }
`;
const HomeBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  &:hover {
    background-color: var(--GREEN);
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

  if (!pay) return <></>;
  return (
    <>
      <Container>
        <SubContainer className="sub1">
          <TopTextBox>
            <p className="topP1">결제가 완료되었습니다.</p>
            <p className="topP2">
              결제 내역은 마이페이지 &gt; 설정 &gt; 결제내역 에서 확인하실 수
              있습니다.
            </p>
          </TopTextBox>
        </SubContainer>
        <SubContainer className="sub2">
          <BottomBox>
            <SubBottomBox className="subBox1">
              <BottomTextBox>
                <div>
                  <p className="bottomP1">주문번호</p>
                  <p className="bottomP2">{pay.orderNum}</p>
                </div>
              </BottomTextBox>
            </SubBottomBox>
            <SubBottomBox className="subBox2">
              <BottomTextBox>
                <div className="bottomDiv1">
                  <div className="bottomDiv2">
                    <p className="bottomP1">클래스 이름</p>
                    <p className="bottomP2">{pay.postTitle}</p>
                  </div>
                  <div className="bottomDiv2">
                    <p className="bottomP1">강사명</p>
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
    </>
  );
};

export default CompletePayment;
