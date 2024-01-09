import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarComp from "../../component/CalendarComp";
import JoinPost from "./JoinPost";

const BoardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 768px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const JoinCon = styled.div`
  color: #353535;
  display: flex;
  justify-content: center;
  font-size: 2em;
  padding: 20px;
`;

const Boards = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;
const Date = styled.p`
  color: #a6a6a6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoardJoin = styled.div``;
const DateCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 250px;
`;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <BoardContainer>
        <Boards>
          <JoinCon>Buddy Schedule</JoinCon>
          <>
            <CalendarComp onDateSelect={onDateSelect} />
          </>
          <>
            <DateCon>
              <Date>{selectedDate.format("YYYY년 MM월 DD일")}</Date>
            </DateCon>
          </>
          <BoardJoin>
            {/* 선택된 날짜에 따라  */}
            <JoinPost selectedDate={selectedDate} />
          </BoardJoin>
        </Boards>
      </BoardContainer>
    </>
  );
};

export default Schedule;
