import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchAxiosApi from "../api/SearchApi";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Logo = styled.img`
  width: 100px;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background-color: #dfede9;
    border-radius: 25%;
  }
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const SearchContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 250px;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #04bf8a;
  outline: none;
  margin-right: 10px;
  @media only screen and (max-width: 768px) {
    width: 35%;
  }
`;

const SearchButton = styled.button`
  background-color: #04bf8a;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 10px 10px #dfede9;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 30px;
`;

const ContentContainer = styled.div`
  text-align: inherit;
  margin: 0px 100px;
  @media only screen and (max-width: 768px) {
    margin: 0px 40px;
  }
`;

const RecentResultBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
`;

const RecentResult = styled.div`
  margin-top: 30px;
  opacity: 0.5;
`;

const RecentResultContents = styled.span`
  margin: 10px 10px;
  background-color: #dfede9;
  padding: 10px;
  border-radius: 40px;
  @media only screen and (max-width: 768px) {
    width: 70%;
  }
`;

const SearchResult = styled.h3`
  color: #04bf8a;
  margin: 10px 0;
`;

const SearchResultContents = styled.div`
  margin: 10px 10px;
  background-color: #dfede9;
  padding: 30px;
  border-radius: 0px 40px 40px 40px;
  background-color: ${(props) =>
    props.type === "lesson" ? "#04bf8a" : "#dfede9"};

  & > div > h3 {
    margin-bottom: 10px;
  }
  box-shadow: 0px 6px 6px #ddd;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 0 #ddd;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SearchCriteriaSelect = styled.select`
  padding: 8px;
  width: 80px;
  font-size: 16px;
  margin-right: 10px;
`;

const TitleOption = styled.option``;
const ContentOption = styled.option``;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #04bf8a;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    box-shadow: 0px 10px 10px #dfede9;
  }
`;

const PaginationInfo = styled.div`
  padding: 8px 16px;
  font-size: 16px;
`;

const ITEMS_PER_PAGE = 5;

const SearchMain = () => {
  // localStorage.clear();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("title");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // 페이지가 변경될 때마다 검색 다시 요청
    handleSearch();
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  useEffect(() => {
    if (state && state.searchQuery) {
      setSearchQuery(state.searchQuery);
      handleSearch();
    }
  }, [state]);

  const handleRecentSearchClick = (clickedSearch) => {
    // 클릭한 최근 검색어로 검색어 설정
    setSearchQuery(clickedSearch.query);
    // 검색 실행
    handleSearch();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      // Spring Boot에서 pageable을 사용하도록 수정
      const response =
        searchCriteria === "title"
          ? await SearchAxiosApi.searchTitle(
              searchQuery,
              currentPage - 1,
              ITEMS_PER_PAGE
            )
          : await SearchAxiosApi.searchIntroduction(
              searchQuery,
              currentPage - 1,
              ITEMS_PER_PAGE
            );

      setSearchResults(response.data);
      console.log(response.data.content);

      const maxRecentSearches = 5;
      const storedRecentSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

      const updatedSearches = [
        { query: searchQuery, results: response.data },
        ...storedRecentSearches,
      ];

      const uniqueSearches = Array.from(
        new Set(updatedSearches.map((search) => search.query))
      ).map((query) => {
        // 중복된 검색어가 있을 경우 최신 결과로 갱신
        const duplicateSearches = updatedSearches.filter(
          (search) => search.query === query
        );
        return duplicateSearches.reduce((acc, curr) =>
          acc.results.length > curr.results.length ? acc : curr
        );
      });

      const trimmedSearches = uniqueSearches.slice(0, maxRecentSearches);

      localStorage.setItem("recentSearches", JSON.stringify(trimmedSearches));
      setRecentSearches(trimmedSearches);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const paginatedResults = searchResults.content || []; // 받아온 데이터에서 현재 페이지의 결과 목록

  return (
    <Container>
      <Logo
        src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo-green.png?alt=media&token=b89ea23a-e1f1-4863-a76f-54811d63edcb"
        alt="main logo"
        onClick={() => navigate("/")}
      />
      <AlignBox>
        <SearchContainer>
          <SearchCriteriaSelect
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <TitleOption value="title">제목</TitleOption>
            <ContentOption value="content">내용</ContentOption>
          </SearchCriteriaSelect>
          <SearchIcon icon={faSearch} />
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>
      </AlignBox>
      <ContentContainer>
        <RecentResult>최근 검색어</RecentResult>
        <RecentResultBox>
          {recentSearches.map((recentSearch, index) => (
            <div
              key={index}
              onClick={() => handleRecentSearchClick(recentSearch)}
            >
              <RecentResultContents>{recentSearch.query}</RecentResultContents>
            </div>
          ))}
        </RecentResultBox>
        <SearchResult>검색 결과</SearchResult>
        {searchResults.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          paginatedResults.map((result) => (
            <StyledLink to={`/postDetail/${result.id}`} key={result.id}>
              <SearchResultContents type={result.type} key={result.id}>
                <div>
                  <FlexBox>
                    <h3>{result.title}</h3>
                    <h3>{result.type}</h3>
                  </FlexBox>
                  <FlexBox>
                    <p>{result.regDate}</p>
                  </FlexBox>
                  <FlexBox>
                    <p>{result.local}</p>
                    <p>{result.people}</p>
                    <p>{result.categoryName}</p>
                  </FlexBox>
                  <p>{result.introduction}</p>
                </div>
              </SearchResultContents>
            </StyledLink>
          ))
        )}
        {searchResults.totalPages > 1 && (
          <PaginationContainer>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              이전
            </PaginationButton>
            <PaginationInfo>
              {currentPage} / {searchResults.totalPages}
            </PaginationInfo>
            <PaginationButton
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, searchResults.totalPages)
                )
              }
              disabled={currentPage === searchResults.totalPages}
            >
              다음
            </PaginationButton>
          </PaginationContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default SearchMain;
