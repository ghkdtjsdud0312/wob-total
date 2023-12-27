import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 768px;
  margin: 0px auto;
`;

const Dropdown = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
`;

const DropdowunButton = styled.button`
  background-color: var(--MINT);
  color: #555555;
  padding: 15px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownCheckbox = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const PostTopBar = ({ onAreaSelect }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState([]);
  const dropdownRef = useRef(null);

  const areaList = [
    "강남구",
    "강북구",
    "강동구",
    "강서구",
    "양천구",
    "구로구",
    "영등포구",
    "금천구",
    "동작구",
    "관악구",
    "서초구",
    "송파구",
    "마포구",
    "서대문구",
    "은평구",
    "종로구",
    "중구",
    "성동구",
    "용산구",
    "광진구",
    "중랑구",
    "동대문구",
    "성북구",
    "도봉구",
    "노원구",
  ];

  useEffect(() => {
    // 전체 문서 클릭 시 드롭다운 창 닫기
    const handleDocumentClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("click", handleDocumentClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); // 빈 배열을 넣어 최초 렌더링 시에만 등록 및 제거

  // 드롭다운 보이게 전환하는 함수
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  // 체크박스 상태 변경 시 호출되는 함수
  const handleFilterChange = async (selected) => {
    // 선택된 지역이 이미 목록에 있는지 확인
    const alreadyselected = selectedArea.includes(selected);

    // 최대 3개까지만 선택
    if (selectedArea.length < 3) {
      // 이미 선택된 필터인 경우 제거, 그렇지 않은 경우 추가
      if (alreadyselected) {
        const updatedArea = selectedArea.filter((item) => item !== selected);
        setSelectedArea(updatedArea);
      } else {
        // 선택되지 않은 경우 추가
        const updatedArea = [...selectedArea, selected];
        setSelectedArea(updatedArea);
      }
    } else {
      // 3개를 초과하는 경우 첫번째 선택을 해제하고 새로운 선택 추가
      const updateArea = [...selectedArea.slice(1), selected];
      setSelectedArea(updateArea);
    }
    onAreaSelect(selectedArea); // 부모 컴포넌트로 선택된 지역 전달
    setDropdownVisible(false); // 드롭다운 창 닫기
  };

  return (
    <>
      <Container>
        <Dropdown ref={dropdownRef}>
          <DropdowunButton onClick={toggleDropdown}>
            {selectedArea.length === 0
              ? "지역 선택"
              : `선택 지역: ${selectedArea.join(", ")}`}
          </DropdowunButton>
          <DropdownContent visible={dropdownVisible}>
            {areaList.map((area) => (
              <DropdownCheckbox
                key={area}
                onClick={() => handleFilterChange(area)}
              >
                <input
                  type="checkbox"
                  checked={selectedArea.includes(area)}
                  onChange={() => {}}
                />
                {area}
              </DropdownCheckbox>
            ))}
          </DropdownContent>
        </Dropdown>
      </Container>
    </>
  );
};

export default PostTopBar;
