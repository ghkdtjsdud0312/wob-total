package com.kh.wob.repository;

import com.kh.wob.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
//    List<Category> findByTitleContaining(String keyword);
    Page<Category> findAll(Pageable pageable);
    Optional<Category> findById(Long id);
}
