package com.example.app.Websockets;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;


public class WebSocketMessage implements Serializable {

    /**
     * Stały typ wiadomości, mającej na celu stworzenie konfiguracji połączenia WebSocketowego
     */
    public final static String TypeOpen = "OPEN";

    /**
     * Stały typ wiadomości, mającej na celu przesłanie wiadomości z treścią.
     */
    public final static String TypeMessage = "MESSAGE";

    /**
     * Stały typ wiadomości, mającej na celu zamknięcie WebSocketu.
     */
    public final static String TypeClose = "CLOSE";

    /**
     * Stały typ wiadomości, mającej na celu powiadomienie o dołączeniu nowego użytwkonika do tematu.
     */
    public final static String TypeNewUser = "NEWUSER";

    /**
     * Typ wiadomości
     */
    @JsonProperty("type")
    private String type;

    /**
     * Identyfikator wiadomości, który zostaj uzupełniany po zamisaniu wiadomości na bazie.
     * Inaczej mówiąc jest to identyfikator wiadomości pochodzący z bazy danych.
     */
    @JsonProperty("messageId")
    private Long messageId;

    /**
     * Data utworzenia nowej wiadomości. Wartość jest automatycznie generowana.
     * Wartość zostaje uzupełniana po zapisaniu nowej wiadomości w bazie danych.
     */
    @JsonProperty("createdAt")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "s")
    private Date createdAt;

    /**
     * Identyfikator tematu, potrzebny do utworzenia nowej wiadomości.
     */
    @JsonProperty("topicId")
    private Long topicId;

    /**
     * Identyfikator użytkownika, potrzebny do utworzenia nowej wiadomości.
     */
    @JsonProperty("userId")
    private Long userId;

    /**
     * Zawartość wiadomości.
     */
    @JsonProperty("content")
    private String content;

    /**
     * Konstruktor bazowy
     */
    public WebSocketMessage() {

    }

    /**
     * Konstruktor główny
     *
     * @param type typ wiadomości
     * @param messageId identyfikator wiadomości
     * @param createdAt czas utworzenia wiadomości
     * @param topicId identyfikator tematu
     * @param userId identyfikator użytkownika
     * @param content zawartość
     * @see Date
     */
    public WebSocketMessage(String type, Long messageId, Date createdAt, Long topicId, Long userId, String content) {
        super();
        this.type = type;
        this.messageId = messageId;
        this.createdAt = createdAt;
        this.topicId = topicId;
        this.userId = userId;
        this.content = content;
    }

    /**
     * Zwraca identyfikator tematu wiadomości
     *
     * @return identyfikator tematu wiadomości
     */
    public Long getTopicId() {
        return topicId;
    }

    /**
     * Ustawia identyfikator tematu wiadomości
     *
     * @param topicId identyfikator tematu
     */
    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    /**
     * Zwraca identyfikator użytkownika wiadomości
     *
     * @return identyfikator użytkownika wiadomości
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Ustawia identyfikator użytkownika wiadomości
     *
     * @param userId identyfikator użytkownika
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Zwraca zawartość wiadomości
     *
     * @return zawartość wiadomości
     */
    public String getContent() {
        return content;
    }

    /**
     * Ustawia zawartość wiadomości
     *
     * @param content zawartość
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Zwraca typ wiadomości
     *
     * @return typ wiadomości
     */
    public String getType() {
        return type;
    }

    /**
     * Ustawia typ wiadomości
     *
     * @param type typ wiadomości
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Zwraca identyfikator wiadomości
     *
     * @return identyfikator wiadomości
     */
    public Long getMessageId() {
        return messageId;
    }

    /**
     * Ustawia identyfikator wiadomości
     *
     * @param messageId identyfikator wiadomości
     */
    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    /**
     * Zwraca czas utworzenia wiadomości.
     *
     * @return czas utworzenia wiadomości.
     * @see Date
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * Ustawia czas utworzenia wiadomości.
     *
     * @param createdAt czas utworzenia
     * @see Date
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
