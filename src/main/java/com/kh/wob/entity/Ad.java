package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ad")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ad_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(nullable = false)
    private Long fee; // 비용

    @Column(nullable = false)
    private String period; // 광고 게시기간

    @Column(nullable = false)
    private String image; // 이미지

    private String postingDate; // 게시일

    private LocalDateTime regDate; // 작성일
    private String active; // 비활성화, 활성화

    @PrePersist
    public void prePersist () {
        regDate = LocalDateTime.now();
    }

}