import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostPreview from "../../component/PostPreview";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MyPageAxiosApi from "../../api/MyPageAxiosApi";
import moment from "moment";

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

  const filteredPosts = postList.filter((post) =>
    moment(post.date).isSame(selectedDate, "day")
  );

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

        // 2. 추가된 일정에 매칭되는 포스트 ID 목록 가져오기
        const postIdList = schedules.data.map((schedule) => schedule.postId); // 가정: 일정 데이터에 postId로 매칭된다고 가정
        const matchingPosts = await MyPageAxiosApi.getMatchingPosts(postIdList); // 포스트 ID로 매칭되는 포스트 리스트 가져오기
        console.log("매칭되는 포스트 리스트: ", matchingPosts);
        // 3. 불러온 포스트를 JoinPost 컴포넌트에서 렌더링
        setPostList(matchingPosts.data); // 매칭되는 포스트 리스트로 state 업데이트
      } catch (error) {
        console.error("에러가 뜬다:", error);
      }
    };
    fetchPostList();
  }, [selectedDate]);

  return (
    <>
      <Container>
        {postList &&
          filteredPosts.map((post) => (
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

export default JoinPost;
