package com.kh.wob.controller;

import com.kh.wob.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api")
public class RefreshTokenController {

//    @Autowired
//    private JwtService jwtService;

    @GetMapping("/refresh")
    public ResponseEntity<String> refreshAccessToken(@RequestHeader("Authorization-refresh") String refreshToken) {
        return ResponseEntity.ok("refresh token 전달 완료");
    }
}



