package com.kh.wob.service;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.entity.Category;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository memberRepository;

    // 카테고리 목록 조회
    public List<CategoryDto> getCategoryList() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(Category category : categories) {
            categoryDtos.add(convertEntityToDto(category));
        }
        return categoryDtos;
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

}
