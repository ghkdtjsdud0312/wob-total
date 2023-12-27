import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostPreview from "../../component/PostPreview";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MyPageAxiosApi from "../../api/MyPageAxiosApi";

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

const JoinPost = ({ selectedDate }) => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        console.log("이메일 뜨냐? : ", userEmail);
        if (!userEmail) {
          console.log("사용자 이메일이 없습니다.");
          return;
        }
        const schedules = await MyPageAxiosApi.joinList(userEmail);
        setPostList(schedules.data);
        console.log("데이터 뭐옴? ", schedules);
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

export default JoinPost;
