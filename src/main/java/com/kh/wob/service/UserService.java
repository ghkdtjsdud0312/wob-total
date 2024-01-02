package com.kh.wob.service;

import com.kh.wob.constant.Role;
import com.kh.wob.dto.CategoryDto;
import com.kh.wob.dto.ForgotPasswordDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.dto.UserSignUpDto;
import com.kh.wob.entity.Category;
import com.kh.wob.entity.User;
import com.kh.wob.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
                .active("active")
                .selectedAgreement(userSignUpDto.getSelectedAgreement())
                .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    //    UserMyPage
    // 회원가입 여부 확인
    public boolean isUser(String email) {
        return userRepository.existsByEmail(email);
    }

    //회원 전체 조회
    public List<UserMyPageDto> getUserList() {
        List<User> users = userRepository.findAll();
        List<UserMyPageDto> userMyPageDtos = new ArrayList<>();
        for (User user : users) {
            userMyPageDtos.add(convertEntityToDto(user));
        }
        return userMyPageDtos;
    }

    // 회원 상세조회
    public UserMyPageDto getUserDetail(String email) {

        System.out.println("userService 회원상세조회 이메일 : " + email);
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("해당회원이 존재하지 않습니다.")
        );
        System.out.println("회원 상세조회 user정보 가져오기 : 닉네임은 " + user.getNickname());
        return convertEntityToDto(user);
    }

    // 회원 이름, 전화번호 조회
    public List<UserSignUpDto> getTeacherInfo(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("해당회원이 존재하지 않습니다.")
        );
        List<UserSignUpDto> userSignUpDtoList = new ArrayList<>();

        // UserSignUpDto 인스턴스를 생성하여 필요한 정보를 설정한 후 리스트에 추가
        UserSignUpDto userSignUpDto = new UserSignUpDto();
        userSignUpDto.setName(user.getName());
        userSignUpDto.setPhoneNumber(user.getPhoneNumber());
        userSignUpDtoList.add(userSignUpDto);
        return userSignUpDtoList;
    }

    //    회원 수정 1안. (원본)
    public boolean modifyUser(UserMyPageDto userMyPageDto) {
        try {
            User user = userRepository.findByEmail(userMyPageDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("회원수정 : 해당 회원이 존재하지 않습니다.")
            );
            if (userMyPageDto.getPassword() != null) { // 비밀번호가 널이 아닐 때, -> 입력됐을 때
                System.out.println("변경할 비밀번호 : " + userMyPageDto.getPassword());
                user.setPassword(userMyPageDto.getPassword());
                user.passwordEncode(passwordEncoder);
            } else if (userMyPageDto.getWithdrawal() != null) { // 회원 탈퇴 입력 됐을 때,
                System.out.println("회원 탈퇴 사유 : " + userMyPageDto.getWithdrawal());
                user.setWithdrawal(userMyPageDto.getWithdrawal());
                user.setActive("quit");
            } else { // 비밀번호, 회원 탈퇴 입력 안 됐을 때
                System.out.println("회원 수정 유저서비스 : " + user.getEmail());
                System.out.println("회원 수정 유저서비스 getMbti : " + user.getMbti());
                user.setNickname(userMyPageDto.getNickname().isEmpty() ? user.getNickname() : userMyPageDto.getNickname());
                user.setIntroduce(userMyPageDto.getIntroduce().isEmpty() ? user.getIntroduce() : userMyPageDto.getIntroduce());
                user.setImage(userMyPageDto.getImage().isEmpty() ? user.getImage() : userMyPageDto.getImage());
                user.setMbti(userMyPageDto.getMbti().isEmpty() ? user.getMbti() : userMyPageDto.getMbti());
                user.setInterestSports(userMyPageDto.getInterestSports().isEmpty() ? user.getInterestSports() : userMyPageDto.getInterestSports());
                user.setInterestArea(userMyPageDto.getInterestArea().isEmpty() ? user.getInterestArea() : userMyPageDto.getInterestArea());
            }
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 닉네임 조회
    public boolean isNickName(String nickName) {
        return userRepository.findByNickname(nickName).isPresent();
    }

    //엔티티 -> Dto 전환
    private UserMyPageDto convertEntityToDto(User user) {
        UserMyPageDto userMyPageDto = new UserMyPageDto();
        userMyPageDto.setId(user.getId()); // 회원 목록에 사용
        userMyPageDto.setEmail(user.getEmail());
        userMyPageDto.setNickname(user.getNickname());
        userMyPageDto.setImage(user.getImage());
        userMyPageDto.setMbti(user.getMbti());
        userMyPageDto.setIntroduce(user.getIntroduce());
        userMyPageDto.setInterestSports(user.getInterestSports());
        userMyPageDto.setInterestArea(user.getInterestArea());
        userMyPageDto.setActive(user.getActive()); // 회원 목록에 사용
        userMyPageDto.setSocial(user.getSocialType());
        return userMyPageDto;
    }

    public void updateUserInterestSports(String email, List<String> interestSports) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당회원이 존재하지 않습니다."));

        user.setInterestSports(interestSports);
        userRepository.save(user);
    }

    public void updateUserInterestAreas(String email, List<String> interestAreas) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당회원이 존재하지 않습니다."));

        user.setInterestArea(interestAreas);
        userRepository.save(user);
    }

    // 활성화 비활성화
    public boolean setActive(String active, Long id) {
        try {
            User user = userRepository.findById(id).orElseThrow(null);
            if (user != null) {
//                    user.setActive(active);
                userRepository.save(user);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 회원 페이징(관리자-회원목록)
    public List<UserMyPageDto> getUserList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<User> users = userRepository.findAll(pageable).getContent();
        List<UserMyPageDto> userMyPageDtos = new ArrayList<>();
        for (User user : users) {
            userMyPageDtos.add(convertEntityToDto(user));
        }
        return userMyPageDtos;
    }

    // 페이지 수 조회(관리자-회원목록)
    public int getUserList(Pageable pageable) {
        return userRepository.findAll(pageable).getTotalPages();
    }

    // 회원 목록 활성화할지 비활성화 선택(관리자-회원 목록)

    public boolean updateUserActive(UserMyPageDto userMyPageDto) {
        try {
            Optional<User> optionalUser = userRepository.findById(userMyPageDto.getId());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setActive(userMyPageDto.getActive());
                userRepository.save(user);
                return true;
            } else {
                log.error("해당 유저를 찾을 수 없음 id: {}", userMyPageDto.getId());
                return false;
            }
        } catch (Exception e) {
            log.error("유저 활성화/비활성화 업데이트 중 오류 발생", e);
            return false;
        }
    }

    public boolean modifyPasswordInForgotPw(ForgotPasswordDto forgotPasswordDto) {
        try {
            User user = userRepository.findByEmail(forgotPasswordDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("회원수정 : 해당 회원이 존재하지 않습니다.")
            );
            log.info("이메일 인증으로 변경할 비밀번호 : " + forgotPasswordDto.getPassword());
            user.setPassword(forgotPasswordDto.getPassword());
            user.passwordEncode(passwordEncoder);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 레슨 일정 등록시 강사명, 전화번호 등록하기
    public boolean saveTeacherInfo(UserSignUpDto userSignUpDto) {
        try{
            User user = userRepository.findByEmail(userSignUpDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("회원이 존재하지 않습니다.")
            );
            log.info("등록 회원 이메일 : " + userSignUpDto.getEmail());
            user.setName(userSignUpDto.getName());
            user.setPhoneNumber(userSignUpDto.getPhoneNumber());

            userRepository.save(user);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 회원 삭제
    public boolean deleteUser(String email) {
        try {
            User user = userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("존재하지 않는 이메일입니다"));
            userRepository.delete(user);
            log.info("해당 회원이 삭제되었습니다. : ", email);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 회원 탈퇴 시 비활성화로 변경

    public boolean withdrawalInactive(UserMyPageDto userMyPageDto) {
        try {
            User user = userRepository.findByEmail(userMyPageDto.getEmail()).orElseThrow(
                    () -> new RuntimeException("해당 유저를 찾을 수 없습니다.")
            );
            user.setActive("inactive");
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            log.error("유저 활성화/비활성화 업데이트 중 오류 발생", e);
            return false;
        }
    }

}

