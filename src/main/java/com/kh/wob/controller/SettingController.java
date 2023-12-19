package com.kh.wob.controller;

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
@RequestMapping("/setting")
@RequiredArgsConstructor
public class SettingController {
    private final UserService userService;
    // 제 3자 로그인 정보 조회
//    @GetMapping("socialType")
//    public ResponseEntity<List<UserMyPageDto>> socialType(@RequestBody String email) {
//        String socialType = userService.socialType(email);
//        return ResponseEntity.ok(socialType);
//    }


}
