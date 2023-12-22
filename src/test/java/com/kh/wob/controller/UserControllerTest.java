package com.kh.wob.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.wob.controller.UserController;
import com.kh.wob.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith({SpringExtension.class, MockitoExtension.class})
@WebMvcTest(UserController.class)
class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public UserControllerTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    void checkNickName() throws Exception {
        // Mock 데이터
        String nickName = "qwerty";
        boolean isNickNameAvailable = true;

        // Mock Service 메서드 호출시 반환값 설정
        when(userService.isNickName(nickName)).thenReturn(isNickNameAvailable);

        // GET 요청을 수행하는 MockMvcRequestBuilder 생성
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/check-nickname")
                .param("nickName", nickName)
                .contentType(MediaType.APPLICATION_JSON);

        // MockMvc를 사용하여 요청 수행 및 응답 확인
        MvcResult result = mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(isNickNameAvailable))
                .andReturn();

        // 결과 확인
        System.out.println(result.getResponse().getContentAsString());
    }
}
