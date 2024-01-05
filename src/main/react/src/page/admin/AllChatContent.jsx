// 관리자 채팅방 관리
import React, { useState, useEffect } from "react";
import SettingAxiosApi from "../../api/SettingAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import Tr5 from "../../component/admin/ChatElement";

// 전체 큰 틀css
const ChatContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;
    cursor: pointer;
  }

  // 채팅방 목록 css
  p {
    text-align: center;
    font-size: 45px;
    padding-bottom: 50px;
  }

  .tableBox {
    //table 표
    overflow-x: auto;
    table {
      margin: 0 auto;
      thead {
        tr {
          th {
            padding: 20px 10px;
            font-size: 20px;
            white-space: nowrap;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          white-space: nowrap;
        }
      }
    }
  }
  @media screen and (max-width: 430px) {
    padding-top: 60px;
    p {
      font-size: 30px;
      padding-bottom: 30px;
    }
    .tableBox {
      width: 100%;
      white-space: nowrap;
      table {
        width: auto;
        thead {
          tr {
            th {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
`;

// 등록 버튼
const Buttons = styled.div`
  border: 1px solid white;
  background-color: white;
  width: 100%;
  text-align: center;
  color: #353535;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
    cursor: pointer;
    color: #353535;
  }
  @media screen and (max-width: 430px) {
    button {
      padding: 10px;
      font-size: 13px;
      margin: 15px 10px;
    }
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
const PageButton2 = styled.button`
  background-color: var(--MINT);
  color: #555555;
  width: 70px;
  height: 40px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 8px 5px;
  border-radius: 15%;
`;

// 채팅 목록 페이지
const AllChatContent = () => {
    // 맵 돌릴 리스트
    const [chatList, setChatList] = useState([]); // 채팅방 리스트
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
    const [pageRange, setPageRange] = useState({ start: 0, end: 5 }); // 버튼 범위
    const [num, setNum] = useState(1); // 인덱스 번호
    const [isChange, setIsChange] = useState(false);
    const navigate = useNavigate();

    // 수정 시 경로 이동
    const handleClick = (path) => {
        navigate(path);
    };

    const getTotalPage = async () => {
        try {
            // 전체 페이지 수 가져오기
            const rsp = await SettingAxiosApi.chatAllPage(0, 5);
            console.log("rsp.data : ", rsp.data);
            setTotalPage(rsp.data);
        } catch (error) {
            console.log(error);
        }
        setIsChange(false);
    };
    const fetchPaymentList = async () => {
        try {
            // 현재 페이지의 결제 내역 목록
            const rsp2 = await SettingAxiosApi.chatPageAllList(currentPage, 5);
            console.log("rsp2.data : ", rsp2.data);
            setChatList(rsp2.data);
        } catch (error) {
            console.log(error);
        }
    };

    // 현재 페이지 변경 시, 현재 페이지의 목록을 가져오는 함수 호출
    useEffect(() => {
        fetchPaymentList();
    }, [currentPage]);

    // 첫 렌더링 & active의 상태가 바뀌었을 시, 바로 적용하기 위한 useEffect()
    useEffect(() => {
        getTotalPage();
        if (isChange) {
            fetchPaymentList();
        }
    }, [isChange]);

    // 페이지 이동
    const handlePageChange = (number) => {
        console.log(number);
        setCurrentPage(number - 1);
    };

    // 페이지 범위 이동 함수
    const handlePageRange = (direction) => {
        if (direction === "next") {
            setPageRange((prevRange) => ({
                start: prevRange.end,
                end: prevRange.end + 5,
            }));
        } else if (direction === "prev") {
            setPageRange((prevRange) => ({
                start: prevRange.start - 5,
                end: prevRange.start,
            }));
        }
    };

    // 버튼
    const renderPagination = () => {
        return (
            <PaginationContainer>
                {pageRange.start > 0 && (
                    <PageButton2 onClick={() => handlePageRange("prev")}>
                        이전
                    </PageButton2>
                )}
                {Array.from({ length: totalPage }, (_, i) => i + 1)
                    .slice(pageRange.start, pageRange.end)
                    .map(
                        (
                            page // Array.from() : 배열을 만드는 함수
                        ) => (
                            <PageButton key={page} onClick={() => handlePageChange(page)}>
                                {page}
                            </PageButton>
                        )
                    )}
                {pageRange.end < totalPage && (
                    <PageButton2 onClick={() => handlePageRange("next")}>
                        다음
                    </PageButton2>
                )}
            </PaginationContainer>
        );
    };

    return (
        <ChatContainer>
            <div className="Logo" onClick={() => handleClick("/AdminMain")}>
                <FullLogoBth />
            </div>
            <p>전체 관리자 1:1 문의 목록</p>
            <div className="tableBox">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>보낸사람</th>
                        <th>방번호</th>
                        <th>채팅내용</th>
                        <th>상태</th>
                        <th>분류선택</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* map으로 반복할 요소 */}
                    {chatList &&
                        chatList.map((data, index) => (
                            <Tr5
                                key={data.id} // 고유한 키 생성
                                data={data}
                                index={index + num}
                                active={data.active === "active"}
                                setIsChange={setIsChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {renderPagination()}
            <Buttons>
                <button onClick={() => handleClick("/AdminMain")}>뒤로가기</button>
            </Buttons>
            {/* 햄버거 토글 사이드바 */}
            <Layout />
        </ChatContainer>
    );
};

export default AllChatContent;
