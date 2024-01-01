import React, { useState } from "react";
import styled from "styled-components";
import { SelectButton } from "../MBTI/MBTIcommon";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 768px;
`;
const MBTIGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

const SelectMBTI = ({ options, max, handleSelectedItem }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [value, setValue] = useState("");
  const maxSelection = max; // 최대 선택 할 수 있는 개수
  const handleSelect = (item) => {
    console.log("선택된 mbti : ", item);
    setSelectedItem(item);
    handleSelectedItem(item); // 선택된 아이템을 부모 컴포넌트로 전달
  };

  return (
    <CenterBox>
      <MBTIGird>
        {options.map((mbti) => (
          <SelectButton
            key={mbti}
            onClick={() => handleSelect(mbti)}
            selected={selectedItem.includes(mbti)}
            value={mbti}
          >
            {mbti}
          </SelectButton>
        ))}
      </MBTIGird>
    </CenterBox>
  );
};

export default SelectMBTI;
