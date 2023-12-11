package com.kh.wob.service;

import com.kh.wob.dto.ApiSampleDto;
import com.kh.wob.entity.Sample;
import com.kh.wob.repository.ApiSampleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiSampleService {
    private final ApiSampleRepository apiSampleRepository;
    public String getString() {
        return "hello, Spring";
    }
    public boolean inputSample(ApiSampleDto apiSampleDto) {
        try {
            Sample sample = new Sample();
            sample.setEmail(apiSampleDto.getEmail());
            sample.setPassword(apiSampleDto.getPassword());
            apiSampleRepository.save(sample);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public List<ApiSampleDto> outputSample() {
        List<Sample> samples = apiSampleRepository.findAll();
        List<ApiSampleDto> apiSampleDtos = new ArrayList<>();
        for(Sample sample : samples) {
            apiSampleDtos.add(convertEntityToDto(sample));
        }
        return apiSampleDtos;
    }

    // Sample 엔티티를 DTO로 변환
    private ApiSampleDto convertEntityToDto(Sample sample) {
        ApiSampleDto apiSampleDto = new ApiSampleDto();
        apiSampleDto.setSampleId(sample.getId());
        apiSampleDto.setEmail(sample.getEmail());
        apiSampleDto.setPassword(sample.getPassword());
        return apiSampleDto;
    }
}