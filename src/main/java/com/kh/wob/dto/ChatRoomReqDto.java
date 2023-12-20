package com.kh.wob.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomReqDto { // 채팅방 생성 요청 시 전달되는 데이터
    private String name; // 해당 게시글의 제목
    private Long postId; // 해당 채팅방과 연결되는 게시글의 Id
}
