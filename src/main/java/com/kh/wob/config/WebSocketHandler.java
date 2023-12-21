package com.kh.wob.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.wob.dto.ChatMessageDto;
import com.kh.wob.dto.ChatRoomResDto;
import com.kh.wob.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
// WebSocketHandler를 상속받아서 WebSocketHandler를 구현
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper; // JSON 문자열로 변환하기 위한 객체
    private final ChatService chatService; // 채팅방 관련 비즈니스 로직을 처리할 서비스
    private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>(); // 세션과 채팅방 ID를 매핑할 맵
    @Override
    // 클라이언트가 서버로 연결을 시도할 때 호출되는 메서드
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload(); // 클라이언트가 전송한 메시지
        log.warn("{}", payload);
        // JSON 문자열을 ChatMessageDto 객체로 변환
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);
        ChatRoomResDto chatRoom = chatService.findRoomById(chatMessage.getRoomId());

        System.out.println("chatRoom getRegDate() : " + chatRoom.getRegDate());
        sessionRoomIdMap.put(session, chatMessage.getRoomId()); // 세션과 채팅방 ID를 매핑
        System.out.println("sessionRoomIdMap : "+ sessionRoomIdMap);
        chatRoom.handlerActions(session, chatMessage, chatService);

    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 세션과 매핑된 채팅방 ID 가져오기
        try {
            // 세션과 매핑된 채팅방 ID 가져오기
            log.warn("afterConnectionClosed: {}", session);
            String roomId = sessionRoomIdMap.remove(session);
            ChatRoomResDto chatRoom = chatService.findRoomById(roomId);
            if (chatRoom != null) {
                chatRoom.handleSessionClosed(session, chatService);
            } else {
                log.warn("Chat room not found for ID: {}", roomId);
            }
        } catch (Exception e) {
            log.error("Error in afterConnectionClosed", e);
        }
    }
}