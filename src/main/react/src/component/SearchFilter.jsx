import React, { useState } from 'react';

const SearchComponent = () => {
  const data = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Grapes',
    'Lemon',
    'Orange',
    '아이스크림',
    '아이스 바닐라라떼',
    '아메리카노',
    '아이스 모카라떼',
    '밀크티'
  ];

  // 상태 훅을 사용하여 searchList라는 상태 변수와 그 상태를 갱신할 setSearchList이라는 함수를 생성.
  const [searchList, setSearchList] = useState('');
  // 검색어 입력값이 변경될 때 호출될 함수 정의. 
  const handleSearchChange = (event) => {
    setSearchList(event.target.value);
  };

  // 검색어에 일치하는 항목을 필터링. toLowerCase 사용하여 대소문자 무시하고, includes 사용하여 검색어가 항목에 포함되어 있는지 확인.
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchList.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchList}
        onChange={handleSearchChange}
      />

      {/* 필터링된 결과를 화면에 표시 */}
      <ul>
        {filteredData.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </>
  );
};

export default SearchComponent;
