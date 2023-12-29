package com.kh.wob.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdDto {
    private Long id;
    private String categoryName; // 종목
    private Long postId;
    private Long fee; // 비용
    private String period;  // 광고 게시 기간
    private String image; // 이미지
    private String postingDate; // 게시일
    private LocalDateTime regDate; // 작성일자
    private String active; // 비활성화, 활성화
}
