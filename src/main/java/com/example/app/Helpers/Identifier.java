package com.example.app.Helpers;

public class Identifier {

    /**
     * Identyfikator identyfikatora
     */
    private Long id;

    /**
     * Konstruktor bazowy
     */
    public Identifier() {

    }

    /**
     * Konstruktor główny
     *
     * @param id identyfikator
     */
    public Identifier(Long id) {
        super();
        this.id = id;
    }

    /**
     * Zwraca identyfikator identyfikatora
     *
     * @return identyfikator identyfikatora
     */
    public Long getId() {
        return id;
    }

    /**
     * Ustawia identyfikator identyfikatora
     *
     * @param id identyfikator
     */
    public void setId(Long id) {
        this.id = id;
    }
}
