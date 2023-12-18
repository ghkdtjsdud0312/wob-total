package com.kh.wob.repository;

import com.kh.wob.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
//    List<Category> findByTitleContaining(String keyword);
    Page<Category> findAll(Pageable pageable); // 모든 목록
    Optional<Category> findById(Long id); // 아이디
    List<Category> findByInActive(boolean inActive); // 비활성화
    List<Category> findByActive(boolean active); // 활성화
}
