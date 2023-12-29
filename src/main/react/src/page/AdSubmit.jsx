import React, { useState } from "react";
import styled from "styled-components";
import AdAxiosApi from "../api/AdAxoisApi";
import { storage } from "../api/firebase";
import Modal from "../utils/Modal";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PageTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  height: 700px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: #555555;
  display: flex;
  flex-direction: column;
  background-color: var(--MINT);
`;

const SubContainer = styled.div`
  width: 80%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px 0.5px #d8d8d8;
  background-color: white;
  margin-top: 20px;
`;

const ContainBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const TitleBox = styled.div`
  font-size: 1.3rem;
  margin: 10px;
  padding-bottom: 20px;
`;

const Input = styled.input`
  width: 60%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
  margin-bottom: 20px;
`;

const ExplainBox = styled.div`
  color: #555555;
`;

const InputDate = styled.input`
  width: 150px;
  height: 25px;
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: space-between;
  padding-top: 50px;
`;

const PaymentButton = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--WHITE);
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
  background-color: var(--WHITE);
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
  background-color: var(--WHITE);
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
  const [postingDate, setPostingDate] = useState("");
  const [payment, setPayment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { postId } = useParams();

  const handleAdSubmit = async (e) => {
    e.preventDefault();

    // postId 추출
    const postId = Number(location.pathname.split("/").pop());
    console.log(JSON.stringify(postId));
    console.log(typeof postId);

    const rsp = await AdAxiosApi.adSubmit(postId, {
      postId: postId,
      url: url,
      period,
      fee,
      payment,
      postingDate,
    });
    console.log("광고 응답해라!!!  ", rsp.data);

    console.log({
      postId: postId,
      url: url,
      period,
      fee,
      payment,
      postingDate,
    });
    if (rsp.data) {
      alert("등록 요청 완료");
      navigate("/");
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
        <PageTitle>광고 등록</PageTitle>
        {/* 첫번째 칸: 이미지 업로드 */}
        <SubContainer>
          <ContainBox>
            <TitleBox>광고 이미지</TitleBox>
            <Input type="file" name="file" onChange={handleFileInputChange} />
          </ContainBox>
          <ExplainBox>
            * 설명 기재란은 따로 없습니다. 이미지 안에 광고 내용을 모두 담아
            주세요.
          </ExplainBox>
        </SubContainer>
        {/* 두번째 칸: 게시일&기간&금액 선택 */}
        <SubContainer>
          <TitleBox>신청 내역</TitleBox>
          <ContainBox>
            {/* 게시일자 입력 창 */}
            <label htmlFor="postingDate">게시 일자</label>
            <InputDate
              type="text"
              name="postingDate"
              placeholder="YYYY-MM-DD"
              value={postingDate}
              onChange={(e) => setPostingDate(e.target.value)}
            />
          </ContainBox>
          <ContainBox>
            {/* 기간 선택 드롭다운 */}
            <label htmlFor="period">게시 기간</label>
            <select
              id="period"
              name="period"
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value)}
              style={{ width: "150px", height: "25px" }}
            >
              <option value="">게시 기간 선택</option>
              <option value="1일">1일</option>
              <option value="7일">7일</option>
              <option value="30일">30일</option>
            </select>
          </ContainBox>
          <ContainBox>
            {/* 광고 금액 표시 */}
            <label htmlFor="fee">결제 금액</label>
            <div style={{ width: "150px", height: "25px" }}>
              {fee && `${fee}원`}
            </div>
          </ContainBox>
        </SubContainer>
        <ButtonContainer>
          <PaymentButton>결제 하기</PaymentButton>
          <ConfirmButton onClick={handleAdSubmit}>등록 요청</ConfirmButton>
          <CancleButton onClick={handleCancle}>취소</CancleButton>
        </ButtonContainer>
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
