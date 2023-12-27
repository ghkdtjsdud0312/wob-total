import React, { useState } from "react";
import styled from "styled-components";
import AdAxiosApi from "../api/AdAxoisApi";
import { storage } from "../api/firebase";
import Modal from "../utils/Modal";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: #555555;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #555555;
`;

const AdBox = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  border-bottom: 1px solid #555555;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px;
`;

const ImageBox = styled.div`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #555555;
`;

const ExplainBox = styled.div`
  font-size: 0.9rem;
  color: #555555;
`;

const Input = styled.input`
  width: 40%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
  margin-bottom: 20px;
`;

const ApplicationBox = styled.div`
  width: 100%;
  margin-top: 20px;

  padding-bottom: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: space-between;
  margin: 10px;
`;

const PaymentButton = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ConfirmButton = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const CancleButton = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const AdSubmit = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [period, setPeriod] = useState("");
  const [fee, setFee] = useState("");
  const [payment, setPayment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { postId } = useParams();

  const handleAdSubmit = async (e) => {
    e.preventDefault();

    // postId 추출
    const postId = location.pathname.split("/").pop();

    const rsp = await AdAxiosApi.adSubmit(postId, {
      url: url,
      period,
      fee,
      payment,
    });
    console.log("응답해라!!!  ", rsp.data);

    console.log({
      postId: postId,
      url: url,
      period,
      fee,
      payment,
    });
    if (rsp.data) {
      alert("등록 요청 완료");
    }
  };

  // 이미지 업로드
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 파일 업로드 처리
      handleUpload(selectedFile);
    } else {
      console.log("파일 선택 취소");
    }
  };

  const handleUpload = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일 업로드하고 기다림
      await fileRef.put(file);
      console.log("!!!파일 업로드 성공!!!");
      // 다운로드 url을 가져옴
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);

      // 상태를 업데이트
      setUrl(url);
    } catch (error) {
      console.error("업데이트 실패", error);
    }
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
    // 게시 기간에 따라 광고 금액을 설정
    switch (value) {
      case "1일":
        setFee("50000");
        break;
      case "7일":
        setFee("200000");
        break;
      case "30일":
        setFee("300000");
        break;
      default:
        setFee("");
        break;
    }
  };

  const handleCancle = () => {
    setModalOpen(true); // 취소 버튼 누르면 모달 뜸.
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫음.
  };

  const confirmModal = () => {
    // 취소버튼 확인 누르면 홈으로 이동
    navigate("/");
  };

  return (
    <>
      <Container>
        <Title>광고 신청</Title>
        <AdBox>
          <ImageBox>
            <Title>광고 이미지</Title>
            <Input type="file" name="file" onChange={handleFileInputChange} />
            <ExplainBox>
              * 설명란은 따로 없습니다. 이미지 안에 광고 내용을 모두 기재해
              주세요.
            </ExplainBox>
          </ImageBox>
          <ApplicationBox>
            <Title>기간 선택</Title>
            <label htmlFor="period">게시 기간</label>
            <label>
              <input
                type="radio"
                id="period_1"
                name="period"
                value="1일"
                checked={period === "1일"}
                onChange={() => handlePeriodChange("1일")}
              />
              1일
            </label>
            <label>
              <input
                type="radio"
                id="period_7"
                name="period"
                value="7일"
                checked={period === "7일"}
                onChange={() => handlePeriodChange("7일")}
              />
              7일
            </label>
            <label>
              <input
                type="radio"
                id="period_30"
                name="period"
                value="30일"
                checked={period === "30일"}
                onChange={() => handlePeriodChange("30일")}
              />
              30일
            </label>
          </ApplicationBox>
          <ApplicationBox>
            <Title>금액 선택</Title>
            <label htmlFor="fee">광고 금액</label>
            <label>
              <input
                type="radio"
                id="fee_50000"
                name="fee"
                value="50000"
                checked={fee === "50000"}
                onChange={() => setFee("50000")}
              />
              5만원(1일)
            </label>
            <label>
              <input
                type="radio"
                id="fee_200000"
                name="fee"
                value="200000"
                checked={fee === "200000"}
                onChange={() => setFee("200000")}
              />
              20만원(7일)
            </label>
            <label>
              <input
                type="radio"
                id="fee_300000"
                name="fee"
                value="300000"
                checked={fee === "300000"}
                onChange={() => setFee("300000")}
              />
              30만원(30일)
            </label>
          </ApplicationBox>
        </AdBox>
        <ButtonBox>
          <PaymentButton>결제 하기</PaymentButton>
          <ConfirmButton onClick={handleAdSubmit}>등록 요청</ConfirmButton>
          <CancleButton onClick={handleCancle}>취소</CancleButton>
        </ButtonBox>
        <Modal
          open={modalOpen}
          close={closeModal}
          confirm={confirmModal}
          type={true}
          header="취소"
        >
          등록을 취소하시겠습니까?
        </Modal>
      </Container>
    </>
  );
};

export default AdSubmit;
