package com.kh.wob.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {
    public enum MessageType {
        ENTER, TALK, CLOSE
    }
    private MessageType type;
    private Long id;
    private String roomId;
    private String sender;
    private String message;
    private String active;

}
