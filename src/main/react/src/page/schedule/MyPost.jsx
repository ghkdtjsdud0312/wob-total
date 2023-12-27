import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../../api/PostAxiosApi";
import PostPreview from "../../component/PostPreview";
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

const MyPost = ({ postId }) => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const [selectPost, setSelectPost] = useState(null);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const rsp = await PostAxiosApi.postListAll(localStorage.email);
        console.log("마이포스트 이메일 가져온다 : ", localStorage.email);
        console.log("이메일로 걸러서 가져와지나? : ", rsp.data);
        if (rsp.status === 200) {
          // 전체 게시글 받아온 후 필터링
          const allPosts = rsp.data;
          // 선택 날짜에 따라 필터링
          const userPosts = allPosts.filter(
            (post) => post.userEmail === localStorage.email
          );
          setPostList(userPosts);
        }
      } catch (error) {
        console.error("에러가 뜬다:", error);
      }
    };
    fetchPostList();
  }, []);

  return (
    <>
      <Container>
        {postList &&
          postList.map((post) => (
            // PostPreview 컴포넌트를 호출하면서 필요한 데이터를 전달
            <StyledLink to={`/postDetail/${post.id}`} key={post.id}>
              <PostPreview
                title={post.title}
                date={post.date}
                time={post.time}
                place={post.place}
                people={post.people}
                category={post.categoryName}
              />
            </StyledLink>
          ))}
      </Container>
    </>
  );
};

export default MyPost;
