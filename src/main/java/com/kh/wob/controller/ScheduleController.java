package com.kh.wob.controller;

import com.kh.wob.dto.ScheduleDto;
import com.kh.wob.service.PostService;
import com.kh.wob.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final PostService postService;

    @PostMapping("/join")
    public ResponseEntity<String> addSchedule(@RequestBody ScheduleDto scheduleDto) {
        log.info("scheduleDto 정보 확인 : {}", scheduleDto.getUserEmail());
        scheduleService.addSchedule(scheduleDto);
        return ResponseEntity.ok("일정이 추가되었습니다.");
    }
    // userEmail에 해당하는 일정 가져오기 API
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<ScheduleDto>> getJoinPost(@PathVariable String userEmail) {
        log.info("조인 리스트 가져가기 : {}", userEmail);
        List<ScheduleDto> list = scheduleService.getPostByUserEmail(userEmail);
        return ResponseEntity.ok(list);
    }
}