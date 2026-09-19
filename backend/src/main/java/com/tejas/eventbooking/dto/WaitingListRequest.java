package com.tejas.eventbooking.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaitingListRequest {

    @NotNull(message = "Event id is required")
    private Long eventId;

    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "Must request at least 1 seat")
    private Integer numberOfSeatsRequested;
}