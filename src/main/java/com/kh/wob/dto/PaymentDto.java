package com.kh.wob.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private Long id;
    private String userEmail; // 주문자 이메일
    private String PhoneNum; // 주문자 전화번호
    private String userName; // 주문자명
    private Long adId; // 해당 광고 ID
    private Long fee; // 주문 금액
    private String orderNum; // 주문 번호
    private String postTitle; // 해당 게시글 제목
    private String active;
    private String postUserName; // 강사명
    private String postPhoneNum; // 강사 전화번호



}
