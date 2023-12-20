package com.kh.wob.repository;

import com.kh.wob.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    // orderBy로 정렬해서 채팅 친 순서대로 가져오기. 개수는 10로 제한( 채팅이 많아지면 가져오기 힘들기 때문에)
    @Query(value = "SELECT * FROM chat WHERE room_id = ?1 ORDER BY sent_at ASC LIMIT 10", nativeQuery = true)
    List<Chat> findRecentMessages(String roomId);
}