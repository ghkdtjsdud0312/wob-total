package com.kh.wob.controller;

import com.kh.wob.dto.PaymentDto;
import com.kh.wob.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/pay")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/add")
    public ResponseEntity<PaymentDto> paymentAdd(@RequestBody PaymentDto paymentDto) {
        System.out.println("paymentAdd orderNum : " + paymentDto.getOrderNum());
        PaymentDto paymentDto1 = paymentService.savePayment(paymentDto);
        return ResponseEntity.ok(paymentDto1);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PaymentDto>> paymentList() {
        List<PaymentDto> paymentDtoList = paymentService.paymentList();
        return ResponseEntity.ok(paymentDtoList);
    }

    @GetMapping("/detail/{paymentId}")
    public ResponseEntity<PaymentDto> paymentListById(@PathVariable Long paymentId) {
        PaymentDto paymentDto = paymentService.paymentListById(paymentId);
        return ResponseEntity.ok(paymentDto);
    }
    @GetMapping("/detailEmail/{email}")
    public ResponseEntity<PaymentDto>paymentListByEmail(@PathVariable String email) {
        PaymentDto paymentDto = paymentService.paymentListByEmail(email);
        return ResponseEntity.ok(paymentDto);
    }
}
