// 관리자 종목 목록
import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import Tr from "../../component/admin/TableElement";

// 전체 큰 틀css
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    text-align: center;
    cursor: pointer;
  }

  // 종목 목록 css
  p {
    text-align: center;
    font-size: 45px;
    padding-bottom: 50px;
  }

  .tableBox {
    //table 표
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
    // 종목 목록 css
    p {
      font-size: 30px;
      padding-bottom: 20px;
    }
    .tableBox {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      table {
        width: auto;
        thead {
          tr {
            th {
              font-size: 17px;
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
  color: none;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
    cursor: pointer;
    color: none;
  }
`;

// 페이지 네이션 큰 틀
const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// 페이지 네이션 버튼
const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 28px;
  margin: 0 5px;
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

// 종목 목록 페이지
const AllBoardContent = () => {
  // 맵 돌릴 리스트
  const [boardList, setBoardList] = useState([]); // 종목 리스트
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [num, setNum] = useState(1); // 인덱스 번호
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };

  // 종목 페이지 수 정하기
  const getTotalPage = async () => {
    try {
      const res = await AdminAxiosApi.boardPageCount(0, 5);
      setTotalPage(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsChange(false);
  };

  // 총 페이지 수 계산
  useEffect(() => {
    getTotalPage();
  }, []);

  useEffect(() => {
    console.log("isChange? : " + isChange);
    if (isChange) {
      getTotalPage();
      fetchBoardList();
    }
  }, [isChange]);

  // 다음 페이지네이션 시 몇개씩 넘길 것인지
  const fetchBoardList = async () => {
    try {
      const res = await AdminAxiosApi.boardPageList(currentPage, 5);
      console.log(res.data);
      setBoardList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 종목 목록 (페이지나누기)
  useEffect(() => {
    fetchBoardList();
  }, [currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);

    // 페이지 변경 시 목록의 순서를 나타내는 코드 추가
    setNum((number - 1) * 5 + 1); // 각 페이지의 첫번째 인덱스 번호
  };

  // 페이지 네이션 페이지 버튼
  const renderPagination = () => {
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <BoardContainer>
      <div className="Logo" onClick={() => handleClick("/AdminMain")}>
        <FullLogoBth />
      </div>
      <p>전체 종목 목록</p>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>로고</th>
              <th>종목</th>
              <th>이미지</th>
              <th>상태</th>
              <th>분류선택</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* map으로 반복할 요소 */}
            {boardList &&
              boardList.map((data, index) => (
                <Tr
                  key={data.id}
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
        <button onClick={() => handleClick("/AdminBoardRegistration")}>
          등록하기
        </button>
        <button onClick={() => handleClick("/AdminMain")}>뒤로가기</button>
      </Buttons>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </BoardContainer>
  );
};

export default AllBoardContent;
