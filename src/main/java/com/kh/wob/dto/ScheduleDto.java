package com.kh.wob.dto;

import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private String userEmail; // 사용자 이메일 정보
    private Long postId; // 게시물 ID

    // 게시물과 사용자 정보를 갖는 DTO
//    private User user; // 사용자 정보
//    private Post post; // 게시물 정보
}