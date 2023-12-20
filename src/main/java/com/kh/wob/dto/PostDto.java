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
    private String categoryName;
    private String local;
    private String place;
    private int people;
    private int joiners;
    private Long expectationCost;
    private String introduction;
    private String date;
    private String time;
    private LocalDateTime regDate;
    private String roomId; // 채팅방 roomId
    private String active;
}

