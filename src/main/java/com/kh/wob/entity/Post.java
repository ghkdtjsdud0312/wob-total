package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    // 카테고리 넣기

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private int people;

    private int joiners;

    private Long expectationCost;
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
    private boolean active;

}
