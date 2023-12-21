package com.kh.wob.repository;

import com.kh.wob.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findAll(Pageable pageable); // 모든 목록
    // active 상태가 활성화 상태인 것만 들고 오기
    List<Category> findByActive(String active);

    Optional<Category> findByName(String categoryName);

}
