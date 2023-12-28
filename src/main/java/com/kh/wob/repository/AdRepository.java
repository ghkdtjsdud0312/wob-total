package com.kh.wob.repository;

import com.kh.wob.entity.Ad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdRepository extends JpaRepository<Ad, Long> {
    Page<Ad> findAll(Pageable pageable); // 모든 목록
    List<Ad> findByActive(String active);
    Optional<Ad> findById(String postId); // 광고삭제
}
