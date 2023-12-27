package com.kh.wob.service;

import com.kh.wob.entity.Post;
import com.kh.wob.entity.Schedule;
import com.kh.wob.entity.User;
import com.kh.wob.dto.ScheduleDto;

import com.kh.wob.repository.PostRepository;
import com.kh.wob.repository.ScheduleRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public ScheduleDto addSchedule(ScheduleDto scheduleDto) {
        log.info("in SchedulService에서 dto 잘 받아오는지 확인: {}", scheduleDto);
        Schedule schedule = new Schedule();
        Post post = postRepository.findById(scheduleDto.getPostId()).orElseThrow(
                () -> new RuntimeException("해당 게시글이 없습니다.")
        );
        User user = userRepository.findByEmail(scheduleDto.getUserEmail()).orElseThrow(
                () -> new RuntimeException("해당 회원이 없습니다.")
        );
        schedule.setPost(post);
        schedule.setUser(user);

        scheduleRepository.save(schedule);
        return convertEntityToDto(schedule);
    }

    //엔티티를 dto로 변환
    private ScheduleDto convertEntityToDto(Schedule schedule) {
        ScheduleDto scheduleDto = new ScheduleDto();
//        scheduleDto.setUser(schedule.getUser());
//        scheduleDto.setPost(schedule.getPost());
        scheduleDto.setPostId(schedule.getPost().getId());
        scheduleDto.setUserEmail(schedule.getUser().getEmail());
        return scheduleDto;
    }

}