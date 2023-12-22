package com.kh.wob.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.wob.dto.ChatRoomResDto;
import com.kh.wob.dto.PostDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.entity.Chat;
import com.kh.wob.entity.ChatRoom;
import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import com.kh.wob.repository.ChatRepository;
import com.kh.wob.repository.ChatRoomRepository;
import com.kh.wob.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper; // JSON 문자열로 변환하기 위한 객체
    private Map<String, ChatRoomResDto> chatRooms; // 채팅방 정보를 담을 맵
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;
    private final PostRepository postRepository;

    @PostConstruct // 의존성 주입 이후 초기화를 수행하는 메소드
    private void init() { // 채팅방 정보를 담을 맵을 초기화
        chatRooms = new LinkedHashMap<>(); // 채팅방 정보를 담을 맵
    }
    public List<ChatRoomResDto> findAllRoom() { // 채팅방 리스트 반환
        return new ArrayList<>(chatRooms.values());
    }
    public ChatRoomResDto findRoomById(String roomId) {
        System.out.println("findRoomById : "+ chatRooms.get(roomId));
        return chatRooms.get(roomId);
    }

    // 방 개설하기
    public ChatRoomResDto createRoom(String name, Long postId) {
        String randomId = UUID.randomUUID().toString();
        log.info("UUID : " + randomId);
        ChatRoomResDto chatRoom = ChatRoomResDto.builder() // 채팅방 DTO 생성
                .roomId(randomId)
                .name(name)
                .postId(postId)
                .regDate(LocalDateTime.now())
                .build();

        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("해당 포스트가 없습니다.")
        );
        ChatRoom chatRoomEntity = new ChatRoom(); // ChatRoom 엔티티 객체 생성 (채팅방 정보 DB에 저장하기 위해)
        chatRoomEntity.setRoomId(randomId);
        chatRoomEntity.setRoomName(name);
        chatRoomEntity.setPost(post);
        chatRoomEntity.setCreatedAt(LocalDateTime.now());
        chatRoomRepository.save(chatRoomEntity); // 채팅방 정보 DB에 저장
        chatRooms.put(randomId, chatRoom);  // 방 생성, 키를 UUID로 하고 방 정보를 값으로 저장
        return chatRoom;
    }

    // 방 삭제하기
    public void removeRoom(String roomId) {
        ChatRoomResDto room = chatRooms.get(roomId); // 방 정보 가져오기
        if (room != null) { // 방이 존재하면
            if (room.isSessionEmpty()) { // 방에 세션이 없으면
                chatRooms.remove(roomId); // 방 삭제
                ChatRoom chatRoomEntity = chatRoomRepository.findById(roomId).orElseThrow(
                        () -> new RuntimeException("해당 채팅방이 존재하지 않습니다.")
                );
                if (chatRoomEntity != null) {
                    chatRoomRepository.delete(chatRoomEntity);
                }
            }
        }
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch(IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    // 채팅 메세지 DB 저장
    public void saveMessage(String roomId, String sender, String message) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("해당 채팅방이 존재하지 않습니다."));
        Chat chatMessage = new Chat();
        chatMessage.setChatRoom(chatRoom);
        chatMessage.setSender(sender);
        chatMessage.setMessage(message);
        chatMessage.setSentAt(LocalDateTime.now());
        chatRepository.save(chatMessage);
    }
    // 이전 채팅 가져오기
    public List<Chat> getRecentMessages(String roomId) {
        return chatRepository.findRecentMessages(roomId);
    }

    // Post에 roomId 추가
    public boolean postAddRoomId(PostDto postDto) {
        // 게시글과 채팅방 서로 조인하는 메소드
        System.out.println("testtest : " + postDto.getRoomId());
        try {
            Post post = postRepository.findById(postDto.getId()).orElseThrow(
                    () -> new RuntimeException("게시글에 roomId 추가 : 해당 게시글이 존재하지 않습니다.")
            );
            ChatRoom chatRoom = chatRoomRepository.findById(postDto.getRoomId()).orElseThrow(
                    () -> new RuntimeException("게시글에 roomId 추가 : 해당 채팅방이 존재하지 않습니다.")
            );
            System.out.println("post : " + postDto.getId());
            System.out.println("roomID : " + postDto.getRoomId());


            // Post(게시글)에 roomId값을 이용해서 ChatRoom과 연결
            post.setChatRoom(chatRoom);
            postRepository.save(post);

            return true;
//
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // postId로 게시글 상세 조회
    public PostDto getPostListById(Long postId) {
        System.out.println("chatService에서 받은 postId : " + postId);
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
        );
        return convertEntityToDto(post);
    }

    // 게시글 엔티티를 dto로 변환
    private PostDto convertEntityToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setPlace(post.getPlace());
        postDto.setPeople(post.getPeople());
        postDto.setFee(post.getFee());
        postDto.setIntroduction(post.getIntroduction());
        postDto.setDate(post.getDate());
        postDto.setTime(post.getTime());
        postDto.setRegDate(post.getRegDate());
        // 게시글에 연결된 채팅방이 있으면 ?
        if(post.getChatRoom() != null) {
            postDto.setRoomId(post.getChatRoom().getRoomId());
        } else {
            return postDto;
        }
        return postDto;
    }
    // ChatRoom 엔티티를 dto로 변환
    private ChatRoomResDto convertEntityToRoomDto(ChatRoom chatRoom) {
        ChatRoomResDto chatRoomResDto = new ChatRoomResDto();
        chatRoomResDto.setRoomId(chatRoom.getRoomId());
        chatRoomResDto.setName(chatRoom.getRoomName());
        // 게시글에 연결된 채팅방이 있으면 ?
        if(chatRoom.getPost() != null) {
            chatRoomResDto.setPostId(chatRoom.getPost().getId());
        } else {
            return chatRoomResDto;
        }
        return chatRoomResDto;
    }
}