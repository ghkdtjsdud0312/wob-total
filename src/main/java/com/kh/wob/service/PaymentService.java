package com.kh.wob.service;

import com.kh.wob.dto.PaymentDto;
import com.kh.wob.entity.Payment;
import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import com.kh.wob.repository.PaymentRepository;
import com.kh.wob.repository.PostRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 결제 내역 추가
    public PaymentDto savePayment(PaymentDto paymentDto) {
        System.out.println("savePayment orderNum : " + paymentDto.getOrderNum());


        Payment payment = new Payment();
        Post post = postRepository.findByTitle(paymentDto.getPostTitle()).orElseThrow(
                () -> new RuntimeException("해당 게시글이 없습니다.")
        );
        User user = userRepository.findByEmail(paymentDto.getUserEmail()).orElseThrow(
                () -> new RuntimeException("해당 유저가 없습니다.")
        );
        payment.setUser(user);
        payment.setPost(post);
        payment.setFee(paymentDto.getFee());
        payment.setOrderNum(paymentDto.getOrderNum());
        payment.setPhoneNum(paymentDto.getPhoneNum());
        payment.setUserName(paymentDto.getUserName());
        payment.setPostUserName(paymentDto.getPostUserName());
        payment.setPostPhoneNum(paymentDto.getPostPhoneNum());
        payment.setActive("active");

        paymentRepository.save(payment);

        return convertEntityToDto(payment);


    }
    // 결제 내역 전제 조회
    public List<PaymentDto> paymentList() {
        List<Payment> payments = paymentRepository.findAll();
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for(Payment payment : payments) {
            paymentDtos.add(convertEntityToDto(payment));
        }
        return paymentDtos;
    }

    // 결제 내역 선택 조회
    public PaymentDto paymentListById(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId).orElseThrow(
                () -> new RuntimeException("해당 결제 내역이 없습니다.")
        );
        return convertEntityToDto(payment);

    }
    // 결제 내역 페이지네이션
    public List<PaymentDto> paymentListByEmail(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> paymentPage = paymentRepository.findByUserEmailOrderByIdDesc(email, pageable);
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for(Payment payment : paymentPage.getContent()) {
            paymentDtos.add(convertEntityToDto(payment));
        }
        return paymentDtos;

    }

    // 페이지 수 조회
    public int getPaymentPage(String email, Pageable pageable) {
        return paymentRepository.findByUserEmailOrderByIdDesc(email,pageable).getTotalPages();
    }

    // payment 엔티티를 dto로 변환
    private PaymentDto convertEntityToDto(Payment payment) {
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setId(payment.getId());
        paymentDto.setPostTitle(payment.getPost().getTitle());
        paymentDto.setOrderNum(payment.getOrderNum());
        paymentDto.setFee(payment.getFee());
        paymentDto.setUserEmail(payment.getUser().getEmail());
        paymentDto.setUserName(payment.getUserName());
        paymentDto.setPhoneNum(payment.getPhoneNum());
        paymentDto.setActive(payment.getActive());
        paymentDto.setPostUserName(payment.getPostUserName());
        paymentDto.setPostPhoneNum(payment.getPostPhoneNum());
        return paymentDto;
    }
}
