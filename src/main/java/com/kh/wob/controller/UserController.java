package com.kh.wob.controller;

import com.kh.wob.dto.ForgotPasswordDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.dto.UserSignUpDto;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/healthcheck")
    public String healthcheck() {
        return "OK";
    }

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

    // 레슨 등록시 입력된 강사명, 전화번호 등록하기
    @PostMapping("/teacherinfo")
    public ResponseEntity<Boolean> teacherInfoResiter(@RequestBody UserSignUpDto userSignUpDto) {
        log.debug("userSingupDto는!!!!! {}", userSignUpDto);
        boolean isTrue = userService.saveTeacherInfo(userSignUpDto);
        return ResponseEntity.ok(isTrue);
    }

    // 강사명 전화번호 가져오기
    @GetMapping("/getTeacherInfo/{email}")
    public ResponseEntity<List<UserSignUpDto>> getTeacherInfo(@PathVariable String email) {
        System.out.println("getTeacherInfo email : " + email);
        List<UserSignUpDto> userSignUpDto = userService.getTeacherInfo(email);
        return ResponseEntity.ok(userSignUpDto);
    }




}