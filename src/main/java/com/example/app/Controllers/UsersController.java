package com.example.app.Controllers;

import com.example.app.Entities.User;
import com.example.app.Helpers.LoginData;
import com.example.app.Repositories.MessagesRepository;
import com.example.app.Repositories.TopicsRepository;
import com.example.app.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsersController {

    /**
     * Kontroler tematów
     */
    @Autowired
    private TopicsRepository topicsRepository;

    /**
     * Kontroler wiadomości
     */
    @Autowired
    private MessagesRepository messagesRepository;

    /**
     * Kontroler użytkowników
     */
    @Autowired
    private UsersRepository usersRepository;

    /**
     * CRUD
     * Metoda: GET
     * Zwraca wszystkich użytkowników
     *
     * @return lista użytkowników
     * @see User
     */
    @GetMapping("/users")
    public List<User> getAll() {
        return usersRepository.findAll();
    }

    /**
     * CRUD
     * Metoda: POST
     * Jeżeli użytkownik o podanym lognie nie istnieje to uzytkownik zostaje zapisany na bazie i zwrócony.
     * Natomiast jeżeli taki użytkownik już istnieje to zostaje po prostu on zwrócony.
     *
     * @param user objekt User
     * @return użytkownik
     * @see User
     */
    @PostMapping("/users")
    public User newUser(@RequestBody User user) {
        Optional<User> u = usersRepository.getByLoginEquals(user.getLogin());
        if (u.isPresent()) return u.get();

        return usersRepository.save(user);
    }

    /**
     * CRUD
     * Metoda: POST
     * Zwraca użytkownika przy pomocy funkcji newUser.
     * Tą funkcje można nazwać aliasem innej funkcji.
     *
     * @param loginData objekt LoginData
     * @return użytkownik
     * @see User
     */
    @PostMapping("/login")
    public User login(@RequestBody LoginData loginData) {
        return newUser(new User(loginData.getLogin()));
    }

    /**
     * CRUD
     * Metoda: GET
     * Zwraca konkretnego użytkownika
     *
     * @param id identyfikator użytkownika
     * @return użytkownik
     * @see User
     */
    @GetMapping("/users/{id}")
    public User getOne(@PathVariable Long id) {
        return usersRepository.getById(id);
    }

    /**
     * Ustawia w bazie indetyfikator sesji WebSocketowej dla danego użytkownika.
     *
     * @param id identyfikator użytkownika
     * @param sessionId identyfikator sesji WebSocketowej
     */
    public void updateUserSessionId(Long id, String sessionId) {
        System.out.println(("data: " + id + " -- " + sessionId));
        usersRepository.findById(id)
                .map(user -> {
                    user.setSessionId(sessionId);
                    return usersRepository.save(user);
                });
    }

}

