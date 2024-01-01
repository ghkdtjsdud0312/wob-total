package com.kh.wob.service;

import com.kh.wob.dto.PostDto;
import com.kh.wob.dto.ScheduleDto;
import com.kh.wob.entity.Category;
import com.kh.wob.entity.Post;
import com.kh.wob.entity.Schedule;
import com.kh.wob.entity.User;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.PostRepository;
import com.kh.wob.repository.ScheduleRepository;
import com.kh.wob.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


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
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;

    // 게시글 등록
    public PostDto savePost(PostDto postDto) {
            // 게시글과 관련된 필요한 객체들을 생성하고 초기화
            Post post = new Post();
            // 카테고리 ID로부터 카테고리 찾기
            Category category = categoryRepository.findByName(postDto.getCategoryName()).orElseThrow(
                    () -> new RuntimeException("category not found")
            );
            User user = userRepository.findByEmail(postDto.getUserEmail()).orElseThrow(
                    () -> new RuntimeException("user not found")
            );

            log.info("Date Type: {}", postDto.getDate().getClass());
            log.info("Time Type: {}", postDto.getTime().getClass());
            log.info("Date : {}", postDto.getDate());
            log.info("Time : {}", postDto.getTime());

            // PostDto로부터 받은 정보로 post 객체를 초기화.
            post.setTitle(postDto.getTitle());
            post.setUser(user);
            post.setCategory(category);
            post.setLocal(postDto.getLocal());
            post.setPlace(postDto.getPlace());
            post.setPeople(postDto.getPeople());
            post.setJoiners(postDto.getJoiners());
            post.setFee(postDto.getFee());
            post.setIntroduction(postDto.getIntroduction());
            post.setDate(postDto.getDate());
            post.setTime(postDto.getTime());
            post.setImage(postDto.getImage());
            post.setType(postDto.getType());
            post.setActive(postDto.getActive());
            post.setLatitude(postDto.getLatitude());
            post.setLongitude(postDto.getLongitude());

            // 포스트 객체를 저장.
            postRepository.save(post);

            // 클래스의 타입 확인 및 로깅
            log.info("Date Type: {}", post.getDate().getClass());
            log.info("Time Type: {}", post.getTime().getClass());

            // 성공적으로 등록되었음을 나타내는 true를 반환
             return convertEntityToDto(post);

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

    // postId로 게시글 상세 조회
    public PostDto getPostListById(Long postId) {
        System.out.println("chatService에서 받은 postId : " + postId);
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
        );
        return convertEntityToDto(post);
    }

    // postId로 운동 장소 가져오기
    public String getPostPlaceAddress(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("해당 주소가 존재하지 않습니다.")
        );
        PostDto postDto = convertEntityToDto(post);
        return postDto.getPlace();
    }

    public List<PostDto> getSearch(String keyword) {
        List<Post> posts = postRepository.findByCategoryNameContaining(keyword);
        List<PostDto> postDtos = new ArrayList<>();
        for(Post post : posts) {
            postDtos.add(convertEntityToDto(post));
        }
        return postDtos;
    }

    //userEmail로 게시글 리스트 가져오기
    public List<PostDto> getPostByUserEmail(String userEmail) {
        log.info("서비스에서는? : {}", userEmail);
        List<Post> posts = postRepository.findByUserEmail(userEmail);
        List<PostDto> postDtos = new ArrayList<>();
        for(Post post : posts) {
            postDtos.add(convertEntityToDto(post));
        }
        return postDtos;
    }

    // postIdList에 해당하는 포스트 리스트 가져오기 추가
    public List<PostDto> getMatchingPosts(List<Long> postIdList) {
        List<Post> matchingPosts = postRepository.findByIdIn(postIdList);
        return matchingPosts.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }



        // 게시글 엔티티를 dto로 변환
    private PostDto convertEntityToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setUserEmail(post.getUser().getEmail());
        postDto.setCategoryName(post.getCategory().getName());
        postDto.setCategoryImage(post.getCategory().getImage());
        postDto.setLocal(post.getLocal());
        postDto.setPlace(post.getPlace());
        postDto.setPeople(post.getPeople());
        postDto.setFee(post.getFee());
        postDto.setIntroduction(post.getIntroduction());
        postDto.setDate(post.getDate());
        postDto.setTime(post.getTime());
        postDto.setRegDate(post.getRegDate());
        postDto.setImage(post.getImage());
        postDto.setType(post.getType());
        postDto.setActive(post.getActive());
        postDto.setLongitude(post.getLongitude());
        postDto.setLatitude(post.getLatitude());
        return postDto;
    }

}

