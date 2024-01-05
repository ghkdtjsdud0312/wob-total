package com.kh.wob.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "chatRoom")
public class ChatRoom {
    @Id
    @Column(name = "room_id")
    private String roomId; // 랜덤으로 생성되는 roomId

    @Column(name = "room_name")
    private String roomName; // 방제목

    @Column(name = "created_at")
    private LocalDateTime createdAt; // 방 생성 시간

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Chat> chats = new ArrayList<>(); // 해당 채팅방의 대화 내용들

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post; // 채팅방과 연결된 일반 게시글

    private String active;


}
