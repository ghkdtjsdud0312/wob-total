package com.kh.wob.controller;

import com.kh.wob.dto.PaymentDto;
import com.kh.wob.entity.Payment;
import com.kh.wob.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/pay")
public class PaymentController {
    private final PaymentService paymentService;

    // 결제 내역 저장
    @PostMapping("/add")
    public ResponseEntity<PaymentDto> paymentAdd(@RequestBody PaymentDto paymentDto) {
        System.out.println("paymentAdd orderNum : " + paymentDto.getOrderNum());
        PaymentDto paymentDto1 = paymentService.savePayment(paymentDto);
        return ResponseEntity.ok(paymentDto1);
    }

    // 결제 내역에 광고 데이터 추가하기
    @PostMapping("add/addAdId")
    public ResponseEntity<PaymentDto> paymentAddAdId(@RequestBody PaymentDto paymentDto) {
        System.out.println("adId : " + paymentDto.getAdId() + "paymentId : " + paymentDto.getId());
        PaymentDto paymentDto1 = paymentService.paymentAddAdId(paymentDto);
        return ResponseEntity.ok(paymentDto1);
    }
    // 모든 결제 내역 불러오기
    @GetMapping("/all")
    public ResponseEntity<List<PaymentDto>> paymentList() {
        List<PaymentDto> paymentDtoList = paymentService.paymentList();
        return ResponseEntity.ok(paymentDtoList);
    }

    // paymentId로 결제 내역 불러오기
    @GetMapping("/detail/{paymentId}")
    public ResponseEntity<PaymentDto> paymentListById(@PathVariable Long paymentId) {
        PaymentDto paymentDto = paymentService.paymentListById(paymentId);
        return ResponseEntity.ok(paymentDto);
    }
    // 해당 유저의 결제 내역 불러오기 (페이지네이션)
    @GetMapping("/detail/page")
    public ResponseEntity<List<PaymentDto>>paymentListByEmail(@RequestParam String email,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size) {
        List<PaymentDto> paymentDto = paymentService.paymentListByEmail(email,page,size);
        return ResponseEntity.ok(paymentDto);
    }

    // 페이지 수 조회
    @GetMapping("/detail/count")
    public ResponseEntity<Integer> paymentCount(@RequestParam String email,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page,size);
        int pageCnt = paymentService.getPaymentPage(email,pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
}
