import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import PostPreview from "../component/PostPreview";
import moment from "moment";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const PostList = ({ selectedSports, selectedDate }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const rsp = await PostAxiosApi.postListAll();
        console.log(rsp.data);
        if (rsp.status === 200) {
          // 선택 운동에 따라 필터링
          const filterSports =
            (selectedSports || []).length === 0
              ? rsp.data
              : rsp.data.filter((post) =>
                  selectedSports.includes(post.category)
                );

          // 선택 날짜에 따라 필터링
          const filteredPosts = filterSports.filter((post) =>
            moment(post.date).isSame(selectedDate, "day")
          );

          setPostList(filteredPosts);
        }
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
    fetchPostList();
  }, [selectedSports, selectedDate]); // selectedSports가 변경될 때마다 실행

  return (
    <>
      <Container>
        {postList &&
          postList.map((post) => (
            // PostPreview 컴포넌트를 호출하면서 필요한 데이터를 전달
            <PostPreview
              key={post.id}
              title={post.title}
              date={post.date}
              time={post.time}
              place={post.place}
              people={post.people}
              category={post.category}
            />
          ))}
      </Container>
    </>
  );
};

export default PostList;
