package com.kh.wob.controller;

import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.dto.UserSignUpDto;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

    //회원정보 수정 컨트롤러
    //회원 상세조회(마이페이지)
    @GetMapping("/detail/{email}")
    public ResponseEntity<UserMyPageDto> userDetail(@PathVariable String email) {
        UserMyPageDto userMyPageDto = userService.getUserDetail(email);
        return ResponseEntity.ok(userMyPageDto);
    }
    //회원수정(마이페이지)
    @PutMapping("modify")
    public ResponseEntity<Boolean> userModify(@RequestBody UserMyPageDto userMyPageDto) {
        log.info("userMyPageDto : {}", userMyPageDto.getEmail());
        boolean isTrue = userService.modifyUser(userMyPageDto);
        return ResponseEntity.ok(isTrue);
    }
}