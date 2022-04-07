package com.example.app.Entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements Serializable {

    /**
     * Numeryczny indentyfikator użytkownika. Identyfikator jest automatycznie podbijany.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Login/Nazwa użytkownika.
     */
    @Column(name = "login", nullable = false)
    private String login;

    /**
     * Identyfikator sesji WebSocketowej
     */
    @Column(name = "session_id")
    private String sessionId;

    /**
     * Lista tematów, do których użytkownik dołączył.
     */
    @OneToMany(targetEntity = Topic.class, fetch = FetchType.EAGER)
    private List<Topic> topics;

    /**
     * Konstruktor bazowy
     */
    public User() {

    }

    /**
     * Konstruktor główny
     *
     * @param login login użytkownika
     */
    public User(String login) {
        super();
        this.login = login;
    }

    /**
     * Zwraca identyfikator użytkownika
     *
     * @return identyfikator użytkownika
     */
    public Long getId() {
        return id;
    }

    /**
     * Ustawia identyifkator użytkownika
     *
     * @param id identyfikator użytkownika
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Zwraca login użytkownika
     *
     * @return login użytkownika
     */
    public String getLogin() {
        return login;
    }

    /**
     * Ustawia login użytkownika
     *
     * @param login login użytkownika
     */
    public void setLogin(String login) {
        this.login = login;
    }

    /**
     * Zwraca listę tematów użytkownika
     *
     * @return lista tematów użytkownika
     * @see Topic
     */
    public List<Topic> getTopics() {
        return topics;
    }

    /**
     * Ustawia listę tematów użytkownika
     *
     * @param topics lista tematów użytkownika
     * @see Topic
     */
    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    /**
     * Zwraca identyfikator sesji WebSocketowej
     *
     * @return identyfikator sesji WebSocketowej
     */
    public String getSessionId() {
        return sessionId;
    }

    /**
     * Ustawia identyfikator sesji WebSocketowej
     *
     * @param sessionId identyfikator sesji WebSocketowej
     */
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
