package com.kh.wob.repository;

import com.kh.wob.entity.Category;
import com.kh.wob.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Page<Payment> findByUserEmailOrderByIdDesc(String email, Pageable pageable);
    Page<Payment> findAllByOrderByIdDesc(Pageable pageable);
    Page<Payment> findAll(Pageable pageable); // 모든 목록
    List<Payment> findByActive(String active);
    Optional<Payment> findById(Long id);

}
