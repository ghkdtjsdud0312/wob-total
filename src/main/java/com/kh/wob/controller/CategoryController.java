package com.kh.wob.controller;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryTestService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> categorySave(@RequestBody CategoryDto categoryDto) {
        log.info("CategoryTestDto: {}", categoryDto);
        boolean isTrue = categoryTestService.saveCategory(categoryDto);
        return ResponseEntity.ok(isTrue);
    }
    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> categoryList() {
        List<CategoryDto> list = categoryTestService.getCategoryList();
        return ResponseEntity.ok(list);
    }
//    // 게시글 목록 페이징
//    @GetMapping("/list/page")
//    public ResponseEntity<List<CategoryDto>> getCategoryList(@RequestParam(defaultValue = "0") int page,
//                                                    @RequestParam(defaultValue = "5") int size) {
//        List<CategoryDto> list = categoryTestService.getCategoryList(page, size);
//        return ResponseEntity.ok(list);
//    }
//    // 게시글 상세 조회
//    @GetMapping("/detail/{id}")
//    public ResponseEntity<CategoryDto> getCategoryDetail(@PathVariable Long id) {
//        CategoryDto boardDto = categoryTestService.getCategoryDetail(id);
//        return ResponseEntity.ok(boardDto);
//    }
//    // 게시글 검색
//    @GetMapping("/search")
//    public ResponseEntity<List<CategoryDto>> searchCategory(@RequestParam String keyword) {
//        List<CategoryDto> list = categoryTestService.searchCategory(keyword);
//        return ResponseEntity.ok(list);
//    }
//
//    // 페이지 수 조회
//    @GetMapping("/count")
//    public ResponseEntity<Integer> listCategory(@RequestParam(defaultValue = "0") int page,
//                                              @RequestParam(defaultValue = "5") int size) {
//        PageRequest pageRequest = PageRequest.of(page, size);
//        Integer pageCnt = categoryTestService.getListCategory(pageRequest);
//        return ResponseEntity.ok(pageCnt);
//    }
}
