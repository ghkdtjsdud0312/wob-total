import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";


const StyledCarousel = styled(Carousel)`
    height: 300px;
    margin: 0 auto;
    overflow : hidden;
`;

const MapBox = styled.div`
  cursor: pointer;  
`;

const ImageContainer = styled.div`
    margin: 0 16px;
    max-width: 100%;
`;

const Image = styled.img`
  width: auto;
  height: 300px;
  border: none;
`;

// 광고 슬라이드 이미지 리스트 
const imageMap = {
    1: "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%91%E1%85%B5%E1%86%AF%E1%84%85%E1%85%A1%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3.png?alt=media&token=1aa6eaf6-65ee-4032-9a10-37dbc4840d32",
    2: "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%90%E1%85%A6%E1%84%82%E1%85%B5%E1%84%89%E1%85%B3.png?alt=media&token=0f0e9276-51cb-422c-9db4-b849c970a2f6",
    3: "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%90%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AE.png?alt=media&token=1a4afa62-7208-4631-93d8-302519f368d5",
    4: "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A1%E1%84%90%E1%85%B5.png?alt=media&token=10bc9646-60d8-4e95-8e86-ff2b2658b91c",
    5: "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%87%E1%85%A2%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%E1%86%AB%E1%84%90%E1%85%A5%E1%86%AB.png?alt=media&token=384feedd-d651-49dd-b836-29c7287862c9"
};

const items = Object.keys(imageMap).map(id => ({   // 아이템 배열에 id와 url 을 가지는 객체들이 들어감. imagemap 객체의 키들을 배열로 반환. map 함수를 사용하여 각 키에 대해 id와 url을 가진 객체 생성. 
    id: parseInt(id),
    url: imageMap[id]
}));


const AdCarousel = () => {
    const settings = {
        showThumbs: false, // 썸네일 비활성화
        showStatus: false,
        showArrows: true, // 화살표 표시 여부
        infiniteLoop: true, // 무한 루프
        autoPlay: true, // 자동 재생
        interval: 3000, // 슬라이드 전환 간격(ms)
        transitionTime: 1000, // 슬라이드 전환 시간(ms)
    };

    return(
        <StyledCarousel {...settings}>  
                {items.map(item => {
                    return (
                        <MapBox key={item.id}>
                            <ImageContainer>
                                <Image src={item.url} />
                            </ImageContainer>
                        </MapBox>
                    );
                })}
        </StyledCarousel>
    );
};

export default AdCarousel;