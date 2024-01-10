
package com.kh.wob.repository;

import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByTitle(String title);
    List<Post> findByCategoryNameContaining(String keyword);
    Optional<Post> findById(Long id);
    List<Post> findByIdIn(List<Long> postIdList);
    List<Post> findByUserEmail(String userEmail);
    Page<Post> findAllByOrderByDateDesc(Pageable pageable);

    Page<Post> findByTitleContaining(String keyword, Pageable pageable);
    Page<Post> findByIntroductionContaining(String keyword, Pageable pageable);

//    List<Post> findByTitleContaining(String keyword);
//    List<Post> findByIntroductionContaining(String keyword);
}
