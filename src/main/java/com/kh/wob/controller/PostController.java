package com.kh.wob.controller;

import com.kh.wob.dto.PostDto;
import com.kh.wob.dto.ScheduleDto;
import com.kh.wob.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    // 게시글 등록
    @PostMapping("/new")
    public ResponseEntity<PostDto> postResister(@RequestBody PostDto postDto) {
        log.debug("PostDto : {}", postDto);
        System.out.println("PostDto.userName : " + postDto.getUserEmail());
        System.out.println("PostDto.categoryName : " + postDto.getCategoryName());
        PostDto postDto1 = postService.savePost(postDto);
        return ResponseEntity.ok(postDto1);
    }

    // 게시글 조회
    @GetMapping("/list")
    public ResponseEntity<List<PostDto>> postList() {
        List<PostDto> list = postService.getPostList();
        return ResponseEntity.ok(list);
    }

    // postId로 게시글 상세 조회
    @GetMapping("/postListById/{postId}")
    public ResponseEntity<PostDto> getPostListById(@PathVariable Long postId) {
        System.out.println("postId로 게시글 상세 조회 : " + postId);
        return ResponseEntity.ok(postService.getPostListById(postId));
    }

    // postId로 운동 장소 가져 오기
    @GetMapping("/postPlaceAddress/{postId}")
    public ResponseEntity<PostDto> getPostPlaceAddress(@PathVariable Long postId) {
        try {
            String placeAddress = postService.getPostPlaceAddress(postId);

            // 가져온 주소를 PostDto에 담아서 반환
            PostDto postDto = new PostDto();
            postDto.setPlace(placeAddress);

            return ResponseEntity.ok(postDto);
        } catch (RuntimeException e) {
            // 해당 postId에 해당하는 주소가 존재하지 않는 경우 예외 처리
            return ResponseEntity.notFound().build();
        }
    }
    // userEmail에 해당하는 일정 가져오기 API
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<PostDto>> getJoinPost(@PathVariable  String userEmail) {
        log.info("포스트 유저 리스트 가져가기 : {}", userEmail);
        List<PostDto> list = postService.getPostByUserEmail(userEmail);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostDto>> getSearch(@RequestParam String keyword) {
        log.info("keyword : " + keyword);
        List<PostDto> list = postService.getSearch(keyword);
        return ResponseEntity.ok(list);
    }

    // postIdList에 해당하는 포스트 리스트 가져오기 (수정)
    @GetMapping("/matching/{postIdList}")
    public ResponseEntity<List<PostDto>> getMatchingPosts(@PathVariable List<Long> postIdList) {
        try {
            List<PostDto> matchingPosts = postService.getMatchingPosts(postIdList);
            return ResponseEntity.ok(matchingPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}

