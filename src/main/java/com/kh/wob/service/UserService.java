package com.kh.wob.service;

import com.kh.wob.constant.Role;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.dto.UserSignUpDto;
import com.kh.wob.entity.User;
import com.kh.wob.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@Getter @Setter @ToString
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    //    UserMyPage
    // 회원가입 여부 확인
    public boolean isUser(String email) {return userRepository.existsByEmail(email); }
    //회원 전체 조회
    public List<UserMyPageDto> getUserList() {
        List<User> users = userRepository.findAll();
        List<UserMyPageDto> userMyPageDtos = new ArrayList<>();
        for(User user : users) {
            userMyPageDtos.add(convertEntityToDto(user));
        }
        return userMyPageDtos;
    }
    // 회원 상세조회
    public UserMyPageDto getUserDetail(String email) {
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//        System.out.println("email in UserService : " + email);
//        User user = optionalUser.orElseThrow(() -> new NoSuchElementException("해당 이메일 사용자가 없습니다."));
//
//        UserMyPageDto userMyPageDto = new UserMyPageDto();
//        userMyPageDto.setEmail(user.getEmail());
//        userMyPageDto.setNickname(user.getNickname());
//        userMyPageDto.setImage(user.getImage());
//        userMyPageDto.setMbti(user.getMbti());
//
//        System.out.println("getNickname in userService : " + user.getNickname());
//            return userMyPageDto;

        System.out.println("userService 회원상세조회 이메일 : " + email);
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("해당회원이 존재하지 않습니다.")
        );
        System.out.println("회원 상세조회 user정보 가져오기 : 닉네임은 " + user.getNickname());
        return convertEntityToDto(user);
    }

    //회원 수정
    public boolean modifyUser(UserMyPageDto userMyPageDto){
        try{
            User user = userRepository.findByEmail(userMyPageDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("회원수정 : 해당 회원이 존재하지 않습니다.")
            );
//            user.setEmail(userMyPageDto.getEmail());
            System.out.println("회원 수정 유저서비스 : " + userMyPageDto.getEmail());
            user.setNickname(userMyPageDto.getNickname());
//            user.setMbti(userMyPageDto.getMbti());
            user.setImage(userMyPageDto.getImage());
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    //엔티티 -> Dto 전환
        private UserMyPageDto convertEntityToDto(User user){
            UserMyPageDto userMyPageDto = new UserMyPageDto();
            userMyPageDto.setEmail(user.getEmail());
            userMyPageDto.setNickname(user.getNickname());
            userMyPageDto.setImage(user.getImage());
            userMyPageDto.setMbti(user.getMbti());
            return userMyPageDto;
    }

    public void updateUserInterestSports(String email, List<String> interestSports) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당회원이 존재하지 않습니다."));

        user.setInterestSports(interestSports);
        userRepository.save(user);
    }
}