package com.kh.wob.controller;

import com.kh.wob.dto.MailConfirmDto;
import com.kh.wob.dto.MailVerifyDto;
import com.kh.wob.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController

public class AccountController {

    private final EmailService emailService;

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