// 관리자 햄버거 버튼 사이드바
import { Outlet } from "react-router-dom";
import {
  Container,
  StyledSideMenu,
  List,
  StyledMenuList,
  Dummy,
} from "../admin/LayoutStyles";
import { UserContext } from "../../context/UserStore";
import { useContext, useState, useRef, useEffect } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// 사이드바 메뉴를 구성 합니다.
const Layout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 지도 밖에 누르면 사이드바 꺼짐
  const [showCalendar, setShowCalender] = useState(false);

  // 메인에서 sub메뉴의 버튼 누르면 그 화면으로 이동
  const handleAreaNavigate = (path) => {
    navigate(path);
  };

  // 햄버거 토글 위치(열리고 닫히고)
  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메인 메뉴 누르면 이동하는 페이지
  const onClickMenu = (num) => {
    switch (num) {
      case 1:
        navigate("/AllMemberInfo");
        break;
      case 2:
        navigate("/AllPaymentContent");
        break;
      case 3:
        navigate("/AllBoardContent");
        break;
      case 4:
        navigate("/Advertising");
        break;
      default:
    }
  };

  const calendarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        // 캘린더 외부를 클릭하면 캘린더를 닫음
        setShowCalender(false);
      }
    };
    // document에 클릭 이벤트 추가
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 컴포넌트가 unmount 될 때 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <header className="mainhead">
        {/* 헴버거 버튼 */}
        <div className="hambeger">
          {isMenuOpen ? (
            <GiCancel size={32} color="#04BF8A" onClick={onClickLeft} />
          ) : (
            <GiHamburgerMenu size={32} color="#04BF8A" onClick={onClickLeft} />
          )}
        </div>
        {/* 햄버거 토글로 열고 닫힘 */}
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}>
          {/* 사이드바 위 내용*/}
          <div className="welcome">
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>
              관리자 관리 내역
            </span>
          </div>
          <StyledMenuList>
            {/* 사이드바 인에 내용 리스트 */}
            <List>
              <li>
                <div className="m-title" onClick={() => onClickMenu(1)}>
                  전체 회원 관리
                </div>
                <ul className="sub-menu">
                  <li
                    onClick={() =>
                      handleAreaNavigate("/AllMemberInfo", "allMemberList")
                    }>
                    전체 회원 목록보기
                  </li>
                </ul>
              </li>
              <li>
                <div className="m-title" onClick={() => onClickMenu(2)}>
                  전체 결제 내역 관리
                </div>
                <ul className="sub-menu">
                  <li onClick={() => handleAreaNavigate("/AllPaymentList")}>
                    전체 결제 내역 목록보기
                  </li>
                </ul>
              </li>
              <li>
                <div className="m-title" onClick={() => onClickMenu(3)}>
                  전체 종목 관리
                </div>
                <ul className="sub-menu">
                  <li onClick={() => handleAreaNavigate("/AllBoardContent")}>
                    전체 종목 목록보기
                  </li>
                  <li
                    onClick={() =>
                      handleAreaNavigate("/AdminBoardRegistration")
                    }>
                    전체 종목 등록하기
                  </li>
                </ul>
              </li>
              <li>
                <div className="m-title" onClick={() => onClickMenu(4)}>
                  광고 관리
                </div>
                <ul className="sub-menu">
                  <li onClick={() => handleAreaNavigate("/Advertising")}>
                    광고 목록보기
                  </li>
                </ul>
              </li>
              <div className="logoBox">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AB%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9-removebg-preview.png?alt=media&token=bebc4ce9-fa8d-4d5a-9880-faec9cfd382e"
                  alt="Logo"
                  width="100px"
                />
              </div>
            </List>
          </StyledMenuList>
        </StyledSideMenu>
      </header>

      <main onClick={() => setIsMenuOpen(false)}>
        <Dummy />
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;
