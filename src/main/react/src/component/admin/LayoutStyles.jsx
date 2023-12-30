// 관리자 햄버거 버튼 사이드바 css
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  margin: auto;
  position: absolute;
  top: 30px;
  left: 30px;

  // 햄버거 버튼
  .mainhead {
    height: 60px;
    width: 20%;
    display: flex;
    justify-content: end;
    align-items: center;
    @media screen and (min-width: 375px) {
      height: 60px;
      width: 7%;
      display: flex;
      align-items: center;
    }

    // 관리자 관리 내역
    .welcome {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      color: #353535;

      .hambeger {
        position: relative;
      }
    }
  }
  .mainbody {
    height: calc(100vh - 54px - 50px);
  }
`;

// 햄버거 토글 안 목록
export const List = styled.ul`
  margin: 50px;
  position: relative;
  .m-title {
    font-size: 23px;
    font-weight: bold;
    line-height: 65px;
    cursor: pointer;
    position: relative;
  }
  .sub-menu {
    line-height: 60px;
    cursor: pointer;
    position: relative;
  }
  .logoBox {
    display: flex;
    justify-content: end;
  }
`;
// 햄버거 사이드메뉴 움직이는 css
export const StyledSideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  width: 340px;
  height: 80vh;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  background-color: #dceae6;
`;

export const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Dummy = styled.div`
  height: 54px;
`;

export default Container;
