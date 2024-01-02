package com.kh.wob.controller;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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

    // 회원 활성화 비활성화 상태 바꾸기(회원목록)
    @PutMapping("/state")
    public ResponseEntity<Boolean> updateUserActive(@RequestBody UserMyPageDto userMyPageDto) {
        log.info("userDto: {}", userMyPageDto);
        boolean isTrue = userService.updateUserActive(userMyPageDto);
        return ResponseEntity.ok(isTrue);
    }

    // 회원 목록 페이징(회원목록)
    @GetMapping("/list/page")
    public ResponseEntity<List<UserMyPageDto>> getUserList(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "5") int size) {
        List<UserMyPageDto> list = userService.getUserList(page, size);
        return ResponseEntity.ok(list);
    }

    // 회원 페이지 수 조회(회원목록)
    @GetMapping("/count")
    public ResponseEntity<Integer> listUser(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = userService.getUserList(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }

    // 회원 삭제
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Boolean> userDelete(@PathVariable String email) {
        log.info("email : ", email );
        boolean isTrue = userService.deleteUser(email);
        return ResponseEntity.ok(isTrue);
    }

}
