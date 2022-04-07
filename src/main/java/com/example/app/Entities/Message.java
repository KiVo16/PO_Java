package com.example.app.Entities;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "messages")
public class Message implements Serializable {

    /**
     * Numeryczny indentyfikator wiadomości. Identyfikator jest automatycznie podbijany.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Zwartość wiadomości.
     */
    @Column(name = "content", nullable = false)
    private String content;

    /**
     * Data utworzenia wiadomości. Wartość jest automatycznie generowana.
     */
    @Column(name = "created_at")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "s")
    private Date createdAt;

    /**
     * Temat, do którego podpięta jest wiadomość.
     * W JSONie wartość zwaracana jako identyfikator tematu.
     */
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    /**
     * Użytkownik, do którego podpięta jest wiadomość.
     * W JSONie wartość zwaracana jako identyfikator użytkownika.
     */
    @JsonProperty("userId")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Konstruktor bazowy
     */
    public Message() {

    }

    /**
     * Konstruktor główny
     *
     * @param content zawartość wiadomości
     */
    public Message(String content) {
        super();
        this.content = content;
    }

    /**
     * Zwraca identyfikator wiadomości
     *
     * @return identyfikator wiadomości
     */
    public Long getId() {
        return id;
    }

    /**
     * Ustawia identyifkator wiadomości
     *
     * @param id identyfikator wiadomości
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Zwraca zawartość wiadomości.
     *
     * @return zawartość wiadomości.
     */
    public String getContent() {
        return content;
    }

    /**
     * Ustawia zawartość wiadomości
     *
     * @param content zawartość wiadomości
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Zwraca czas utowrzenia wiadomości.
     *
     * @return czas utworzenia wiadomości.
     * @see Date
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * Ustawia czas utowrzenia wiadomości.
     *
     * @param createdAt czas utowrzenia wiadomości
     * @see Date
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Zwraca użytkownika, do którego podpięta jest wiadomość.
     *
     * @return użytkownik, do której którego jest wiadomość.
     * @see User
     */
    public User getUser() {
        return user;
    }

    /**
     * Przypisuje użytkownika do wiadomości.
     *
     * @param user obiekt User
     * @see User
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Zwraca temat, do którego podpięta jest wiadomość.
     *
     * @return temat, do którego podpięta jest wiadomość.
     * @see Topic
     */
    public Topic getTopic() {
        return topic;
    }

    /**
     * Przypisuje temat do wiadomości
     *
     * @param topic obiekt Topic
     * @see Topic
     */
    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
