package com.example.app.Repositories;

import com.example.app.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.app.Entities.Topic;

import java.util.List;

@Repository
public interface MessagesRepository extends JpaRepository<Message, Long> {

    /**
     * Funkcja wyszukująca w bazie wiadomości przypisane do danego tematu.
     * Wynik jest sorotowany po czasie utworzenia wiadomości.
     *
     * @param id identyfikator tematu
     * @return lista wiadomości
     * @see Topic
     */
    @Query(value = "SELECT * FROM messages WHERE topic_id =:topic_id ORDER BY created_at", nativeQuery = true)
    List<Message> findByTopicIdEquals(@Param("topic_id") Long id);

}
