import { useState } from "react";
import styled from "styled-components";
import { TitleAlign, TextAlign, SelectButton } from "../MBTI/MBTIcommon";

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
const AreasGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5em 1em;
  padding: 20px;
  @media only screen and (max-width: 768px) {
    grid-gap: 0.3em 0.5em;
  }
`;

const SelectArea = ({ options, min, max, title, text, handleSelected }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleSelect = (item) => {
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
