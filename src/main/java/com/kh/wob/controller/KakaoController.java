package com.kh.wob.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kh.wob.dto.KakaoProfileDto;
import com.kh.wob.dto.TokenDto;
import com.kh.wob.repository.UserRepository;
import com.kh.wob.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoService kakaoService;

    // 카카오 회원가입 및 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenDto> kakaoLogin(@RequestBody Map<String, Object> kakaoData) throws JSONException, JsonProcessingException {
        // @RequestBody : Http 요청 본문을 Map<String, Object> 형태로 파싱하여 kakaoData 라는 변수에 저장하고 있으며, 해당 어노테이션은 Http 요청 본문을 자바 객체로 변환할 때 사용한다.

        // kakaoData에서 "access_token" 이라는 key를 사용하여 카카오 토큰을 추출해서 변수에 저장
        // "access_token" 이라는 이름의 key는 OAuth2.0 인증 방식에서 사용하는 표준 키이다.
        // OAuth 2.0 : 사용자 인증을 위한 일종의 표준 프로토콜로, 카카오, 구글 등 많은 서비스에서 이를 사용하고 있다.
        String kakaoToken = (String) kakaoData.get("access_token");
        log.info("kakaoToken : {}", kakaoToken);

        // 만약 kakaoToken이 null, 혹은 비어있다면,
        if (kakaoToken == null || kakaoToken.isEmpty()) {
            log.error("KakaoController Login 에서 Login = NULL");
            return null;
        }

        // kakaoToken을 통해 카카오 서버에서 사용자 정보 조회
        String kakaoUserInfo = kakaoService.requestKakaoUserInfo(kakaoToken);

        // JSON 파싱
        // 카카오 사용자 정보를 JSON 객체로 파싱하여 변수에 저장, 이를 통해 JSON 형식의 데이터를 쉽게 다룰 수 있게 된다.
        JSONObject jsonObject = new JSONObject(kakaoUserInfo);


        // 바로 위의 코드에서 생성한 변수에서 "id" 와 "nickname" 정보를 추출하여 각각 새로운 변수에 저장
        long userId = jsonObject.getLong("id");
        String nickname = jsonObject.getJSONObject("kakao_account").getJSONObject("profile").getString("nickname");

        // 회원 정보 조회 및 처리
        KakaoProfileDto kakaoProfileDto = new KakaoProfileDto();
        kakaoProfileDto.setSocialId(String.valueOf(userId));
        kakaoProfileDto.setNickName(nickname);
        if (!kakaoService.kakaoSignUpCheck(kakaoProfileDto)) {
            // 회원 가입 후 로그인 처리
            log.info("카카오 신규 회원 가입");
            kakaoService.kakaoSignUp(kakaoProfileDto);
        }

        // 카카오 닉네임이 이미 가입되어 있는 경우(또는 방금 가입한 경우), 로그인 처리
        log.info("카카오 로그인!");
        TokenDto token = kakaoService.kakaoLogin(kakaoProfileDto);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/email")
    public String getEmail(@RequestBody Map<String, Long> requestBody) {
        Long socialId = requestBody.get("socialId");
//        log.info("Front socialId {}", socialId);
        String email = kakaoService.getEmail(String.valueOf(socialId));
        return email;
    }



}