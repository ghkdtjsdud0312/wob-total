import { Outlet } from "react-router-dom";
import Home from "../images/Home.png";
import Calendar from "../images/Calendar.png";
import Chat from "../images/Chat.png";
import GPS from "../images/GPS.png";
import MyPage from "../images/MyPage.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Common from "../utils/Common";

const Container = styled.div`
  display: flex;
  width: 768px;
  background-color: white;
`;
const FooterIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.div`
  margin: 0 30px;
`;

const Icon = styled.img`
  height: 60px;
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    // access token이 존재하지 않으면 /login으로 이동, 존재하면 path로 이동
    const accessToken = Common.getAccessToken();
    if (!accessToken) {
      navigate("/login");
    } else {
      console.log("Footer : ", accessToken);
      navigate(path);
    }
  };
  return (
    <Container>
      <FooterIcon>
        <StyledLink onClick={() => handleLinkClick("/")}>
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
