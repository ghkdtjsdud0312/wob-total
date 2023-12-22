package com.kh.wob.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ForgotPasswordDto {
    private String email;
    private String password;
}
