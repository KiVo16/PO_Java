package com.example.app.Entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "topics")
@EntityListeners(AuditingEntityListener.class)
public class Topic implements Serializable {

    /**
     * Numeryczny indentyfikator tematu. Identyfikator jest automatycznie podbijany.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Nazwa tematu.
     */
    @Column(nullable = false)
    private String name;

    /**
     * Data utworzenia tematu. Wartość jest automatycznie generowana.
     */
    @Column(name = "created_at")
    @CreatedDate
    private Date createdAt;


    /**
     * Konstruktor bazowy
     */
    public Topic() {

    }

    /**
     * Konstruktor główny
     *
     * @param name nazwa tematu
     */
    public Topic(String name) {
        super();
        this.name = name;
    }

    /**
     * Zwraca identyfikator tematu
     *
     * @return identyfikator tematu
     */
    public Long getId() {
        return id;
    }

    /**
     * Ustawia identyifkator tematu
     *
     * @param id identyfikator tematu
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Zwraca nazwę tematu
     *
     * @return nazwa tematu
     */
    public String getName() {
        return name;
    }

    /**
     * Ustawia nazwę tematu
     *
     * @param name nazwa teamtu
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Zwraca czas utowrzenia tematu
     *
     * @return czas utworzenia tematu
     * @see Date
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * Ustawia czas utworzenia tematu
     *
     * @param createdAt czas utworzenia tematu
     * @see Date
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
