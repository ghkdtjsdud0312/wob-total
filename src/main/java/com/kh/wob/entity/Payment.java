package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "payment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 주문자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post; // 회원이 강사의 클래스 참여 시 결제하기 위해 필요한 조인


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ad_id")
    private Ad ad; // 강사가 광고 등록 시 관리자에게 결제하기 위해 필요한 조인

    private Long fee; // 주문 금액

    private LocalDateTime regDate;

    @PrePersist
    public void prePersist() {
        regDate = LocalDateTime.now();
    }

    @Column(nullable = false)
    private String orderNum; // 주문 번호

    private String PhoneNum; // 주문자 전화번호

    private String userName; // 주문자명
    
    private String postUserName; // 강사명
    
    private String postPhoneNum; // 강사 전화번호

    private String active;

}