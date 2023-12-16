package com.kh.wob.service;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.entity.Category;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository memberRepository;

    // 게시물 목록 조회
    public List<CategoryDto> getCategoryList() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(Category category : categories) {
            categoryDtos.add(convertEntityToDto(category));
        }
        return categoryDtos;
    }

    // 게시글 상세 조회
    public CategoryDto getCategoryDetail(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
        );
        return convertEntityToDto(category);
    }
    // 게시글 수정
    public  boolean modifyCategory(Long id, CategoryDto categoryDto) {
        try {
            Category category = categoryRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
            );
            category.setId(categoryDto.getCategoryId());
            category.setName(categoryDto.getName());
            category.setLogo(categoryDto.getLogo());
            category.setImage(categoryDto.getImage());
            categoryRepository.save(category);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 게시글 삭제
    public  boolean deleteCategory(Long id) {
        try {
            categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 게시글 검색
//    public List<CategoryDto> searchCategory(String keyword) {
//        List<Category> categorys = categoryRepository.findByTitleContaining(keyword);
//        List<CategoryDto> boardDtos = new ArrayList<>();
//        for(Category category : categorys) {
//            boardDtos.add(convertEntityToDto(category));
//        }
//        return boardDtos;
//    }
    // 게시글 페이징
    public List<CategoryDto> getCategoryList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Category> categorys = categoryRepository.findAll(pageable).getContent();
        List<CategoryDto> boardDtos = new ArrayList<>();
        for(Category category : categorys) {
            boardDtos.add(convertEntityToDto(category));
        }
        return boardDtos;
    }

    // 게시글 활성 비활성화
    @Transactional
    public boolean setIsActive(String isActive, Long id) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (optionalCategory.isPresent()) {
                Category category = optionalCategory.get();
                category.setIsActive(isActive);
                categoryRepository.save(category);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 게시물 활성화 비활성화 예외처리
    @ControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(Exception.class)
        public ResponseEntity<String> handleException(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // 엔티티를 DTO로 변환하는 메서드
    private CategoryDto convertEntityToDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryId(category.getId());
        categoryDto.setImage(category.getImage());
        categoryDto.setName(category.getName());
        categoryDto.setLogo(category.getLogo());
        return categoryDto;
    }

    public boolean saveCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setImage(categoryDto.getImage());
        category.setLogo(categoryDto.getLogo());
        categoryRepository.save(category);
        return true;
    }

    // 페이지 수 조회
    public int getCategorys(Pageable pageable) {
        return categoryRepository.findAll(pageable).getTotalPages();
    }
}
