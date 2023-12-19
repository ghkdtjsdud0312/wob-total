package com.kh.wob.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMyPageDto {
    private Long Id;
    private String email;
    private String nickname;
    private String image;
    private String mbti;
    private List<String> interestSports;
}
