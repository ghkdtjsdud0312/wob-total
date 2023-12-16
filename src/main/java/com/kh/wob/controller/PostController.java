package com.kh.wob.controller;

import com.kh.wob.dto.PostDto;
import com.kh.wob.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    //게시글 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> postResister(@RequestBody PostDto postDto) {
        log.debug("PostDto : {}", postDto);
        System.out.println("PostDto : {}" + postDto);
        boolean isTrue = postService.savePost(postDto);
        return ResponseEntity.ok(true);
    }
}

