package com.kh.wob.entity;

import lombok.*;

import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "post")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long Id;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User User;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private int people;

    private int joiners;

    private Long fee;
    private String introduction;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String time;

    private LocalDateTime regDate;

    @PrePersist
    public void prePersist() {
        regDate = LocalDateTime.now();

    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom; // 일반 게시글과 연결된 채팅방

    private String image;

    @Column(nullable = false)
    private String type;

    private String active;

}
