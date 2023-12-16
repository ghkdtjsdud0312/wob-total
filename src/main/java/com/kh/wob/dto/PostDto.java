package com.kh.wob.dto;

import lombok.*;
import org.springframework.boot.SpringApplicationRunListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    //    private String categoryName;
    private String place;
    private int people;
    private int joiners;
    private Long expectationCost;
    private String introduction;
    private LocalDateTime date;
    private LocalDateTime time;
    private LocalDateTime regDate;
    private Boolean active;
}

