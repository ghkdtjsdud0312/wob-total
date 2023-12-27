/* global kakao */
// KakaoMap.js

import React, { useEffect } from 'react';
import { Map, Marker } from 'react-kakao-maps';

const KakaoMap = () => {
  useEffect(() => {
    // Kakao 지도 API 스크립트 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1d0ba2bba93f2c27d7d493f6ea9b1a74&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao 맵 초기화
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API script loaded');
        const container = document.getElementById('kakao-map');  // 지도를 담을 영역의 DOM 레퍼런스 
        const options = { // 지도를 생성할 때 필요한 기본 옵션 
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (위도, 경도)
          level: 5, // 초기 확대 수준
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

        // 마커가 표시될 위치 
        const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
        // 마커 생성 
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커가 지도 위에 표시되도록 설정 
        marker.setMap(map);

        // 인포윈도우에 표시될 내용으로 HTML 문자열을 사용 
        const iwContent = '<div style="padding:5px; font-size: 14px;">Hello!😀<br><a href="https://map.kakao.com/link/map/시청역,37.5665, 126.9780" style="color:black; text-decoration: none" target="_blank">지도보기</a> <a href="https://map.kakao.com/link/to/37.5665, 126.9780" style="color:black; text-decoration: none" target="_blank">길찾기</a></div>';
        const iwPosition = new kakao.maps.LatLng(37.5665, 126.9780);  // 인포윈도우 표시될 위치를 설정
        // 설정한 위치와 내용으로 인포윈도우 객체를 생성 
        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content:iwContent
        });
        infowindow.open(map, marker);

        // 지도 확대 축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 지도 타입 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      });
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return <div id="kakao-map" style={{ width: '100%', height: '500px' }}></div>;
};

export default KakaoMap;
