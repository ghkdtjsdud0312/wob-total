package com.kh.wob.service;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.dto.PaymentDto;
import com.kh.wob.entity.*;
import com.kh.wob.repository.AdRepository;
import com.kh.wob.repository.PaymentRepository;
import com.kh.wob.repository.PostRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
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
    private final AdRepository adRepository;

    // 결제 내역 추가
    public PaymentDto savePayment(PaymentDto paymentDto) {
        System.out.println("savePayment orderNum : " + paymentDto.getOrderNum());
        // 만약 레슨 결제인 경우, post와 조인하는 데이터 넣기
        Payment payment = new Payment();
        if(!paymentDto.getPostTitle().equals("광고 등록")) {
            Post post = postRepository.findByTitle(paymentDto.getPostTitle()).orElseThrow(
                    () -> new RuntimeException("해당 게시글이 없습니다.")
            );
            payment.setPost(post);
        }
        User user = userRepository.findByEmail(paymentDto.getUserEmail()).orElseThrow(
                () -> new RuntimeException("해당 유저가 없습니다.")
        );
        payment.setUser(user);
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

    // 결제 내역에 광고 데이터 추가
    public PaymentDto paymentAddAdId (PaymentDto paymentDto) {
        Payment payment = paymentRepository.findById(paymentDto.getId()).orElseThrow(
                () -> new RuntimeException("해당 결제 내역이 없습니다.")
        );
        Ad ad = adRepository.findById(paymentDto.getAdId()).orElseThrow(
                () -> new RuntimeException("해당 광고가 없습니다.")
        );
        payment.setAd(ad);
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
    // 결제 내역 전체 조회 페이지네이션
    public List<PaymentDto> paymentAllList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Payment> payments = paymentRepository.findAll(pageable).getContent();
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for(Payment payment : payments) {
            paymentDtos.add(convertEntityToDto(payment));
        }
        return paymentDtos;

    }
    // 결제 내역 전체 페이지 수 조회
    public int getPaymentAllPage(Pageable pageable) {
        return paymentRepository.findAll(pageable).getTotalPages();
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
        paymentDto.setOrderNum(payment.getOrderNum());
        paymentDto.setFee(payment.getFee());
        paymentDto.setUserEmail(payment.getUser().getEmail());
        paymentDto.setUserName(payment.getUserName());
        paymentDto.setPhoneNum(payment.getPhoneNum());
        paymentDto.setActive(payment.getActive());
        paymentDto.setPostUserName(payment.getPostUserName());
        paymentDto.setPostPhoneNum(payment.getPostPhoneNum());
        if(payment.getPost() != null) { // 게시글 결제인 경우,
            paymentDto.setPostTitle(payment.getPost().getTitle());
        } else { // 광고 등록 결제인 경우,
            paymentDto.setPostTitle("광고 등록 결제 건");
            if(payment.getAd() != null) { // 결제 내역에 광고 조인
                paymentDto.setAdId(payment.getAd().getId());
            }
        }
        return paymentDto;
    }
    // 결제 삭제
    public boolean deletePayment(Long paymentId) {
        try {
            Payment payment = paymentRepository.findById(paymentId).orElseThrow(()-> new RuntimeException("존재하지 않는 결제입니다"));
            paymentRepository.delete(payment);
            log.info("해당 결제가 삭제되었습니다. : ", paymentId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 결제 목록 중 active 활성화인것만 조회
    public List<PaymentDto> getPaymentActive() {
        List<Payment> payments = paymentRepository.findByActive("active");
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for (Payment payment : payments) {
            paymentDtos.add(convertEntityToDto(payment));
        }
        return paymentDtos;
    }
    // 결제 목록 활성화할지 비활성화 선택
    public boolean updatePaymentIsActive(PaymentDto paymentDto) {
        try {
            Payment payment = paymentRepository.findById(paymentDto.getId())
                    .orElseThrow( () -> new RuntimeException("해당 결제가 존재하지 않습니다."));
            payment.setActive(paymentDto.getActive());
            paymentRepository.save(payment);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
