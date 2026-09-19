package com.tejas.eventbooking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private Long userId;
    private Long eventId;
    private Integer numberOfSeats;
    private String status;
    private LocalDateTime bookingDate;
    private String message;
}