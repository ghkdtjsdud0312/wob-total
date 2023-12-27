package com.kh.wob.repository;

import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByTitle(String title);
    List<Post> findByCategoryNameContaining(String keyword);
}
