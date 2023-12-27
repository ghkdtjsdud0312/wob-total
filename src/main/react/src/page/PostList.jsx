import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import PostPreview from "../component/PostPreview";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PostList = ({ selectedDate }) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const rsp = await PostAxiosApi.postListAll();
        console.log(rsp.data);
        if (rsp.status === 200) {
          // 전체 게시글 받아온 후 날짜에 따라 정렬
          const allPosts = rsp.data;
          const sortedPosts = allPosts.sort(
            (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
          );
          // 선택 날짜에 따라 필터링
          const filteredPosts = selectedDate
            ? allPosts.filter((post) =>
                moment(post.date).isSame(selectedDate, "day")
              )
            : sortedPosts;
          setPostList(filteredPosts);
        }
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
    fetchPostList();
  }, [selectedDate]);

  return (
    <>
      <Container>
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
      </Container>
    </>
  );
};

export default PostList;
