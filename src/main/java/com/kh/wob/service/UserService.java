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
    // 회원 상세조회
    public UserMyPageDto getUserDetail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("해당회원이 존재하지 않습니다.")
        );
        return convertEntityToDto(user);
    }
    //회원 수정
    public boolean modifyUser(UserMyPageDto userMyPageDto){
        try{
            User user = userRepository.findByEmail(userMyPageDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
            );
            user.setImage(userMyPageDto.getImage());
            user.setNickname(userMyPageDto.getNickname());
            user.setMbti(userMyPageDto.getMbti());
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
            userMyPageDto.setPassword(user.getPassword());
            userMyPageDto.setNickname(user.getNickname());
            userMyPageDto.setImage(user.getImage());
            userMyPageDto.setMbti(user.getMbti());
            return userMyPageDto;
    }
}