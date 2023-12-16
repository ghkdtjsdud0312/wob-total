package com.kh.wob.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

//        // date와 time을 문자열에서 localdatetime으로 파싱
//        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        LocalDateTime parsedDate = LocalDateTime.parse(date, dateFormatter);
//        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
//        LocalDateTime parsedTime = LocalDateTime.parse(time, timeFormatter);

//        // UTC 시간을 한국 시간으로 변환
//        ZonedDateTime zonedDateTimeDate = parsedDate.atZone(ZoneId.of("Asia/Seoul"));
//        ZonedDateTime zonedDateTimeTime = parsedTime.atZone(ZoneId.of("Asia/Seoul"));

        // UTC 시간을 한국 시간으로 변환
//         date = date.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime();
//         time = time.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime();

    }


    private boolean active;

}
