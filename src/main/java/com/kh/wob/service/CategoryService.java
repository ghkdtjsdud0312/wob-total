package com.kh.wob.service;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.entity.Category;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private UserRepository userRepository;

    // 게시물 목록 조회
    public List<CategoryDto> getCategoryList() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(Category category : categories) {
            categoryDtos.add(convertEntityToDto(category));
        }
        return categoryDtos;
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
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(Category category : categorys) {
            categoryDtos.add(convertEntityToDto(category));
        }
        return categoryDtos;
    }

    // 페이지 수 조회
    public int getCategorys(Pageable pageable) {
        return categoryRepository.findAll(pageable).getTotalPages();
    }

    // 게시판 목록 활성화할지 비활성화 선택
    public boolean updateCategoryIsActive(CategoryDto categoryDto) {
        try {
            Category category = categoryRepository.findById(categoryDto.getCategoryId())
                    .orElseThrow( () -> new RuntimeException("해당 카테고리가 존재하지 않습니다."));
            category.setActive(categoryDto.getActive());
            categoryRepository.save(category);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 엔티티를 DTO로 변환하는 메서드
    private CategoryDto convertEntityToDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryId(category.getId());
        categoryDto.setImage(category.getImage());
        categoryDto.setName(category.getName());
        categoryDto.setLogo(category.getLogo());
        categoryDto.setActive(category.getActive());
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

}
