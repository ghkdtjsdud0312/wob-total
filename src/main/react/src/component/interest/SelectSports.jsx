import { useState } from "react";
import styled from "styled-components";
import {
  TitleAlign,
  TextAlign,
  SelectButton,
  InputBar,
  NextButton,
  PrevNavigateBox,
} from "./InterestCommon";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import { useNavigate } from "react-router-dom";

const SportsGird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 30px;
  padding: 40px;
`;

const SelectSports = ({ options, min, max, title, text, onComplete }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = useState("");
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      if (
        value
          ? selectedItems.length < maxSelection - 1 // 기타: 값이 들어온 경우 버튼을 2개까지만
          : selectedItems.length < maxSelection // 버튼만 선택한 경우 3개까지만
      ) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const isNextButtonActive =
    selectedItems.length + (value ? 1 : 0) >= minSelection &&
    selectedItems.length + (value ? 1 : 0) <= maxSelection;

  const handleNext = (selectedItems) => {
    const itemsWithInput = value ? [...selectedItems, value] : selectedItems;

    if (LoginPageAxiosApi.interestSprots(itemsWithInput)) {
      console.log(itemsWithInput);
      console.log("interestSprots 등록 완료");
    }
    if (onComplete) {
      onComplete(); // 완료 콜백 호출
    }
  };

  const handlePass = () => {
    onComplete();
  };
  return (
    <>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <SportsGird>
        {options.map((activity) => (
          <SelectButton
            key={activity}
            onClick={() => handleSelect(activity)}
            selected={selectedItems.includes(activity)}
          >
            {activity}
          </SelectButton>
        ))}
        <InputBar
          placeholder="기타"
          onChange={(e) => setValue(e.target.value)}
          disabled={selectedItems.length >= maxSelection}
        />
        <NextButton
          active={isNextButtonActive ? true : undefined}
          onClick={isNextButtonActive ? () => handleNext(selectedItems) : null}
        >
          다음
        </NextButton>
        <PrevNavigateBox onClick={handlePass}>건너뛰기</PrevNavigateBox>
      </SportsGird>
    </>
  );
};

export default SelectSports;
