import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SelectSports from "../../component/interest/SelectSports";
import SelectArea from "../../component/interest/SelectArea";
import { WhiteBoard } from "../../component/interest/WhiteBoard";
import {
  sportsList,
  areaList,
  minNumber,
  maxNumber,
  selectText,
  selectAreaTitle,
  selectSportsTitle,
} from "../../component/login/select";

const Container = styled.div`
  width: 768px;
  height: 100vh;
  margin: 0px auto;
  background-color: #04bf8a;
`;

const InterestEnter = () => {
  const [showWhiteBoard, setShowWhiteBoard] = useState(false);
  const [sportsCompleted, setSportsCompleted] = useState(false);
  const activityList = sportsList;
  const activityAreaList = areaList;

  const minValue = minNumber;
  const maxValue = maxNumber;

  const handleSportsCompletion = () => {
    setSportsCompleted(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWhiteBoard(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Container>
        <WhiteBoard show={showWhiteBoard}>
          {sportsCompleted ? (
            <SelectArea
              options={activityAreaList}
              min={minValue}
              max={maxValue}
              title={selectAreaTitle}
              text={selectText}
            />
          ) : (
            <SelectSports
              onComplete={handleSportsCompletion}
              options={activityList}
              min={minValue}
              max={maxValue}
              title={selectSportsTitle}
              text={selectText}
            />
          )}
        </WhiteBoard>
      </Container>
    </>
  );
};

export default InterestEnter;
