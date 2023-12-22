package com.kh.wob.controller;

import com.kh.wob.dto.ForgotPasswordDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.dto.UserSignUpDto;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        log.info("프론트에서 넘겨받은 userSignUpDto 데이터 : " + userSignUpDto);
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    @GetMapping("/check-nickname")
    public Boolean checkNickName(@RequestParam String nickName) throws Exception {
        log.info("프론트에서 넘겨받은 NickName 중복확인 데이터 : " + nickName);
        return userService.isNickName(nickName);
    }

    @PostMapping("/forgot-pw")
    public ResponseEntity<Boolean> modifyForgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) throws Exception {
        log.info("프론트에서 넘겨받은 forgotPasswordDto 데이터 : " + forgotPasswordDto);
        return ResponseEntity.ok(userService.modifyPasswordInForgotPw(forgotPasswordDto));
    }



}