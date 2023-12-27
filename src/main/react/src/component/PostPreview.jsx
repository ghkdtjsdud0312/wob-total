import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChild,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 700px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const DetailBox = styled.div`
  width: 80%;
  min-width: 300px;
  height: 135px;
  background-color: var(--MINT);
  color: #555555;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin: 5px;
  cursor: pointer;
`;

const Titlebox = styled.div`
  width: 95%;
  padding-top: 25px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const DateBox = styled.div`
  width: 90%;
  padding-top: 15px;
  padding-left: 20px;
`;

const SecondBox = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-left: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const ColumnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceBox = styled.div`
  display: flex;
`;

const PeopleBox = styled.div`
  display: flex;
`;

const CategoryBox = styled.div`
  display: flex;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px; /* 아이콘과 텍스트 사이의 간격을 조절 */
`;

const PostPreview = ({ title, date, time, local, people, category, type }) => {
  const isLesson = type === "lesson";
  return (
    <>
      <Container>
        <DetailBox
          style={{ backgroundColor: isLesson ? "var(--GREEN)" : "var(--MINT)" }}
        >
          <Titlebox>
            {title}{" "}
            {isLesson && <span style={{ color: "#555555" }}>Lesson</span>}
          </Titlebox>
          <DateBox>
            {date} {time}
          </DateBox>
          <SecondBox>
            <ColumnBox>
              <PlaceBox>
                <Icon icon={faLocationDot} />
                {local}
              </PlaceBox>
            </ColumnBox>
            <ColumnBox>
              <PeopleBox>
                <Icon icon={faChild} />
                {people} 명 모집
              </PeopleBox>
            </ColumnBox>
            <ColumnBox>
              <CategoryBox>
                <Icon icon={faPersonWalking} />
                {category}
              </CategoryBox>
            </ColumnBox>
          </SecondBox>
        </DetailBox>
      </Container>
    </>
  );
};

export default PostPreview;
