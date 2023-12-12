package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lesson")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lesson_id")
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private int people;

    @Column(nullable = false)
    private int joiners;

    @Column(nullable = false)
    private Long fee;

    private String introduction;

    @Column(nullable = false)
    private String image;

    private LocalDateTime date;

    private LocalDateTime regDate;

    @PrePersist
    public void prePersist() {
        date = LocalDateTime.now();
        regDate = LocalDateTime.now();
    }

    @Column(nullable = false)
    private Boolean active;

}