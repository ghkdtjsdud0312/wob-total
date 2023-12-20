package com.kh.wob.dto;

import com.kh.wob.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Slf4j
public class ChatRoomResDto {
    private String roomId; // 채팅방 ID
    private String name; // 채팅방 이름
    private LocalDateTime regDate; // 채팅방 생성 시간
    private Long postId; // 게시글 ID

    @JsonIgnore // 이 어노테이션으로 WebSocketSession의 직렬화를 방지
    private Set<WebSocketSession> sessions; // 채팅방에 입장한 세션 정보를 담을 Set
    // 세션 수가 0인지 확인하는 메서드
    public boolean isSessionEmpty() {
        return this.sessions.size() == 0;
    }

    @Builder // 빌더 패턴 적용
    public ChatRoomResDto(String roomId, String name,Long postId, LocalDateTime regDate) {
        this.roomId = roomId;
        this.name = name;
        this.postId = postId;
        this.regDate = regDate;
        this.sessions = Collections.newSetFromMap(new ConcurrentHashMap<>()); // 동시성 문제를 해결하기 위해 ConcurrentHashMap 사용
    }

    public void handlerActions(WebSocketSession session, ChatMessageDto chatMessage, ChatService chatService) {
        if (chatMessage.getType() != null && chatMessage.getType().equals(ChatMessageDto.MessageType.ENTER)) {
            sessions.add(session);
            if (chatMessage.getSender() != null) {
                chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
            }

            log.debug("New session added : " + session);
        } else if (chatMessage.getType() != null && chatMessage.getType().equals(ChatMessageDto.MessageType.CLOSE)) {
            sessions.remove(session);
            if (chatMessage.getSender() != null) {
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
            }
            log.debug("Message removed : " + session);
        } else {
            // 입장과 퇴장이 아닌 경우 => 메세지를 보내는 경우 -> 보낼 때마다 메세지 저장
            chatService.saveMessage(chatMessage.getRoomId(), chatMessage.getSender(), chatMessage.getMessage());
            log.debug("Message received: " + chatMessage.getMessage());
        }

//        if (this.isSessionEmpty()) {
//            // 채팅방이 빈 상태이면 채팅방을 제거
//            chatService.removeRoom(this.roomId);
//        }
        sendMessage(chatMessage, chatService);
    }

    // 채팅방 세션 제거
    public void handleSessionClosed(WebSocketSession session, ChatService chatService) {
        sessions.remove(session); // removeAll?
        log.debug("Session closed: " + session);

//        if(this.isSessionEmpty()) {
//            // 채팅방이 빈 상태이면 채팅방을 제거
//            chatService.removeRoom(this.roomId);
//        }
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        for (WebSocketSession session : sessions) {
            try {
                chatService.sendMessage(session, message);
            } catch (Exception e) {
                log.error("Error sending message in ChatRoomResDto: ", e);
            }
        }
    }
}
