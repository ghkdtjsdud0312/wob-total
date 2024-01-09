import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import { useParams } from "react-router-dom";
import PostMap from "../component/PostMap";
import Payment from "../component/Payment";
import ChatStart from "../component/ChatStart";
import Modal from "../utils/Modal";
import MyPageAxiosApi from "../api/MyPageAxiosApi";

const Container = styled.div`
  padding-bottom: 10%;
  width: 768px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--BLACK);
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContentBox = styled.div`
  margin-bottom: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--BLACK);
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const PictureCon = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;

const MiddleBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 5px;
`;

const TitleBox = styled.div`
  margin-bottom: -10px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
`;
const MapContainer = styled.div`
  width: 768px;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  display: flex;
  font-size: 1rem;

  .bottomDiv1 {
    flex-direction: column;
  }
  .bottomDiv2 {
    margin: 5px;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  div {
    display: flex;
    flex-direction: row;
  }
  .bottomP1 {
    width: 70px;
    color: gray;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;

const ContentButton = styled.button`
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

const PostDetail = ({ categoryImage }) => {
  const { postId } = useParams(); //postId를 url에서 받아옴
  const [post, setPost] = useState("");
  const [teaName, setTeaName] = useState("");
  const [teaPhone, setTeaPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [isUserName, setIsUserName] = useState(false);
  const [isUserPhoneNum, SetIsUserPhoneNum] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const onModalOpen = () => {
    setModalOpen(true);
  };
  const closeSchedul = () => {
    setScheduleOpen(false);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const confirmModal = () => {
    setModalOpen(false);
  };
  const onSchedulOpen = () => {
    // 일정 추가 버튼 클릭 시 handleAddSchedule 실행 및 일정 모달 열기
    handleAddSchedule();
    setScheduleOpen(true);
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
  // if (!post) return <></>;

  // 일정추가하기
  const handleAddSchedule = async () => {
    try {
      const email = localStorage.getItem("email"); // 사용자 이메일 가져오기
      const accessToken = localStorage.getItem("accessToken");

      if (!email || !accessToken) {
        // 로그인이 필요한 경우
        console.log("로그인이 필요합니다.");
        return;
      }

      const response = await MyPageAxiosApi.join(email, postId); // MyPageAxiosApi.join 호출
      console.log("일정 추가 결과 이메일, 포스트아이디:", email, postId);
      console.log("일정 추가 결과:", response.data);
      // 성공했을 때 필요한 로직 추가
    } catch (error) {
      // 에러 처리 로직 추가
      console.error("내일정 추가 에러:", error);
    }
  };

  // paymentId 값 받아오기 === 결제 성공
  const handlePaymentComplete = (paymentResult) => {
    setPaymentId(paymentResult);
    console.log("결제가 완료되었습니다. 결과:", paymentResult);
  };

  return (
    <Container>
      <ContentBox>
        <PictureCon>
          <Image
            src={post.type === "lesson" ? post.image : post.categoryImage}
            alt="이미지"
          />
        </PictureCon>
        <MiddleBox>
          <TextBox>
            <TitleBox> {post.title} </TitleBox>
          </TextBox>
          <TextBox>
            <div className="bottomDiv1">
              <div className="bottomDiv2">
                <p className="bottomP1">종목</p>
                <p className="bottomP2">{post.categoryName}</p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">유형</p>
                <p className="bottomP2">{post.type}</p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">장소</p>
                <p className="bottomP2">{post.place}</p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">일시</p>
                <p className="bottomP2">
                  {post.date} {post.time}
                </p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">모집 인원</p>
                <p className="bottomP2">{post.people}</p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">예상 비용</p>
                <p className="bottomP2">{post.fee}</p>
              </div>
              <div className="bottomDiv2">
                <p className="bottomP1">일정 소개</p>
                <p className="bottomP2">{post.introduction}</p>
              </div>
            </div>
          </TextBox>
        </MiddleBox>
        <MapContainer>
          <PostMap />
        </MapContainer>
        <ButtonBox>
          {post.type === "normal" && (
            <ChatStart postId={postId}>채팅방입장</ChatStart>
          )}
          {post.type === "lesson" && (
            <ChatStart postId={postId}>채팅방입장</ChatStart>
          )}
          {post.type === "lesson" && post.fee > 100 ? (
            <PaymentBtn onClick={() => onModalOpen()}>결제하기</PaymentBtn>
          ) : (
            <ContentButton onClick={() => onSchedulOpen()}>
              일정추가
            </ContentButton>
          )}
        </ButtonBox>
      </ContentBox>
      <Modal
        open={scheduleOpen}
        header={post.title}
        confirm={closeSchedul}
        close={closeSchedul}
        children="일정 추가가 완료되었습니다."
      ></Modal>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="결제자 정보를 입력해주세요 !!"
      >
        <ModalContainer>
          <ModalSubContainer>
            <ModalText1>이름</ModalText1>
            <ModalText2 value={userName} onChange={onSaveName}></ModalText2>
          </ModalSubContainer>
          <ModalSubContainer>
            <ModalText1>연락처</ModalText1>
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
                fee={post.fee}
                postPhoneNum={teaPhone}
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
  );
};

export default PostDetail;
