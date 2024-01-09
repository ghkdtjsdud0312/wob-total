import { useState } from "react";
import styled from "styled-components";
import { SelectButton } from "../MBTI/MBTIcommon";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 768px;
  margin: 0px auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SportsGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5em 1em;
  padding: 20px;
`;

const SelectSports = ({ options, min, max, title, text, handleSelected }) => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [value, setValue] = useState("");
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleSelect = (item) => {
    console.log("선택된 운동들 : ", ...selectedSports);
    if (selectedSports.includes(item)) {
      setSelectedSports(
        selectedSports.filter((selectedSports) => selectedSports !== item)
      );
    } else {
      if (
        value
          ? selectedSports.length < maxSelection - 1 // 기타: 값이 들어온 경우 버튼을 2개까지만
          : selectedSports.length < maxSelection // 버튼만 선택한 경우 3개까지만
      ) {
        setSelectedSports([...selectedSports, item]);
        handleSelected([...selectedSports, item]);
      }
    }
  };

  return (
    <CenterBox>
      <SportsGird>
        {options.map((activity) => (
          <SelectButton
            key={activity}
            onClick={() => handleSelect(activity)}
            selected={selectedSports.includes(activity)}
          >
            {activity}
          </SelectButton>
        ))}
      </SportsGird>
    </CenterBox>
  );
};

export default SelectSports;
