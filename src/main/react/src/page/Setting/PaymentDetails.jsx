import styled from "styled-components";
import SettingHeader from "../../layout/SettingHeader";
import { useEffect, useState } from "react";
import SettingAxiosApi from "../../api/SettingAxiosApi";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  min-height: 800px;
  margin: 0px auto;
  background-color: var(--MINT);
  margin-bottom: 100px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const SubContainer = styled.div`
  width: 100%;
  padding: 50px 0 0 0;
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
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-bottom: 20px; */
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 28px;
  margin: 15px 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgray;
  }

  &:focus {
    outline: none;
    background-color: royalblue;
  }
`;

const PaymentDatails = () => {
  const [pay, setPay] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수

  // 총 페이지 수 계산
  useEffect(() => {
    const totalPage = async () => {
      try {
        const res = await SettingAxiosApi.paymentPage(
            localStorage.getItem("email"),
            0,
            1
        );
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, []);

  // 현재 페이지
  useEffect(() => {
    const movieList = async () => {
      try {
        const res = await SettingAxiosApi.paymentPageList(
            localStorage.getItem("email"),
            currentPage,
            1
        );
        console.log(res.data);
        setPay(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    movieList();
  }, [currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  // 버튼
  const renderPagination = () => {
    return (
        <PaginationContainer>
          {Array.from({ length: totalPage }, (_, i) => i + 1).map(
              (
                  page // Array.from() : 배열을 만드는 함수
              ) => (
                  <PageButton key={page} onClick={() => handlePageChange(page)}>
                    {page}
                  </PageButton>
              )
          )}
        </PaginationContainer>
    );
  };

  if (!pay) return <></>;
  return (
      <>
        <SettingHeader title="결제내역" />
        <Container>
          {pay &&
              pay.map((payment) => (
                  <SubContainer className="sub2" key={payment.id}>
                    <BottomBox>
                      <SubBottomBox className="subBox1">
                        <BottomTextBox>
                          <div className="bottomDiv1">
                            <div className="bottomDiv2">
                              <p className="bottomP1">주문번호</p>
                              <p className="bottomP2">{payment.orderNum}</p>
                            </div>
                          </div>
                        </BottomTextBox>
                      </SubBottomBox>
                      <SubBottomBox className="subBox2">
                        <BottomTextBox>
                          <div className="bottomDiv1">
                            <div className="bottomDiv2">
                              <p className="bottomP1">클래스 이름</p>
                              <p className="bottomP2">{payment.postTitle}</p>
                            </div>
                            <div className="bottomDiv2">
                              <p className="bottomP1">강사명</p>
                              <p className="bottomP2">{payment.postUserName}</p>
                            </div>
                            <div className="bottomDiv2">
                              <p className="bottomP1">연락처</p>
                              <p className="bottomP2">{payment.postPhoneNum}</p>
                            </div>
                            <div className="bottomDiv2">
                              <p className="bottomP1">결제금액</p>
                              <p className="bottomP2">{payment.fee}</p>
                            </div>
                          </div>
                        </BottomTextBox>
                      </SubBottomBox>
                      <SubBottomBox className="subBox3">
                        <BottomTextBox>
                          <div className="bottomDiv1">
                            <div className="bottomDiv2">
                              <p className="bottomP1">주문자명</p>
                              <p className="bottomP2">{payment.userName}</p>
                            </div>
                            <div className="bottomDiv2">
                              <p className="bottomP1">연락처</p>
                              <p className="bottomP2">{payment.phoneNum}</p>
                            </div>
                          </div>
                        </BottomTextBox>
                      </SubBottomBox>
                      <SubBottomBox className="subBox4">
                        <HomeBtn
                            onClick={() =>
                                alert("관리자 (dobby22023@naver.com) 에게 문의해주세요.")
                            }
                        >
                          취소요청
                        </HomeBtn>
                      </SubBottomBox>
                    </BottomBox>
                  </SubContainer>
              ))}
          {renderPagination()}
        </Container>
      </>
  );
};
export default PaymentDatails;
