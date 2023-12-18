package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "category")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id")
    private Long Id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String logo;

    @Column(nullable = false)
    private String image;

    private boolean inActive;
    private boolean active;

    @Column(nullable = false)
    private String email;

    public void setInActive(boolean isActive) {
        this.inActive =inActive;
    }

}