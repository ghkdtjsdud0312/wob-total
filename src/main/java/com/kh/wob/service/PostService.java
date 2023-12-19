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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


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

    // 게시글 등록
    public boolean savePost(PostDto postDto) {
        try {
            // 게시글과 관련된 필요한 객체들을 생성하고 초기화
            Post post = new Post();

            log.info("Date Type: {}", postDto.getDate().getClass());
            log.info("Time Type: {}", postDto.getTime().getClass());
            log.info("Date : {}", postDto.getDate());
            log.info("Time : {}", postDto.getTime());

            // PostDto로부터 받은 정보로 post 객체를 초기화.
            post.setTitle(postDto.getTitle());
//          post.setCategory(category);
            post.setPlace(postDto.getPlace());
            post.setPeople(postDto.getPeople());
            post.setJoiners(postDto.getJoiners());
            post.setExpectationCost(postDto.getExpectationCost());
            post.setIntroduction(postDto.getIntroduction());
            post.setDate(postDto.getDate());
            post.setTime(postDto.getTime());


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

    // 게시글 전체 조회
    public List<PostDto> getPostList() {
        List<Post> posts = postRepository.findAll();
        List<PostDto> postDtos = new ArrayList<>();
        for(Post post : posts) {
            postDtos.add(convertEntityToDto(post));
        }
        return postDtos;
    }

  // 게시글 엔티티를 dto로 변환
    private PostDto convertEntityToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setPlace(post.getPlace());
        postDto.setPeople(post.getPeople());
        postDto.setExpectationCost(post.getExpectationCost());
        postDto.setIntroduction(post.getIntroduction());
        postDto.setDate(post.getDate());
        postDto.setTime(post.getTime());
        postDto.setRegDate(post.getRegDate());
        return postDto;
    }

}
