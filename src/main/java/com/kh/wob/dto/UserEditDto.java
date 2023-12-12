package com.kh.wob.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEditDto {
    private String email;
    private String password;
    private String nickname;
    private String image;
}
