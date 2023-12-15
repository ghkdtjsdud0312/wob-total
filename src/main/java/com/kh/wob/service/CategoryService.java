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
    private static CategoryRepository categoryRepository;
    private final UserRepository memberRepository;

    // 게시글 등록
//    public boolean saveBoard(BoardDto boardDto) {
//        try {
//            Board board = new Board();
//            Long memberId = getCurrentMemberId();
//            Member member = memberRepository.findById(memberId).orElseThrow(
//                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
//            );
//            Category category = categoryRepository.findById(boardDto.getCategoryId()).orElseThrow(
//                    () -> new RuntimeException("해당 카테고리가 존재하지 않습니다.")
//            );
//            board.setTitle(boardDto.getTitle());
//            board.setCategory(category);
//            board.setContent(boardDto.getContent());
//            board.setImgPath(boardDto.getImg());
//            board.setMember(member);
//            boardRepository.save(board);
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    // 카테고리 목록 조회
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
    public static boolean modifyCategory(Long id, CategoryDto categoryDto) {
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
    public static boolean deleteCategory(Long id) {
        try {
            categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
//    // 게시글 검색
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

    // 게시글 엔티티를 DTO로 변환
//    private BoardDto convertEntityToDto(Board board) {
//        BoardDto boardDto = new BoardDto();
//        boardDto.setBoardId(board.getBoardId());
//        boardDto.setTitle(board.getTitle());
//        boardDto.setCategoryId(board.getCategory().getCategoryId());
//        boardDto.setContent(board.getContent());
//        boardDto.setImg(board.getImgPath());
//        boardDto.setEmail(board.getMember().getEmail());
//        boardDto.setRegDate(board.getRegDate());
//        return boardDto;
//    }

    // 페이지 수 조회
    public int getCategorys(Pageable pageable) {
        return categoryRepository.findAll(pageable).getTotalPages();
    }

}
