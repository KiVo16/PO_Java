package com.example.app.Helpers;

public class LoginData {

    /**
     * Pole tekstowe - login
     */
    private String login;

    /**
     * Konstruktor bazowy
     */
    public LoginData() {

    }

    /**
     * Konstruktor główny
     *
     * @param login login
     */
    public LoginData(String login) {
        super();
        this.login = login;
    }

    /**
     * Zwraca login
     *
     * @return login
     */
    public String getLogin() {
        return login;
    }

    /**
     * Ustawia login
     *
     * @param login login
     */
    public void setLogin(String login) {
        this.login = login;
    }
}
