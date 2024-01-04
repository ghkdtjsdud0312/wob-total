// 관리자 회원 관리(전체 회원 조회)
import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import Tr2 from "../../component/admin/UserElement";

// 전체 큰 틀css
const UserContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .Logo {
    cursor: pointer;
  }
  // 카테고리 목록 css
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
            vertical-align: middle;
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
      font-size: 25px;
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

// 회원 목록 페이지
const AllMemberInfo = () => {
  // 맵 돌릴 리스트
  const [userGet, setUserGet] = useState([]); // 회원리스트
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [num, setNum] = useState(1); // 인덱스 번호
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };

  // 회원 페이지 수 정하기
  const getTotalPage = async () => {
    try {
      const res = await AdminAxiosApi.userPageCount(0, 5);
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
      fetchUserGet();
    }
  }, [isChange]);

  // 다음 페이지네이션 시 몇개씩 넘길 것인지
  const fetchUserGet = async () => {
    try {
      const res = await AdminAxiosApi.userPageList(currentPage, 5);
      console.log(res.data);
      setUserGet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 회원 목록 (페이지나누기)
  useEffect(() => {
    fetchUserGet();
  }, [currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);

    // 페이지 변경 시 목록의 순서를 나타내는 코드 추가
    setNum((number - 1) * 5 + 1); // 각 페이지의 첫번째 인덱스 번호
  };

  // 페이지 네이션 버튼
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
    <UserContainer>
      <div className="Logo" onClick={() => handleClick("/AdminMain")}>
        <FullLogoBth />
      </div>
      <p>전체 회원 관리 목록</p>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>탈퇴이유</th>
              <th>약관동의</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>상태</th>
              <th>분류선택</th>
              <th>회원상태</th>
              <th>회원삭제</th>
            </tr>
          </thead>
          <tbody>
            {userGet &&
              userGet.map((data, index) => (
                <Tr2
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
    </UserContainer>
  );
};

export default AllMemberInfo;
