package com.tejas.eventbooking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private String venue;
    private LocalDateTime eventDate;
    private Integer totalSeats;
    private Integer availableSeats;
    private Double price;
    private Long organizerId;
    private String message;
}