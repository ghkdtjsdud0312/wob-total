package com.kh.wob.controller;

import com.kh.wob.dto.CategoryDto;
import com.kh.wob.entity.Category;
import com.kh.wob.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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
        boolean isTrue = categoryTestService.saveCategory(categoryDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 목록
    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> categoryList() {
        List<CategoryDto> list = categoryTestService.getCategoryList();
        return ResponseEntity.ok(list);
    }
    // 활성화 비활성화 내용2(모든 목록)
    @GetMapping("/allList")
    public ResponseEntity<List<Category>> getAllPosts() {
        List<Category> categorys = categoryTestService.getAllCategorys();
        return ResponseEntity.ok(categorys);
    }
    // 활성화 비활성화 (아이디)
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryTestService.getCategoryById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    // 활성화 비활성화 (활성화)
    @GetMapping("/active")
    public ResponseEntity<List<Category>> getActiveCategorys() {
        List<Category> activeCategorys = categoryTestService.getActiveCategorys();
        return ResponseEntity.ok(activeCategorys);
    }
    // 활성화 비활성화 (비활성화)
    @GetMapping("/inActive")
    public ResponseEntity<List<Category>> getInActiveCategorys() {
        List<Category> inActiveCategorys = categoryTestService.getInActiveCategorys();
        return ResponseEntity.ok(inActiveCategorys);
    }
    // 활성화 비활성화 post (수정)
    @PostMapping("/status")
    public ResponseEntity<String> manageCategoryListState(@RequestBody Map<String,Object> requestData) {
        Long id = Long.parseLong(requestData.get("id").toString());
        boolean state = (boolean) requestData.get("state");
        boolean result = categoryTestService.manageCategoryListState(id,state);
        return  result ? ResponseEntity.ok("successful") : ResponseEntity.status(500).body("failed");
    }

    // 게시글 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> modifyCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        boolean isTrue = categoryTestService.modifyCategory(id, categoryDto);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable Long id) {
        boolean isTrue = categoryTestService.deleteCategory(id);
        return ResponseEntity.ok(isTrue);
    }
    // 게시글 목록 페이징
    @GetMapping("/list/page")
    public ResponseEntity<List<CategoryDto>> getCategoryList(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        List<CategoryDto> list = categoryTestService.getCategoryList(page, size);
        return ResponseEntity.ok(list);
    }
    // 게시글 상세 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<CategoryDto> getCategoryDetail(@PathVariable Long id) {
        CategoryDto boardDto = categoryTestService.getCategoryDetail(id);
        return ResponseEntity.ok(boardDto);
    }

//    // 게시글 검색
//    @GetMapping("/search")
//    public ResponseEntity<List<CategoryDto>> searchCategory(@RequestParam String keyword) {
//        List<CategoryDto> list = categoryTestService.searchCategory(keyword);
//        return ResponseEntity.ok(list);
//    }

    // 페이지 수 조회
    @GetMapping("/count")
    public ResponseEntity<Integer> listCategory(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = categoryTestService.getCategorys(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
}
