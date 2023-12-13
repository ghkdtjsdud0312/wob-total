package com.kh.wob.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMyPageDto {
    private String email;
    private String password;
    private String nickname;
    private String image;
    private String mbti;
}
