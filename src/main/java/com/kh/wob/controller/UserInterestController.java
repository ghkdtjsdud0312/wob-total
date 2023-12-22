package com.kh.wob.controller;

import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.entity.User;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/interest")
@RequiredArgsConstructor
public class UserInterestController {
    private final UserService userService;
    @PostMapping("/sports")
    public ResponseEntity<Boolean> updateUserInterestSports(
            @RequestBody List<String> interestSports,
            @RequestParam String email) {
            userService.updateUserInterestSports(email, interestSports);
            log.info("Interest sports 업데이트 성공");
            log.info(interestSports.toString());

            return ResponseEntity.ok(true);
    }
    @PostMapping("/areas")
    public ResponseEntity<Boolean> updateUserInterestAreas(
            @RequestBody List<String> interestAreas,
            @RequestParam String email) {
        userService.updateUserInterestAreas(email, interestAreas);
        log.info("Interest areas 업데이트 성공");
        log.info(interestAreas.toString());
        return ResponseEntity.ok(true);
    }
}



