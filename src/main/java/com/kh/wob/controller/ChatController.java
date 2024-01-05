package com.kh.wob.controller;

import com.kh.wob.dto.*;
import com.kh.wob.entity.Chat;
import com.kh.wob.service.ChatService;
import com.kh.wob.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    private final PostService postService;
    // 게시글 채팅방 생성
    @PostMapping("/new")
    public ResponseEntity<String> createRoom(@RequestBody ChatRoomReqDto chatRoomDto) {
        log.warn("chatRoomDto : {}", chatRoomDto);
        ChatRoomResDto room = chatService.createRoom(chatRoomDto);
        System.out.println(room.getRoomId());
        return ResponseEntity.ok(room.getRoomId());
    }

    // 자유 채팅방 생성
    @PostMapping("/freeNew")
    public ResponseEntity<String> createFreeRoom(@RequestBody ChatRoomReqDto chatRoomDto) {
        log.warn("chatRoomDto : {}", chatRoomDto);
        ChatRoomResDto room = chatService.createRoom(chatRoomDto);
        System.out.println(room.getRoomId());
        return ResponseEntity.ok(room.getRoomId());
    }

    // 모든 채팅방 리스트
    @GetMapping("/roomList")
    public ResponseEntity<List<ChatRoomResDto>> findAllRoom() {
        return ResponseEntity.ok(chatService.findAllChatRoom());
    }

    // 자유 채팅방 리스트 (postId 없음)
    @GetMapping("/freeList")
    public ResponseEntity<List<ChatRoomResDto>> findByFreeRoom() {
        return ResponseEntity.ok(chatService.findFreeRoom());
    }

    // 전체 채팅 내역 리스트
    @GetMapping("/chatList")
    public ResponseEntity<List<ChatMessageDto>> findAll() {return ResponseEntity.ok(chatService.findAllChat()); }

    // 방 정보 가져오기
    @GetMapping("/room/{roomId}")
    public ResponseEntity<ChatRoomResDto> findRoomById(@PathVariable String roomId) {
        System.out.println("room/{roomId}:"+roomId);
        System.out.println("방 정보 가져오기 : " + chatService.findRoomById(roomId));
        return ResponseEntity.ok(chatService.findRoomById(roomId));
    }

    // 메세지 저장하기
    @PostMapping("/message")
    public ResponseEntity<ChatMessageDto> saveMessage(@RequestBody ChatMessageDto chatMessageDto) {
        chatService.saveMessage(chatMessageDto.getRoomId(), chatMessageDto.getSender(), chatMessageDto.getMessage());
        return ResponseEntity.ok(chatMessageDto);
    }

    // 해당 방의 최근 메세지 불러오기
    @GetMapping("/message/{roomId}")
    public List<Chat> getRecentMessages(@PathVariable String roomId) {
        System.out.println("최근 메세지 불러오기 호출 : " + roomId);
        return chatService.getRecentMessages(roomId);
    }

    // Post에 연결된 채팅방 정보 넣기
    @PutMapping("/modify")
    public ResponseEntity<Boolean> postAddRoomId(@RequestBody PostDto postDto) {
        boolean isTrue = chatService.postAddRoomId(postDto);
        System.out.println("잘 실행 되는가? " + postDto.getRoomId());
        return ResponseEntity.ok(isTrue);
    }

    // postId로 게시글 상세 조회
    @GetMapping("/postListById/{postId}")
    public ResponseEntity<PostDto> getPostListById(@PathVariable Long postId) {
        System.out.println("postId로 게시글 상세 조회 : " + postId);
        return ResponseEntity.ok(chatService.getPostListById(postId));
    }

    // 채팅 내역 활성화 비활성화
    @PutMapping("/stateChat")
    public ResponseEntity<Boolean> updateChatActive(@RequestBody ChatMessageDto chatMessageDto) {
        boolean isTrue = chatService.updateChatActive(chatMessageDto);
        return ResponseEntity.ok(isTrue);
    }

    // 채팅방 활성화 비활성화
    @PutMapping("/stateRoom")
    public ResponseEntity<Boolean> updateRoomActive(@RequestBody ChatRoomResDto chatRoomResDto) {
        boolean isTrue = chatService.updateRoomActive(chatRoomResDto);
        return ResponseEntity.ok(isTrue);
    }

    // 채팅 내역 삭제
    @DeleteMapping("/delChat/{id}")
    public ResponseEntity<Boolean> deleteChat(@PathVariable Long id) {
        boolean isTrue = chatService.deleteChat(id);
        return ResponseEntity.ok(isTrue);
    }
    // 채팅방 삭제
    @DeleteMapping("/delRoom/{roomId}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable String roomId) {
        boolean isTrue = chatService.deleteRoom(roomId);
        return ResponseEntity.ok(isTrue);
    }

    // 전체 채팅 내역 불러오기 (페이지네이션)
    @GetMapping("/all/page")
    public ResponseEntity<List<ChatMessageDto>>chatAllList(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int size) {
        List<ChatMessageDto> chatMessageDtos = chatService.chatAllList(page,size);
        return ResponseEntity.ok(chatMessageDtos);
    }
    // 전체 채팅 내역 페이지 수 조회
    @GetMapping("/all/count")
    public ResponseEntity<Integer> paymentAllCount(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page,size);
        int pageCnt = chatService.getChatAllPage(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
}
