package com.tejas.eventbooking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WaitingListResponse {
    private Long id;
    private Long userId;
    private Long eventId;
    private Integer numberOfSeatsRequested;
    private String status;
    private LocalDateTime joinedAt;
    private String message;
}