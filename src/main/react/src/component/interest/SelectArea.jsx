import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledNextButton = styled(NextButton)`
  width: 30em;
  position: fixed;
  bottom: 0;
  margin-bottom: 2vh;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const SelectOptionBoard = styled.div`
  width: 28em;
  height: 160px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: height 0.5s ease; // 트랜지션 추가
  height: ${({ isOpen }) =>
    isOpen ? "380px" : "80px"}; // isOpen에 따라 높이 변경
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const SelectOptionBoardHeader = styled.div`
  width: 28em;
  height: 40px;
  background-color: #dfede9;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;
const OptionBoardHeaderLogo = styled.img`
  width: 50px;
  height: auto;
  margin-left: 10px;
`;
const OptionBoardBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 2px solid #dfede9;
  transition: height 0.5s ease; // 트랜지션 추가
  height: ${({ isOpen }) =>
    isOpen ? "300px" : "10px"}; // isOpen에 따라 높이 변경
`;

const SelectOptionBoardFooter = styled.div`
  width: 28em;
  height: 40px;
  background-color: #04bf8a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px; /* 왼쪽 하단 모서리 둥글게 */
  border-bottom-right-radius: 20px; /* 오른쪽 하단 모서리 둥글게 */
  position: absolute;
  bottom: 0;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const AreasGird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 30px;
  padding: 40px;
`;

const SelectArea = ({ options, min, max, title, text }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const minSelection = min;
  const maxSelection = max;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      if (selectedItems.length < maxSelection) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };
  const handlePass = () => {
    navigate("/");
  };

  const isNextButtonActive =
    selectedItems.length >= minSelection &&
    selectedItems.length <= maxSelection;

  const handleNext = (selectedItems) => {
    const itemsWithInput = selectedItems;

    if (LoginPageAxiosApi.interestAreas(itemsWithInput)) {
      console.log(itemsWithInput);
      console.log("interestAreas 등록 완료");
      navigate("/");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(!isOpen);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <CenterBox>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <SelectOptionBoard isOpen={isOpen}>
        <SelectOptionBoardHeader>
          <OptionBoardHeaderLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo-green.png?alt=media&token=b89ea23a-e1f1-4863-a76f-54811d63edcb" />
        </SelectOptionBoardHeader>
        <OptionBoardBody isOpen={isOpen}>
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
        </OptionBoardBody>
        <SelectOptionBoardFooter onClick={handleToggle}>
          선택하기
        </SelectOptionBoardFooter>
      </SelectOptionBoard>
      <PrevNavigateBox onClick={handlePass}>건너뛰기</PrevNavigateBox>
      <StyledNextButton
        active={isNextButtonActive}
        onClick={isNextButtonActive ? () => handleNext(selectedItems) : null}
      >
        확인
      </StyledNextButton>
    </CenterBox>
  );
};

export default SelectArea;
