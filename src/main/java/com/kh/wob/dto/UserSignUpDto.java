package com.kh.wob.dto;

import com.kh.wob.constant.SocialType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserSignUpDto {

    private String email;
    private String password;
    private String nickname;
    private SocialType socialType;
    private Boolean selectedAgreement;
    private String name;
    private String phoneNumber;
}