package com.example.app.Controllers;

import com.example.app.Entities.Message;
import com.example.app.Repositories.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessagesController {

    /**
     * Kontroler wiadomości
     */
    @Autowired
    private MessagesRepository messagesRepository;

    /**
     * CRUD
     * Metoda: GET
     * Zwraca wszystkie wiadomości
     *
     * @return lista wiadomości
     */
    @GetMapping("/messages")
    public List<Message> getAll() {
        return messagesRepository.findAll();
    }


    /**
     * CRUD
     * Metoda: GET
     * Zwraca konkertną wiadomość
     *
     * @return wiadomość
     */
    @GetMapping("/messages/{id}")
    public Message getOne(@PathVariable Long id) {
        return messagesRepository.getById(id);
    }
}
