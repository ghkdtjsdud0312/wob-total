package com.kh.wob.controller;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.entity.Category;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/category") // get 형식
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryTestService;

    // 게시글 등록
    @PostMapping("/add")
    public ResponseEntity<Boolean> categorySave(@RequestBody CategoryDto categoryDto) {
        log.info("CategoryTestDto: {}", categoryDto);
        categoryDto.setActive("active");
        log.info("category.active : {}", categoryDto.getActive());
        boolean isTrue = categoryTestService.saveCategory(categoryDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 목록
    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> categoryList() {
        List<CategoryDto> list = categoryTestService.getCategoryList();
        return ResponseEntity.ok(list);
    }

    // 게시글 삭제
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<Boolean> categoryDelete(@PathVariable Long id) {
        boolean isTrue = categoryTestService.deletecCategory(id);
        return ResponseEntity.ok(isTrue);
    }

    // 카테고리 목록 활성화인것만 들고오기
    @GetMapping("/listactive")
    public ResponseEntity<List<CategoryDto>> categoryActive() {
        List<CategoryDto> list = categoryTestService.getCategoryActive();
        return ResponseEntity.ok(list);
    }

    // 활성화 비활성화 상태 바꾸기
    @PutMapping("/state")
    public ResponseEntity<Boolean> updateCategoryIsActive(@RequestBody CategoryDto categoryDto) {
        log.info("categoryDto: {}", categoryDto);
        boolean isTrue = categoryTestService.updateCategoryIsActive(categoryDto);
        return ResponseEntity.ok(isTrue);
    }

    // 게시글 목록 페이징
    @GetMapping("/list/page")
    public ResponseEntity<List<CategoryDto>> getCategoryList(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        List<CategoryDto> list = categoryTestService.getCategoryList(page, size);
        return ResponseEntity.ok(list);
    }

    // 페이지 수 조회
    @GetMapping("/count")
    public ResponseEntity<Integer> listCategory(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = categoryTestService.getCategorys(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }

//    // 게시글 검색
//    @GetMapping("/search")
//    public ResponseEntity<List<CategoryDto>> searchCategory(@RequestParam String keyword) {
//        List<CategoryDto> list = categoryTestService.searchCategory(keyword);
//        return ResponseEntity.ok(list);
//    }

}
