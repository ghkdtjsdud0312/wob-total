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
    private Long Id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String schedule;

    @Column(nullable = false)
    private Long fee;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Boolean active;

    private LocalDateTime regDate;

    @Column(nullable = false)
    private String isActive;

    @PrePersist
    public void prePersist () {
        regDate = LocalDateTime.now();
    }

}