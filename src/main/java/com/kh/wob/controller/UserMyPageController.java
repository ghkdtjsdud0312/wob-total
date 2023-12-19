package com.kh.wob.controller;

import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserMyPageController {
    private final UserService userService;
    //회원정보 수정 컨트롤러
    //회원 전체 조회
    @GetMapping("list")
    public ResponseEntity<List<UserMyPageDto>> userList() {
        List<UserMyPageDto> list = userService.getUserList();
        return ResponseEntity.ok(list);
    }
    //회원 상세조회(마이페이지)
    @GetMapping("/detail/{email}")
    public ResponseEntity<UserMyPageDto> userDetail(@PathVariable String email) {
        System.out.println("상세조회 이메일이 제대로 들어왔는지 확인 : " + email);
        UserMyPageDto userMyPageDto = userService.getUserDetail(email);
        System.out.println("userMyPageDto controller 회원상세조회 닉네임 들어오는지 확인 : " + userMyPageDto.getNickname());
        return ResponseEntity.ok(userMyPageDto);
    }
    //회원수정(마이페이지 & 환경설정)
    @PutMapping("/modify")
    public ResponseEntity<Boolean> userModify(@RequestBody UserMyPageDto userMyPageDto) {
        boolean isTrue = userService.modifyUser(userMyPageDto);
        System.out.println("userMyPage dto !!회원수정!! mbti 들어왔나 확인!! : " + userMyPageDto.getMbti());
        System.out.println("userMyPage dto email, 탈퇴사유 : " + userMyPageDto.getEmail()+userMyPageDto.getWithdrawal());
        return ResponseEntity.ok(isTrue);
    }
//    //관심 종목(마이페이지)
//    @GetMapping("/sports/{email}")
//    public ResponseEntity<List<String>> UserInterestSports(@PathVariable String email) {
//        List<String> interestSports = userService.interestSports(email);
//        System.out.println("관심종목 가져오기 이메일 : " + email);
//        return ResponseEntity.ok(interestSports);
//    }

}
