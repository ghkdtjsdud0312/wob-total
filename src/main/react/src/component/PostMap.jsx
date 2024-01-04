import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, Marker } from "react-kakao-maps";
import PostAxiosApi from "../api/PostAxiosApi";
import { useParams } from "react-router-dom";

const PostMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1d0ba2bba93f2c27d7d493f6ea9b1a74&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);

        // 디비에서 주소 목록을 가져와서 지도에 마커로 표시
        handleAppointLoad(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  /* ** handleAppointLoad 함수가 실행될 때 map이 초기화 되지 않아 null로 처리. 
  그걸 방지하고자 handleAppointLoad 함수의 실행을 지연. */
  useEffect(() => {
    if (map) {
      handleAppointLoad(map);
    }
  }, [map]);

  const handleAppointLoad = async () => {
    try {
      console.log("주소 postId: ", postId);
      // 디비에서 주소 목록을 가져오는 비동기 함수 호출
      const rsp = await PostAxiosApi.postAddressById(postId);
      console.log(rsp.data);
      console.log("주소주라구!! " + postId);
      if (rsp.status === 200) {
        const { place } = rsp.data; // 주소 정보에서 place 추출
        console.log("place: ", place);

        // 여기까지는 실행됨.

        // 주소를 지도에 표기
        if (place) {
          // 주소-좌표 변환 객체 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색
          geocoder.addressSearch(place, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              console.log("주소 변환: " + coords); // 주소 변환도 ok!!

              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              console.log("Marker:", marker);
              console.log("map, coords 나와랏! ", map, coords);

              // 인포윈도우로 장소에 대한 설명을 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${place}</div>`,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동
              if (map) {
                // map이 null이 아닌 경우에만 호출
                map.setCenter(coords);
                console.log(map); // 안에 객체 제대로 확인 ok!!
              }
            } else {
              console.error("주소를 찾을 수 없습니다:", place);
            }
          });
        } else {
          console.error("주소 정보가 없습니다.");
        }
      }
    } catch (error) {
      console.error("주소 목록을 가져오는 중에 오류가 발생했습니다:", error);
    }
  };

  return (
    <div>
      <div id="kakao-map" style={{ width: "100%", height: "270px" }}></div>
    </div>
  );
};

export default PostMap;
