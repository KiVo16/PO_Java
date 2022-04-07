package com.example.app.Controllers;

import com.example.app.Entities.Message;
import com.example.app.Entities.Topic;
import com.example.app.Entities.User;
import com.example.app.Helpers.Identifier;
import com.example.app.Repositories.MessagesRepository;
import com.example.app.Repositories.TopicsRepository;
import com.example.app.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TopicsController {

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
     * Zwraca wszystkie tematy
     *
     * @return lista tematów
     * @see Topic
     */
    @GetMapping("/topics")
    public List<Topic> getAll() {
        return topicsRepository.findAll();
    }

    /**
     * CRUD
     * Metoda: POST
     * Tworzy temat
     *
     * @param topic obiekt Topic
     * @return nowo utworzony temat
     * @see Topic
     */
    @PostMapping("/topics")
    public Topic newTopic(@RequestBody Topic topic) {
        return topicsRepository.save(topic);
    }

    /**
     * CRUD
     * Metoda: GET
     * Zwraca konkretny temat
     *
     * @param id identyfikator tematu
     * @return temat
     * @see Topic
     */
    @GetMapping("/topics/{id}")
    public Topic getOne(@PathVariable Long id) {
        Topic topic = topicsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "topic not found"));

        //topic.getUsers();
        return topic;
    }

    /**
     * CRUD
     * Metoda: GET
     * Zwraca wszystkie wiadomości przypisane do dango tematu
     *
     * @param id identyfikator tematu
     * @return lista wiadomości
     * @see Message
     */
    @GetMapping("/topics/{id}/messages")
    public List<Message> getMessages(@PathVariable Long id) {
        Topic topic = topicsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "topic not found"));


        return messagesRepository.findByTopicIdEquals(id);
    }

    /**
     * CRUD
     * Metoda: GET
     * Zwraca wszystkich użytkowników przypisanych do dango tematu
     *
     * @param id identyfikator tematu
     * @return lista użytkowników
     * @see User
     */
    @GetMapping("/topics/{id}/users")
    public List<User> getUsers(@PathVariable Long id) {
        Topic topic = topicsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("topic not found"));

        return usersRepository.findUsersByTopicId(id);
    }


    /**
     * CRUD
     * Metoda: POST
     * Dodaje istenijacego w systemie użytkownika do tematu.
     * Jeżeli temat albo użytkownik nie istnieje to zostanie zwrócony błąd.
     * Jeżeli uzytkownik już jest członkiem danego tematu to nie zostanie nic zapisane w bazie.
     *
     * @param id identyfikator tematu
     * @param identifier obiekt Identifier
     * @see Identifier
     */
    @PostMapping("/topics/{id}/users")
    public void addUser(@PathVariable Long id, @RequestBody Identifier identifier) {
        Topic topic = topicsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "topic not found"));

        User user = usersRepository.findById(identifier.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));

        if (usersRepository.countUserTopicAssociation(topic.getId(), user.getId()) > 0) {
            return;
        }

        user.getTopics().add(topic);
        topicsRepository.save(topic);
        return;
    }

    /**
     * CRUD
     * Metoda: POST
     * Dodaje nową wiadomość do tematu, która jest jednocześnie przypisna do użytkownika.
     * Jeżeli temat albo użytkownik nie istnieje to zostanie zwrócony błąd.
     * Jeżeli użytkownik nie jest członkiem tematu to też zostanie zwrócony błąd.
     *
     * @param id identyfikator tematu
     * @param userID identyfikator użytkownika
     * @param message obiekt Message
     * @return nowa wiadomość
     */
    @PostMapping("/topics/{id}/users/{userID}/messages")
    public Message addMessage(@PathVariable Long id, @PathVariable Long userID, @RequestBody Message message) {
        Topic topic = topicsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("topic not found"));

        List<User> users = getUsers(id);

        Optional<User> u = users.stream().filter(i -> i.getId() == userID).findFirst();
        if (!u.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user is not member of this topic");
        }
        User user = u.get();
        message.setUser(user);
        message.setTopic(topic);
        messagesRepository.save(message);
        return message;
    }

}

