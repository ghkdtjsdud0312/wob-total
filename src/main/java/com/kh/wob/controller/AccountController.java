package com.kh.wob.controller;

import com.kh.wob.dto.MailConfirmDto;
import com.kh.wob.dto.MailVerifyDto;
import com.kh.wob.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AccountController {

    private final EmailService emailService;

//    @PostMapping("login/mailConfirm")
//    @ResponseBody
//    public boolean mailConfirm(@RequestParam String email) throws Exception {
//        String code = emailService.sendAndSaveVerificationCode(email);
//        log.info("인증코드 : " + code);
//        if(!code.isEmpty()) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    @PostMapping("login/mailVerify")
//    @ResponseBody
//    public boolean mailVerified(@RequestParam String email, @RequestParam String code) {
//        try {
//            boolean isVerified = emailService.verifyEmail(email, code);
//            if (isVerified) {
//                // 여기에 이메일 인증이 성공한 경우의 추가 로직을 구현합니다.
//                // 예를 들어, 사용자 계정 활성화, 회원가입 완료 등의 동작이 있을 수 있습니다.
//                log.info("이메일 인증 성공");
//            } else {
//                log.info("이메일 인증 실패");
//            }
//            return isVerified;
//        } catch (Exception e) {
//            log.error("이메일 인증 중 오류 발생", e);
//            return false;
//        }
//    }

    @PostMapping("login/mailConfirm")
    public ResponseEntity<String> mailConfirm(@RequestBody MailConfirmDto mailConfirmDto) throws Exception {

        String code = emailService.sendAndSaveVerificationCode(mailConfirmDto);
        log.info("인증코드 : " + code);
        if (!code.isEmpty()) {
            return ResponseEntity.ok("Verification code sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to send verification code");
        }
    }

    @PostMapping("login/mailVerify")
    public ResponseEntity<String> mailVerified(@RequestBody MailVerifyDto mailVerifyDto) {
        try {
            boolean isVerified = emailService.verifyEmail(mailVerifyDto);
            if (isVerified) {
                log.info("이메일 인증 성공");
                return ResponseEntity.ok("Email verification successful");
            } else {
                log.info("이메일 인증 실패");
                return ResponseEntity.badRequest().body("Invalid email verification code");
            }
        } catch (Exception e) {
            log.error("이메일 인증 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

}