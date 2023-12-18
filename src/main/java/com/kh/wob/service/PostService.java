package com.kh.wob.service;

import com.kh.wob.dto.PostDto;
import com.kh.wob.entity.Post;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.PostRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class PostService {
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

//    private static ZonedDateTime convertToSeoulTime(LocalDateTime utcDateTime) {
//        try {
//            return ZonedDateTime.of(utcDateTime, ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul"));
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }

    // 게시글 등록
    public boolean savePost(PostDto postDto) {
        try {
            // 게시글과 관련된 필요한 객체들을 생성하고 초기화
            Post post = new Post();

            log.info("Date Type: {}", postDto.getDate().getClass());
            log.info("Time Type: {}", postDto.getTime().getClass());
            log.info("Date : {}", postDto.getDate());
            log.info("Time : {}", postDto.getTime());

//            LocalDateTime timeTime = postDto.getTime();
//            LocalDateTime dateDate = postDto.getDate();
//
//            LocalDateTime seoulDateTime1 = Objects.requireNonNull(convertToSeoulTime(timeTime)).toLocalDateTime();
//            LocalDateTime seoulDateTime2 = Objects.requireNonNull(convertToSeoulTime(dateDate)).toLocalDateTime();


            // 날짜와 시간을 원하는 형태로 변환
//            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            String formattedDate = seoulDateTime1.format(dateFormatter);
//            System.out.println("날짜 : " + formattedDate);
//            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
//            String formattedTime = seoulDateTime2.format(timeFormatter);
//            System.out.println("시간 : " + formattedTime);

            // LocalDateTime을 받아서 필요한 포맷으로 변환
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

            // PostDto로부터 받은 정보로 post 객체를 초기화.
            post.setTitle(postDto.getTitle());
//          post.setCategory(category);
            post.setPlace(postDto.getPlace());
            post.setPeople(postDto.getPeople());
            post.setJoiners(postDto.getJoiners());
            post.setExpectationCost(postDto.getExpectationCost());
            post.setIntroduction(postDto.getIntroduction());
//            post.setDate(formattedDate);
//            post.setTime(formattedTime);
            // LocalDateTime을 받아서 필요한 포맷으로 변환하여 저장
            post.setDate(postDto.getDate().format(dateFormatter));
            post.setTime(postDto.getTime().format(timeFormatter));

            // 포스트 객체를 저장.
            postRepository.save(post);

            // 클래스의 타입 확인 및 로깅
            log.info("Date Type: {}", post.getDate().getClass());
            log.info("Time Type: {}", post.getTime().getClass());

            // 성공적으로 등록되었음을 나타내는 true를 반환
            return true;
        } catch (Exception e) {
            // 예외가 발생한 경우 에러 스택 트레이스를 출력하고, 실패를 나타내는 false를 반환
            e.printStackTrace();
            return false;
        }
    }

}

