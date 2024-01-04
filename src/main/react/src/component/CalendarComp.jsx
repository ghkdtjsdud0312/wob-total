import React, { useState, useEffect } from "react";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* padding: 5px; */
`;

const SliderContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DayItem = styled.div`
  flex: 1;
  max-width: 80px;
  height: 75px;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #353535;

  &:hover {
    border: 2px solid #04bf8a;
  }

  &.active {
    background-color: #04bf8a;
    color: #fff;
    border-color: #04bf8a;
  }
`;

const DayName = styled.span`
  font-size: 1.2em;
  color: #333;
`;

const DayNumber = styled.span`
  padding-top: 5px;
  font-size: 1.7em;
  font-weight: bold;
`;
const CalendarComp = ({ onDateSelect, selectedDate }) => {
  const sliderRef = React.useRef();
  const [current, setCurrent] = useState(moment());
  const [year, setYear] = useState(current.year());

  useEffect(() => {
    setCurrent(moment(selectedDate));
  }, [selectedDate]);

  //주 정보 계산
  const weeks = React.useMemo(() => {
    const start = moment().year(year).startOf("year");
    console.log("start : moment:", moment());

    return Array.from({ length: 53 }).map((_, weekIndex) => {
      const weekStart = moment(start).add(weekIndex, "weeks");
      const weekEnd = moment(weekStart).endOf("week");

      // 연도가 바뀌는 주를 찾아서 처리
      if (weekEnd.year() !== weekStart.year()) {
        weekEnd.year(weekStart.year());
        console.log("연도 바뀌는 주 찾기 : ", weekEnd.year(weekStart.year()));
      }
      const dates = Array.from({ length: 7 }).map((_, dayIndex) => {
        const date = moment(weekStart).add(dayIndex, "days");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
      return {
        weekStart: weekStart.toDate(),
        weekEnd: weekEnd.toDate(),
        dates: dates,
      };
    });
  }, [year]);

  React.useEffect(() => {
    setYear(current.year());

    const weekIndex = weeks.findIndex((week) => {
      const weekStart = moment(week.weekStart);
      const weekEnd = moment(week.weekEnd);
      return (
        current.isSameOrAfter(weekStart, "day") &&
        current.isSameOrBefore(weekEnd, "day")
      );
    });
    if (weekIndex !== -1) {
      sliderRef.current.slickGoTo(weekIndex);
    }
  }, [current, weeks]);

  //선택된 날짜가 변경될 때마다 onDateSelect콜백함수 호출
  const handleDateClick = (date) => {
    const weekIndex = weeks.findIndex((week) => {
      const weekStart = moment(week.weekStart);
      const weekEnd = moment(week.weekEnd);
      return (
        date.isSameOrAfter(weekStart, "day") &&
        date.isSameOrBefore(weekEnd, "day")
      );
    });

    if (weekIndex !== -1) {
      sliderRef.current.slickGoTo(weekIndex);
    }
    onDateSelect(date);
    setCurrent(moment(date));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
  };

  return (
    <Container>
      <Slider ref={sliderRef} {...settings}>
        {weeks.map((week, index) => (
          <SliderContainer key={index}>
            <WeekContainer>
              {week.dates.map((item, dateIndex) => {
                const date = moment(item.date);
                const isActive = current.isSame(date, "day");
                return (
                  <DayItem
                    key={dateIndex}
                    onClick={() => handleDateClick(date)}
                    className={`item ${isActive ? "active" : ""}`}
                  >
                    <DayName>{item.weekday}</DayName>
                    <DayNumber>{date.date()}</DayNumber>
                  </DayItem>
                );
              })}
            </WeekContainer>
            {/* <Subtitle>{current.toDate().toDateString()}</Subtitle> */}
          </SliderContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default CalendarComp;
