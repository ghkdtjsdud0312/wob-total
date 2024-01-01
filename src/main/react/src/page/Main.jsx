import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import AdCarousel from "../component/MainAd";
import CalendarComp from "../component/CalendarComp";
import moment from "moment";
import Button from "../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Weather from "../hook/useWeather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PostList from "./PostListClon";
// import PostList from "./PostList";
import PostAxiosApi from "../api/PostAxiosApi";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import Modal from "../utils/Modal";
import SelectMain from "../component/interest/SelectMainInterest";
import {
  sportsList,
  areaList,
  minNumber,
  maxNumber,
  selectText,
  selectAreaTitle,
  selectSportsTitle,
} from "../component/login/select";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-top: 15px;
  /* border: 1px gray solid; */
  padding: 0 30px;
`;

const CategoryBox = styled.div`
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around; /* 일정 간격으로 벌어지게 함 */
`;

const MediumContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

const CategoryBox2 = styled.div`
  height: 50px;
  margin-top: 15px;
  padding-left: 5px;
  display: flex;
  justify-content: space-around; /* 일정 간격으로 벌어지게 함 */
  width: 75%; // 미디엄 컨테이너 안에 3/4 차지
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 15%; // 미디엄 컨테이너 안에 1/4 차지
  font-size: 17px;
  align-items: center;
  padding-top: 15px;
`;

const CalenderBox = styled.div`
  /* border: 1px gray solid; */
  height: 100px;
`;

const BottomContainer = styled.div`
  width: 100%;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const Subtitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

const PostBox = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const PlusButton = styled(FaPlusCircle)`
  bottom: 20px;
  right: 20px;
  color: var(--GREEN);
  font-size: 40px;
  cursor: pointer;
  margin: 10px;
`;

const ListButton = styled(FontAwesomeIcon).attrs({ icon: faListUl })`
  bottom: 20px;
  right: 20px;
  color: var(--GREEN);
  font-size: 40px;
  cursor: pointer;
  padding-left: 5px;
`;

