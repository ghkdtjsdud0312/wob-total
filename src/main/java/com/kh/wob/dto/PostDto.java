package com.kh.wob.dto;

import lombok.*;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String userEmail;
    private String categoryName;
    private String categoryImage;
    private String local;
    private String place;
    private int people;
    private int joiners;
    private Long fee;
    private String introduction;
    private String date;
    private String time;
    private LocalDateTime regDate;
    private String roomId; // 채팅방 roomId
    private String image;
    private String type;
    private String active;

    private double latitude; // 지도 경도
    private double longitude; // 지도 위도
}

