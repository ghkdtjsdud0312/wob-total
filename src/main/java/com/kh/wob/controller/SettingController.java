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

    // 회원 탈퇴 시 active를 inactive로 변경
    @PutMapping("/state")
    public ResponseEntity<Boolean> updateUserActive(@RequestBody UserMyPageDto userMyPageDto) {
        log.info("userDto: {}", userMyPageDto);
        boolean isTrue = userService.withdrawalInactive(userMyPageDto);
        return ResponseEntity.ok(isTrue);
    }


}
