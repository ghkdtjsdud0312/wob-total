package com.kh.wob.controller;

import com.kh.wob.dto.ScheduleDto;
import com.kh.wob.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/join")
    public ResponseEntity<String> addSchedule(@RequestBody ScheduleDto scheduleDto) {
        System.out.println("정보가 들어와지는지 확인 : " + scheduleDto);
        scheduleService.addSchedule(scheduleDto);
        return ResponseEntity.ok("일정이 추가되었습니다.");
    }
}