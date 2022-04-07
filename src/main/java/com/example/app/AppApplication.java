package com.example.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Aplikacja Spring Boot wykorzystująca JPA oraz SQLite jako Persistent Storage.
 * Backend: REST
 * Frontend: React.js, SCSS, TypeScript
 *
 * Aplikacja Reactowa jest serwowana na ścieżce /
 * API RESTowe jest dostępne na ścieżce /api
 * Websocket jest dostępny na ścieżce /websocket
 *
 *
 * @author Jakub Kurek
 * @version 1.0
 */
@SpringBootApplication
public class AppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }


}
