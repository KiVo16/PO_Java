package com.example.app.Websockets;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {

    /**
     * Konfiguracja scieżki dla WebSocketu
     *
     * @param registry
     * @see WebSocketHandlerRegistry
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/websocket");
    }

    /**
     * Nadpisanie Handlera Websocketu
     * @return handler
     * @see com.example.app.Websockets.WebSocketHandler
     */
    @Bean
    public WebSocketHandler webSocketHandler() {
        return new com.example.app.Websockets.WebSocketHandler();
    }

}