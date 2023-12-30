import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PaymentAxiosApi from "../api/PaymentAxiosApi";

const PaymentBtn = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
const Payment = (props) => {
  const {
    userName,
    userPhone,
    postTitle,
    postUserName,
    adId,
    fee,
    postPhoneNum,
    children,
    setDisabled,
  } = props;
  const navigate = useNavigate();

  const onClickPayment = async () => {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp41773465");

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "kcp", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: fee, // 결제금액
      name: postTitle, // 주문명
      buyer_name: userName, // 구매자 이름
      buyer_tel: userPhone, // 구매자 전화번호
      buyer_email: localStorage.getItem("email"), // 구매자 이메일
      adId: adId,
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  const callback = async (response) => {
    const {
      success,
      error_msg,
      merchant_uid,
      buyer_name,
      buyer_tel,
      buyer_email,
      name,
    } = response;

    if (success) {
      // 결제 내역 저장해서 paymentId 값 받아오기
      const rsp = await PaymentAxiosApi.payAdd(
        merchant_uid,
        buyer_name,
        buyer_tel,
        buyer_email,
        fee,
        name,
        postUserName,
        postPhoneNum,
        adId
      );
      if (rsp.data) {
        console.log("rsp2.data.paymentId", rsp.data.id);
        props.onPaymentComplete(rsp.data.id);
        alert("결제가 완료되었습니다.");
        navigate(`/CompletePayment/${rsp.data.id}`);
      } else {
        alert("결제를 실패했습니다.");
      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };
  return (
    <>
      <PaymentBtn disabled={setDisabled} onClick={onClickPayment}>
        {children}
      </PaymentBtn>
    </>
  );
};
export default Payment;
