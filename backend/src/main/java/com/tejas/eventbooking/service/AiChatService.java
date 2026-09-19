package com.tejas.eventbooking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.tejas.eventbooking.dto.ChatResponse;

@Service
public class AiChatService {

    private final Client geminiClient;
    private final String model;

    public AiChatService(@Value("${gemini.api.key}") String apiKey, @Value("${gemini.model}") String model) {

        this.geminiClient = Client.builder()
                .apiKey(apiKey)
                .build();

        this.model = model;
    }

    public ChatResponse chat(String message) {

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        model,
                        message,
                        null
                );

        return new ChatResponse(response.text());
    }
}