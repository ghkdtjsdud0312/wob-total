package com.kh.wob.repository;

import com.kh.wob.constant.SocialType;
import com.kh.wob.entity.Category;
import com.kh.wob.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email); //이메일이 db에 존재하는지 확인하는 메서드

    // 관리자 활성화,비활성화-회원목록
    List<Category> findByActive(String active);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByImage(String image);

    Optional<User> findByRefreshToken(String refreshToken);

    // 관리자 활성화,비활성화-회원목록
    Page<User> findAll(Pageable pageable); // 모든 목록


    /**
     * 소셜 타입과 소셜의 식별값으로 회원 찾는 메소드
     * 정보 제공을 동의한 순간 DB에 저장해야하지만, 아직 추가 정보(사는 도시, 나이 등)를 입력받지 않았으므로
     * 유저 객체는 DB에 있지만, 추가 정보가 빠진 상태이다.
     * 따라서 추가 정보를 입력받아 회원 가입을 진행할 때 소셜 타입, 식별자로 해당 회원을 찾기 위한 메소드
     */
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    Optional<User> findBysocialId(String socialId);



}