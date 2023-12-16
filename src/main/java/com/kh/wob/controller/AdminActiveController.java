package com.kh.wob.controller;

import com.kh.wob.entity.Category;
import com.kh.wob.entity.User;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/active")
@RequiredArgsConstructor
public class AdminActiveController {

    private UserRepository userRepository;
    private CategoryRepository categoryRepository;
//    private ChatRepository chatRepository;
//    private AdRepository adRepository;

    // POST : user is_Active(회원)
    @PostMapping("/user/state")
    public ResponseEntity<Boolean> updateUserIsActive(@RequestBody Map<String, String> userData) {
        String isActive = userData.get("isActive");
        Long id = Long.parseLong(userData.get("email"));
        System.out.println("ISACTIVE : " + isActive);
        System.out.println("ID : " + id);

        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setIsActive(isActive);
            userRepository.save(user);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    // POST : ad is_Active(광고)
//    @PostMapping("/ad/state")
//    public ResponseEntity<Boolean> updateAdIsActive(@RequestBody Map<String, String> adData) {
//        String isActive = adData.get("isActive");
//        Long id = Long.parseLong(adData.get("id"));
//        System.out.println("ISACTIVE : " + isActive);
//        System.out.println("ID : " + id);
//
//        Ad ad = adRepository.findById(id).orElse(null);
//        if (ad != null) {
//            ad.setIsActive(isActive);
//            adRepository.save(ad);
//            return new ResponseEntity<>(true, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//        }
//    }

    // POST : chat is_Active(채팅)
//    @PostMapping("/chat/state")
//    public ResponseEntity<Boolean> updateChatIsActive(@RequestBody Map<String, String> chatData) {
//        String isActive = chatData.get("isActive");
//        Long id = Long.parseLong(chatData.get("id"));
//        System.out.println("ISACTIVE : " + isActive);
//        System.out.println("ID : " + id);
//
//        Chat chat = chatRepository.findById(id).orElse(null);
//        if (chat != null) {
//            chat.setIsActive(isActive);
//            chatRepository.save(chat);
//            return new ResponseEntity<>(true, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//        }
//    }

    // POST : category is_Active(게시판)
    @PostMapping("/category/state")
    public ResponseEntity<Boolean> updateCategoryIsActive(@RequestBody Map<String, String> categoryData) {
        String isActive = categoryData.get("isActive");
        Long id = Long.parseLong(categoryData.get("id"));
        System.out.println("ISACTIVE : " + isActive);
        System.out.println("ID : " + id);

        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setIsActive(isActive);
            categoryRepository.save(category);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
