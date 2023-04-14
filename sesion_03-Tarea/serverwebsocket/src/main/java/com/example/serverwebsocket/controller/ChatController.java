package com.example.serverwebsocket.controller;


import com.example.serverwebsocket.model.Mensaje;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/saludo")
    @SendTo("/destino/mensaje")
    public Mensaje send(@Payload Mensaje mensaje) {
        return mensaje;
    }
}