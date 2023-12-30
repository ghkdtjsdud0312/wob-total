import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdAxiosApi from "../api/AdAxoisApi";
import PostAxiosApi from "../api/PostAxiosApi";
import { storage } from "../api/firebase";
import Modal from "../utils/Modal";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Payment from "../component/Payment";

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

  &.sub2 {
    height: 250px;
  }
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

const ModalContainer = styled.div`
  margin: 100px;
  min-height: 50px;
  margin: 15px;
`;
const ModalSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalText1 = styled.p`
  font-size: 24px;
  white-space: nowrap;
  width: 30%;
`;
const ModalText2 = styled.input`
  font-size: 24px;
  width: 60%;
`;
const PayBox = styled.div`
  display: flex;
  justify-content: center;
`;

const AdSubmit = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [period, setPeriod] = useState("");
  const [fee, setFee] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const location = useLocation();
  const { postId } = useParams();
  const [paymentId, setPaymentId] = useState("");
  const [post, setPost] = useState("");
  const [teaName, setTeaName] = useState("");
  const [teaPhone, setTeaPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [isUserName, setIsUserName] = useState(false);
  const [isUserPhoneNum, SetIsUserPhoneNum] = useState(false);

  const handleAdSubmit = async (e) => {
    e.preventDefault();

    // postId 추출
    const postId = Number(location.pathname.split("/").pop());
    console.log(JSON.stringify(postId));
    console.log(typeof postId);

    // 결제 창 열기
    onPaymentOpen();
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

  // 결제하기
  const onPaymentOpen = () => {
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setCancelModalOpen(true); // 취소 버튼 누르면 모달 뜸.
  };

  const confirmCancel = () => {
    // 취소버튼 확인 누르면 홈으로 이동
    navigate("/");
  };

  // 취소 모달 닫음
  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  // 주문자 이름 변수에 저장
  const onSaveName = (e) => {
    setUserName(e.target.value);
    setIsUserName(true);
    console.log(userName);
  };

  // 주문자 전화번호 변수에 저장
  const onSavePhone = (e) => {
    setUserPhoneNum(e.target.value);
    SetIsUserPhoneNum(true);
    console.log(userPhoneNum);
  };

  // 강사의 이름과 전화번호 받아오기
  useEffect(() => {
    const getPostUserInfo = async () => {
      const rsp = await PostAxiosApi.getPostUserInfo(
        localStorage.getItem("email")
      );
      console.log("회원의 이름과 전화번호 : ", rsp.data[0]);
      if (rsp.data) {
        setTeaName(rsp.data[0].name);
        setTeaPhone(rsp.data[0].phoneNumber);
      }
    };
    getPostUserInfo();
  }, []);

  // 포스트 정보 가져오기
  useEffect(() => {
    const getPostDetail = async () => {
      console.log("포스트 아이디 : " + postId);
      try {
        const rsp = await PostAxiosApi.postListById(postId);
        console.log("postId값 postDetail에서 data 받아지나?", postId);
        console.log("서버 응답:", rsp.data); // 서버 응답 확인
        // const setPostNum = localStorage.postId;
        setPost(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (postId) {
      getPostDetail();
    }
  }, [postId]);

  // paymentId 값 받아오기 === 결제 성공
  const handlePaymentComplete = async (paymentResult) => {
    setPaymentId(paymentResult);
    console.log("결제가 완료되었습니다. 결과:", paymentResult);

    // 결제 완료 후 광고 등록 요청
    try {
      const adData = {
        url, // 업로드된 이미지 URL
        period, // 선택된 광고 기간
        fee, // 계산된 광고 비용
        postingDate, // 선택된 게시 시작 일자
        paymentId: paymentResult, // 결제 ID
        // 기타 필요한 데이터
      };

      const rsp = await AdAxiosApi.adSubmit(postId, adData);
      console.log("광고 등록 응답: ", rsp.data);

      if (rsp.data) {
        alert("등록 요청 완료");
        navigate("/"); // 성공 시 홈으로 이동
      }
    } catch (error) {
      console.error("광고 등록 중 오류 발생", error);
    }
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
        <SubContainer className="sub2">
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
          <ContainBox>
            <ExplainBox>
              * 결제 하기 클릭시 결제가 되고 바로 등록 요청이 됩니다. <br />
              기재한 내용을 다시 한 번 확인해 주세요.
            </ExplainBox>
          </ContainBox>
        </SubContainer>
        <ButtonContainer>
          <ConfirmButton onClick={handleAdSubmit}>결제 하기</ConfirmButton>
          <CancleButton onClick={handleCancel}>취소</CancleButton>
        </ButtonContainer>
        <Modal
          open={cancelModalOpen}
          close={closeCancelModal}
          confirm={confirmCancel}
          type={true}
          header="취소"
        >
          등록을 취소하시겠습니까?
        </Modal>
        <Modal open={modalOpen} close={closeModal} header="사용자 정보 입력">
          <ModalContainer>
            <ModalSubContainer>
              <ModalText1>주문자 성함</ModalText1>
              <ModalText2 value={userName} onChange={onSaveName}></ModalText2>
            </ModalSubContainer>
            <ModalSubContainer>
              <ModalText1>주문자 연락처</ModalText1>
              <ModalText2
                value={userPhoneNum}
                onChange={onSavePhone}
                placeholder="하이픈(-) 포함"
              ></ModalText2>
            </ModalSubContainer>
            {isUserName && isUserPhoneNum ? (
              <PayBox>
                <Payment
                  setDisabled={false}
                  userName={userName}
                  userPhone={userPhoneNum}
                  postTitle={post.title}
                  postUserName={teaName}
                  postPhoneNum={teaPhone}
                  fee={fee}
                  onPaymentComplete={handlePaymentComplete}
                >
                  결제하기
                </Payment>
              </PayBox>
            ) : (
              <PayBox>
                <Payment setDisabled={true}>결제하기</Payment>
              </PayBox>
            )}
          </ModalContainer>
        </Modal>
      </Container>
    </>
  );
};

export default AdSubmit;
