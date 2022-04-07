package com.example.app.Websockets;

import com.example.app.Controllers.TopicsController;
import com.example.app.Controllers.UsersController;
import com.example.app.Entities.Message;
import com.example.app.Entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.SubProtocolCapable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class WebSocketHandler extends TextWebSocketHandler implements SubProtocolCapable {

    /**
     * Zbiór unikalnych sesji WebSocketowych
     */
    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    /**
     * Kontroler użytkowników
     */
    @Autowired
    private UsersController usersController;

    /**
     * Kontroler tematów
     */
    @Autowired
    private TopicsController topicsController;


    /**
     * Handler wywołujący się po ustanowieniu połączenia z klientem WebSocketu
     *
     * @param session sesja
     * @throws Exception
     * @see WebSocketSession
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("conn established: " + session.getId());

        sessions.add(session);
    }

    /**
     * Handler wywołujący się po zakończeniu połączenia z klientem WebSocketu
     *
     * @param session sesja
     * @param status  status
     * @see WebSocketSession
     * @see CloseStatus
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("conn closed: " + session.getId());

        sessions.remove(session);
    }

    @Scheduled(fixedRate = 10000)
    void sendPeriodicMessages() throws IOException {
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                String broadcast = "server periodic message " + LocalTime.now();
                session.sendMessage(new TextMessage(broadcast));
            }
        }
    }

    /**
     * Handler wywołujący przy odbiorze wiadomości od klienta
     *
     * @param session sesja
     * @param msg     odebrana wiadomość
     * @throws Exception
     * @see WebSocketMessage
     * @see WebSocketSession
     * @see TextMessage
     */
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
        try {
            ObjectMapper mapper = new ObjectMapper();
            WebSocketMessage message = mapper.readValue(msg.getPayload(), WebSocketMessage.class);
            System.out.println(("TYPE: " + message.getType() + " ---- " + WebSocketMessage.TypeOpen));
            if (message.getType().equals(WebSocketMessage.TypeOpen)) {
                usersController.updateUserSessionId(message.getUserId(), session.getId());
                sessions.add(session);
            } else if (message.getType().equals(WebSocketMessage.TypeClose)) {
                usersController.updateUserSessionId(message.getUserId(), "");
                sessions.remove(session);
            } else if (message.getType().equals(WebSocketMessage.TypeMessage)) {
                Message savedMessage = topicsController.addMessage(message.getTopicId(), message.getUserId(), new Message(message.getContent()));
                List<User> users = topicsController.getUsers(message.getTopicId());

                message.setMessageId(savedMessage.getId());
                message.setCreatedAt(savedMessage.getCreatedAt());
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String json = ow.writeValueAsString(message);

                users.stream().forEach(user -> {
                    System.out.println("user: " + user.getId() + " session_id: " + user.getSessionId());
                    Optional<WebSocketSession> savedSession = sessions.stream()
                            .filter(s -> user.getSessionId().equals(s.getId()))
                            .findAny();
                    if (savedSession.isPresent()) {
                        try {
                            savedSession.get().sendMessage(new TextMessage(json));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
            } else if (message.getType().equals(WebSocketMessage.TypeNewUser)) {
                List<User> users = topicsController.getUsers(message.getTopicId());
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String json = ow.writeValueAsString(message);

                users.stream().forEach(user -> {
                    System.out.println("user: " + user.getId() + " session_id: " + user.getSessionId());
                    Optional<WebSocketSession> savedSession = sessions.stream()
                            .filter(s -> user.getSessionId().equals(s.getId()))
                            .findAny();
                    if (savedSession.isPresent()) {
                        try {
                            savedSession.get().sendMessage(new TextMessage(json));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
            } else {
                System.out.println("Invalid message type");
            }
        } catch (Exception e) {
            System.out.println("WebsocketHandler Message excpetion: " + e.toString());
        }
    }

    @Override
    public List<String> getSubProtocols() {
        return Collections.singletonList("com.example.app");
    }

}
