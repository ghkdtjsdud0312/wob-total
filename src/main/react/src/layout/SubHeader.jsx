import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSearch, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  color: --var(MINT);
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  padding-top: 6.5px;
`;

const ArrowBack = styled.div`
  cursor: pointer;
  font-size: 25px;
  margin: 10px;
  color: var(--GREEN);
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
`;
const SubHeader = () => {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    navigate("/searchMain");
  };

  return (
    <Container>
      <HeaderBox>
        <ArrowBack onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowBack>
        <SearchIcon icon={faSearch} onClick={goToSearchPage} />
      </HeaderBox>
    </Container>
  );
};

export default SubHeader;
