package com.tejas.eventbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.eventbooking.dto.ChatRequest;
import com.tejas.eventbooking.dto.ChatResponse;
import com.tejas.eventbooking.service.AiChatService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiChatController {

    private final AiChatService aiChatService;

    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {

        ChatResponse response =aiChatService.chat(request.getMessage());
        return ResponseEntity.ok(response);
    }
}
