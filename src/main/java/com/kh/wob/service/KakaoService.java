package com.kh.wob.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.kh.wob.constant.Role;
import com.kh.wob.constant.SocialType;
import com.kh.wob.dto.KakaoProfileDto;
import com.kh.wob.dto.TokenDto;
import com.kh.wob.entity.User;
import com.kh.wob.jwt.service.JwtService;
import com.kh.wob.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class KakaoService {
    private final UserRepository userRepository;
    private JwtService jwtService;
    private final ObjectMapper objectMapper;

    @Autowired
    public KakaoService(UserRepository userRepository, ObjectMapper objectMapper, JwtService jwtService) {
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.jwtService = jwtService;
    }

    // Kakao
    // 카카오 회원 가입 여부 확인
    public boolean kakaoSignUpCheck(KakaoProfileDto kakaoProfileDto) {
        // 이전에 등록된 회원인지 유무 확인
        Optional<User> userOptional = userRepository.findBySocialTypeAndSocialId(SocialType.KAKAO, kakaoProfileDto.getSocialId());

        if (userOptional.isPresent()) {
            // 사용자가 존재하는 경우
            return true;
        }
        return false;

    }


    // 카카오 회원 가입
    public boolean kakaoSignUp(KakaoProfileDto kakaoProfileDto) {
        log.info("kakaoSignUp");
        try {
            // UserRepository(User)를 사용해서 DB에 저장
            User newUser = createUserFromKakaoProfile(kakaoProfileDto);
            userRepository.save(newUser);
            return true;
        } catch(Exception e) {
            log.warn("카카오 회원가입 에러 발생 : " + e);
            return false;
        }
    }

    private User createUserFromKakaoProfile(KakaoProfileDto kakaoProfileDto) {
        log.info("createUserFromKakaoProfile");
        return User.builder()
                .socialType(SocialType.KAKAO)
                .socialId(kakaoProfileDto.getSocialId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .nickname(kakaoProfileDto.getNickName())
                .role(Role.USER) // 원하는 권한 설정
                .build();
    }

    // 카카오 서버에서부터 사용자 정보 조회
    public String requestKakaoUserInfo(String kakaoToken) {
        // 사용자 정보를 조회하기 위한 지정 URL
        final String requestUrl = "https://kapi.kakao.com/v2/user/me";

        // HTTP 요청 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoToken);

        // RestTemplate : 외부 API를 호출하기 위해 스프링에서 제공하는 HTTP 클라이언트 유틸리티로,
        // HTTP 요청을 쉽게 보낼 수 있도록 도와주며, 응답 또한 받을 수 있다. (exchange)
        // HTTP 헤더 설정, 요청 파라미터 설정, 에러 핸들링 등의 다양한 기능을 제공한다.
        // 일반적으로 JPA를 이용해 데이터 베이스에 접근하는 API를 만들때는 사용되지 않는다.
        RestTemplate restTemplate = new RestTemplate();

        // 카카오 API에 GET 요청을 보낸다.
        ResponseEntity<String> responseEntity = restTemplate.exchange(requestUrl, HttpMethod.GET, new HttpEntity<>(headers), String.class);
        // String.class : 메서드의 마지막 변수로, responseType에 대한 인자로, API 응답의 본문을 String 타입으로 변환하려고 시도한다. 즉, API의 응답이 JSON 형태라면, 이를 String으로 변환하여 반환한다.

        log.warn("카카오 API 응답 : " + responseEntity.getBody());
        return responseEntity.getBody();
    }

    // 카카오 로그인. 카카오 닉네임으로 사용자 정보를 찾고 토큰 생성 및 반환
    public TokenDto kakaoLogin(KakaoProfileDto kakaoProfileDto) throws JsonProcessingException {
        String kakaoNickName = kakaoProfileDto.getNickName();
        User user = userRepository.findByNickname(kakaoNickName).orElseThrow(
                () -> new RuntimeException("카카오 별명으로 조회되는 회원 별명이 존재하지 않습니다.")
        );

        TokenDto tokenDto = new TokenDto();
        String accessToken = jwtService.createAccessToken(user.getEmail());
        String refreshToken = jwtService.createRefreshToken();
        tokenDto.setAccessToken(accessToken);
        tokenDto.setRefreshToken(refreshToken);
        tokenDto.setSocialId(kakaoProfileDto.getSocialId());
        log.info("accessToken : ", tokenDto.getAccessToken());
        log.info("refreshToken : ", tokenDto.getRefreshToken());

        userRepository.findByEmail(user.getEmail())
                .ifPresent(oAuthUser -> {
                    oAuthUser.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(oAuthUser);
                });
        jwtService.updateRefreshToken(user.getEmail(), refreshToken);

        return tokenDto;

    }

    public String getEmail(String socialId) {
//        log.info(socialId);
        User user = userRepository.findBysocialId(socialId).orElseThrow(
                () -> new RuntimeException("socialId로 조회되는 회원 정보가 없습니다.")
        );
        return user.getEmail();
    }
}