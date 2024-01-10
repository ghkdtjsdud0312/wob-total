import Home from "../images/Home.png";
import Calendar from "../images/Calendar.png";
import Chat from "../images/Chat.png";
import GPS from "../images/GPS.png";
import MyPage from "../images/MyPage.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../utils/Common";

const Container = styled.div`
  max-width: 768px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const FooterIcon = styled.div`
  padding-top: 3px;
  background-color: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: solid 1px #ccc;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.div`
  margin: 0 3.5em;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    margin: 0 0.9em;
    width: 100%;
  }
`;

const Icon = styled.img`
  width: 3.5em;
  gap: 5em;
  @media only screen and (max-width: 768px) {
    width: 3em;
    gap: 5em;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    // access token이 존재하지 않으면 /login으로 이동, 존재하면 path로 이동
    const accessToken = Common.getAccessToken();
    if (!accessToken) {
      navigate("/");
    } else {
      console.log("Footer : ", accessToken);
      navigate(path);
    }
  };
  return (
    <Container>
      <FooterIcon>
        <StyledLink onClick={() => handleLinkClick("/main")}>
          <Icon src={Home} alt="Home" />
        </StyledLink>
        <StyledLink onClick={() => handleLinkClick("/schedule")}>
          <Icon src={Calendar} alt="Calendar" />
        </StyledLink>
        <StyledLink onClick={() => handleLinkClick("/FreeChat")}>
          <Icon src={Chat} alt="Chat" />
        </StyledLink>
        <StyledLink onClick={() => handleLinkClick("/KakaoMap")}>
          <Icon src={GPS} alt="GPS" />
        </StyledLink>
        <StyledLink onClick={() => handleLinkClick("/MyPage")}>
          <Icon src={MyPage} alt="MyPage" />
        </StyledLink>
      </FooterIcon>
    </Container>
  );
};

export default Footer;