const Main = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const { addr, temp, sky, pty } = Weather();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showCalendar, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [area, setArea] = useState([]);
  const [interest, setInterest] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const allLeisure = "모든 레져";
  const allArea = "모든 지역";
  const [modalHeader, setModalHeader] = useState("");
  const [modalOptions, setModalOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [selectApi, setSelectApi] = useState("");

  const [calendarDate, setCalendarDate] = useState(selectedDate);
  const handleDatePickerChange = (date) => {
    const updatedDate = moment(date); // 새로운 선택된 날짜를 moment 객체로 변환
    setSelectedDate(updatedDate); // selectedDate 업데이트
    setCalendarDate(updatedDate); // calendarDate 업데이트
  };

  // 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달에서 확인 버튼이 클릭될 때 실행할 함수
  const handleConfirm = () => {
    // 확인 버튼을 눌렀을 때 수행할 로직 작성
    console.log("Confirmed!");
    closeModal(); // 예제에서는 확인 후 모달을 닫는 예시
  };

  // const onDateSelect = (date) => {
  //   setSelectedDate(date);
  //   console.log("selectedDate", selectedDate);
  // };
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

  useEffect(() => {
    const userInfo = async () => {
      const rsp = await MyPageAxiosApi.userGetOne(localStorage.email);
      console.log("메인 이메일 받기 : ", localStorage.email);
      console.log("useEffect Sports : ", rsp.data.interestSports);
      console.log("useEffect areas : ", rsp.data.interestArea);
      if (rsp.status === 200) {
        // setInterest(rsp.data.interestSports);
        setArea(rsp.data.interestArea);
        setInterest(rsp.data.interestSports);
      }
    };
    userInfo();
    // 로컬 스토리지에서 로그인한 사용자 정보를 가져옵니다.
    const loginUserEmail = localStorage.getItem("email");
    // 로그인한 사용자와 글쓴이가 같은지 비교
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email, modalOpen]);

  // 아이콘 클릭했을 때의 동작 (달력 나타남)
  const handleIconClick = () => {
    setShowCalender(true);
  };

  // 달력에 있는 날짜 선택
  const handleDateSelect = (date) => {
    // setSelectDate(date);
    // fetchPostByDate(moment(date)); // 날짜에 해당하는 게시글 가져오기
    setSelectedDate(moment(date));
    setShowCalender(false);
  };

  // + 클릭시 일정 등록 페이지로 이동
  const handlePlusIconClick = () => {
    navigate("/postsubmit");
  };

  // = 클릭시 게시글 리스트 페이지로 이동
  const handleListIconClick = () => {
    navigate("/postlist");
  };

  const handleCategoryButtonClick = (label) => {
    const isAllLeisure = label === allLeisure;

    const dynamicHeader = isAllLeisure ? allLeisure : allArea;
    const modalOptions = isAllLeisure ? sportsList : areaList;
    const modalTitle = isAllLeisure ? selectSportsTitle : selectAreaTitle;

    // Set the appropriate API based on the condition
    const api = isAllLeisure ? "sports" : "areas";
    setSelectApi(api);

    // console.log("dynamicHeader", dynamicHeader);
    // console.log("modalOptions", modalOptions);
    // console.log("modalTitle", modalTitle);

    setModalHeader(dynamicHeader);
    setModalOptions(modalOptions);
    setModalTitle(modalTitle);
    openModal();
  };

  // const fetchPostByDate = async (selectDate) => {
  //   try {
  //     // 선택한 날짜에 해당하는 게시글 가져오는 api 호출 -> 백 코드 생성후 마저 생성 예정.
  //     const response = await fetch();
  //   } catch (error) {
  //     console.error("Error fetching posts: ", error);
  //   }
  // };

  return (
    <>
      <Container>
        <AdCarousel />
        <CategoryBox>
          {/* <Button label="모든 레져" size="category" />
          {interest.map((interestItem, index) => (
            <Button key={index} label={interestItem}>
              {interestItem}
            </Button>
          ))} */}
          <Button
            label={allLeisure}
            size="category"
            onClick={() => handleCategoryButtonClick(allLeisure)}
          />
          {interest &&
            interest.map((interestItem, index) => (
              <Button key={index} label={interestItem}>
                {interestItem}
              </Button>
            ))}
        </CategoryBox>
        <MediumContainer>
          <CategoryBox2>
            {/* <Button label="모든 지역" size="category" />
            <Button label="강남구" size="category" />
            <Button label="관악구" size="category" />
            <Button label="서초구" size="category" /> */}
            <Button
              label={allArea}
              size="category"
              onClick={() => handleCategoryButtonClick(allArea)}
            />
            {area &&
              area.map((areastItem, index) => (
                <Button key={index} label={areastItem}>
                  {areastItem}
                </Button>
              ))}
          </CategoryBox2>
          <WeatherBox>
            {addr} {temp} {sky === "알 수 없음" ? pty : sky}
          </WeatherBox>
        </MediumContainer>
        <DateBox style={{ position: "relative", zIndex: 1 }}>
          {selectedDate.format("YYYY년 MM월 DD일")}
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{
              color: "var(--GREEN)",
              position: "absolute",
              top: 10,
              right: 20,
            }}
            fontSize="33px"
            cursor="pointer"
            onClick={handleIconClick}
          />
          {showCalendar && (
            <div ref={calendarRef} style={{ position: "relative", zIndex: 1 }}>
              <DatePicker
                selected={selectedDate.toDate()}
                onChange={(date) => {
                  handleDatePickerChange(date);
                }}
                onSelect={handleDateSelect}
                inline
              />
            </div>
          )}
        </DateBox>
        <CalenderBox>
          <CalendarComp
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            calendarDate={calendarDate}
          />
        </CalenderBox>
        <BottomContainer>
          <Subtitle>신나게 운동하자 우리 ☺</Subtitle>
          <PlusButton onClick={handlePlusIconClick} />
          <ListButton onClick={handleListIconClick} />
        </BottomContainer>
        <PostBox>
          {/* <PostList selectedDate={(selectedDate, area, interest)} /> */}
          <PostList data={{ selectedDate, area, interest }} />
        </PostBox>
        <Modal
          open={modalOpen}
          confirm={handleConfirm}
          header={modalHeader}
          type={false}
          close={closeModal}
          children={
            <SelectMain
              api={selectApi}
              closeModal={closeModal}
              options={modalOptions}
              min={minNumber}
              max={maxNumber}
              title={modalTitle}
              text={selectText}
            />
          }
        />
      </Container>
    </>
  );
};

export default Main;
