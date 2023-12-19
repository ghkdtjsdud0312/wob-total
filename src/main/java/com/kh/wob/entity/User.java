package com.kh.wob.entity;

import com.kh.wob.constant.Role;
import com.kh.wob.constant.SocialType;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email; // 이메일
    private String password; // 비밀번호
    private String nickname; // 닉네임
    private String image; // 프로필사진
    private String mbti; // MBTI 설정
    private Boolean isActive ;

    @ElementCollection
    @CollectionTable(name = "user_interest_sports", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest_sports")
    private List<String> interestSports; // 관심 운동

    @ElementCollection
    @CollectionTable(name = "user_interest_area", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest_area")
    private List<String> interestArea; // 관심 지역

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, NAVER, GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    private String refreshToken; // 리프레시 토큰

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
    //관심 운동정보 가져오기 메서드
    public List<String> getInterestSports() {
        return this.interestSports;
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
