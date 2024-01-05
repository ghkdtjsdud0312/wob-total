import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import PostPreview from "../component/PostPreview";
import moment from "moment";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  color: var(--GREEN);
  margin-bottom: 15%;
  @media only screen and (max-width: 768px) {
    margin-bottom: 25%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// 페이지 네이션 큰 틀
const PaginationContainer = styled.div`
  text-align: center;
  padding-top: 20px;
`;

// 페이지네이션 버튼
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
    background-color: var(--MINT);
  }

  &:focus {
    outline: none;
    background-color: var(--MINT);
  }
`;

const PageButton2 = styled.button`
  background-color: var(--MINT);
  color: #555555;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    box-shadow: 0px 10px 10px #dfede9;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  color: #555555;
  display: flex;
  justify-content: center;
`;

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageRange, setPageRange] = useState({ start: 0, end: 5 });

  useEffect(() => {
    const fetchPostList = async () => {
      // 전체 페이지 수 가져오기
      const rsp = await PostAxiosApi.postPageCount(0, 5);
      setTotalPage(rsp.data);
      console.log("리스트 와라!", rsp.data);

      // 현재 페이지의 게시글 목록
      const currentPageRsp = await PostAxiosApi.postPageList(currentPage, 5);
      if (currentPageRsp.status === 200) {
        const allPosts = currentPageRsp.data;
        setPostList(allPosts);
      }
    };
    fetchPostList();
  }, [currentPage]);

  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
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
          .map((page) => (
            <PageButton key={page} onClick={() => handlePageChange(page)}>
              {page}
            </PageButton>
          ))}
        {pageRange.end < totalPage && (
          <PageButton2 onClick={() => handlePageRange("next")}>
            다음
          </PageButton2>
        )}
      </PaginationContainer>
    );
  };

  return (
    <>
      <Container>
        <Title>전체글 보기</Title>
        {postList &&
          postList.map((post) => (
            // PostPreview 컴포넌트를 호출하면서 필요한 데이터를 전달
            <StyledLink to={`/postDetail/${post.id}`} key={post.id}>
              <PostPreview
                key={post.id}
                title={post.title}
                date={post.date}
                time={post.time}
                local={post.local}
                people={post.people}
                category={post.categoryName}
                type={post.type}
              />
            </StyledLink>
          ))}
        {renderPagination()}
      </Container>
    </>
  );
};

export default PostList;
