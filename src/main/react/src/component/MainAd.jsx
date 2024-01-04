import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import AdminAxiosApi from "../api/AdminAxiosApi";
import { useNavigate } from "react-router-dom";

const StyledCarousel = styled(Carousel)`
  height: 300px;
  margin: 0 auto;
`;

const MapBox = styled.div`
  cursor: pointer;
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border: none;
`;

const ButtonBox = styled.button`
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  width: 100%;
`;

const AdCarousel = () => {
  const navigate = useNavigate();
  const [imgList, setImgList] = useState([]);
  const [adPostId, setAdPostId] = useState("");

  // 첫 렌더링 시, active인 광고만 리스트에 저장하는 useEffect
  useEffect(() => {
    const imageList = async () => {
      // 1. 광고 목록 전체 조회
      const rsp = await AdminAxiosApi.adList();
      // 2. 만약 광고 목록을 가지고 왔다면,
      if (rsp.data) {
        console.log("광고 목록 전체 조회 : ", rsp.data);
        // 3. Ad 테이블의 active가 "acitve"인 데이터만 필터링
        const filteredItems = rsp.data.filter(
          (item) => item.active === "active"
        );
        console.log("filter : ", filteredItems);
        // 4. imaList에 필터링 된 데이터 저장
        setImgList(filteredItems);
      }
    };
    imageList();
  }, []);

  // 광고 클릭 시, 조인되어 있는 게시글로 이동
  const onClickBtn = (postId) => {
    console.log("postId : ", postId);
    if (postId) {
      navigate(`/postDetail/${postId}`);
    }
  };

  const settings = {
    showThumbs: false, // 썸네일 비활성화
    showStatus: false,
    showArrows: true, // 화살표 표시 여부
    infiniteLoop: true, // 무한 루프
    autoPlay: true, // 자동 재생
    interval: 3000, // 슬라이드 전환 간격(ms)
    transitionTime: 1000, // 슬라이드 전환 시간(ms)
  };

  return (
    <StyledCarousel {...settings}>
      {imgList.map((item) => {
        return (
          <ButtonBox onClick={() => onClickBtn(item.postId)}>
            <MapBox key={item.id}>
              <ImageContainer>
                <Image src={item.image} />
              </ImageContainer>
            </MapBox>
          </ButtonBox>
        );
      })}
    </StyledCarousel>
  );
};

export default AdCarousel;
