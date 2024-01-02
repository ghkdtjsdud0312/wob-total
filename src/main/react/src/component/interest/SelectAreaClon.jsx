import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { TitleAlign, TextAlign, SelectButton } from "../MBTI/MBTIcommon";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 768px;
  margin: 0px auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectOptionBoardCom = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export const OptionBoardCom = styled.div`
  color: #353535;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
`;

export const SelectOptionBoardHeaderComp = styled.div`
  font-size: 1.8em;
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 768px;
  height: 60px;
  background-color: #353535;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
export const SelectOptionBoardFooterCom = styled.div`
  width: 768px;
  height: 60px;
  background-color: #dfede9;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 40px; /* 왼쪽 하단 모서리 둥글게 */
  border-bottom-right-radius: 40px; /* 오른쪽 하단 모서리 둥글게 */
  /* position: absolute; */
  bottom: 0;
`;

const AreasGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 20px;
`;

const SelectArea = ({ options, min, max, title, text, handleSelected }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleSelect = (item) => {
    console.log("선택된 운동들 : ", ...selectedItems);
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      if (selectedItems.length < maxSelection) {
        setSelectedItems([...selectedItems, item]);
        handleSelected([...selectedItems, item]);
      }
    }
  };

  return (
    <CenterBox>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <AreasGird>
        {options.map((activity) => (
          <SelectButton
            key={activity}
            onClick={() => handleSelect(activity)}
            selected={selectedItems.includes(activity)}
          >
            {activity}
          </SelectButton>
        ))}
      </AreasGird>
    </CenterBox>
  );
};

export default SelectArea;
