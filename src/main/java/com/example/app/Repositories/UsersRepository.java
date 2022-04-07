package com.example.app.Repositories;

import com.example.app.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.app.Entities.Topic;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {

    /**
     * Funkcja wyszukująca w bazie użytkownika o okreslonym loginie.
     *
     * @param login login użytkownika
     * @return opcjonalny użytkownk
     */
    Optional<User> getByLoginEquals(String login);

    /**
     * Funkcja wyszukująca w bazie użytkowników przypisanych do danego tematu.
     * Zapytanie zwraca identyfikataor, login i identyfikator sesji WebSocketowej dla każdego użytkownika.
     * Sam wynik zapytania jest mapowany do Listy Userów
     * Wynik jest sorotowany po loginie użytkownika.
     *
     * @param id identyfikator tematu
     * @return list użytkowników
     * @see Topic
     */
    @Query(value = "SELECT u.id, u.login, u.session_id FROM users AS u INNER JOIN users_topics AS ut ON ut.user_id = u.id WHERE ut.topics_id=:topic_id ORDER BY u.login", nativeQuery = true)
    List<User> findUsersByTopicId(@Param("topic_id") Long id);

    /**
     * Funkcja zliczająca ilość przypisań użytkownika do danego tematu.
     * Dzięki temu jeżeli wartość jest równa 0 to znaczy, że użytkownik nie jest przypisany do danego tematu.
     *
     * @param topicId identyfikator tematu
     * @param userId identyfikator użytkownika
     * @return liczba zwróconych rekordów z bazy
     * @see Topic
     * @see User
     */
    @Query(value = "SELECT COUNT(*) FROM users_topics AS ut WHERE ut.topics_id=:topic_id AND ut.user_id=:user_id", nativeQuery = true)
    Long countUserTopicAssociation(@Param("topic_id") Long topicId, @Param("user_id") Long userId);
}
