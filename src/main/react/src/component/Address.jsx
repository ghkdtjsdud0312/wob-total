import React, { useState } from "react";
import DaumPostApi from "../api/DaumPostApi";
import styled from "styled-components";

const InputArea = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
  margin-bottom: 20px;
`;

const Address = ({ setPlace }) => {
  const [inputAddr, setInputAddr] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // 주소 팝업

  const openPostCode = () => {
    setIsPopUpOpen(true);
  };
  const closePostCode = () => {
    setIsPopUpOpen(false);
  };

  const setAddr = (addr) => {
    setInputAddr(addr); // 입력한 주소가 입력란에 표기
    setPlace(addr); // 주소를 setPlace 함수를 통해 부모 컴포넌트로 전달
    setIsPopUpOpen(false); // 주소를 선택하면 팝업을 닫음
  };

  return (
    <InputArea className="inputArea">
      <label name="addr">
        <StyledInput
          type="text"
          placeholder="주소 입력"
          defaultValue={inputAddr}
          readOnly={true}
          onClick={openPostCode}
        />
      </label>
      {isPopUpOpen && <DaumPostApi onClose={closePostCode} setAddr={setAddr} />}
    </InputArea>
  );
};

export default Address;
