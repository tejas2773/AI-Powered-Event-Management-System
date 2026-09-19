package com.tejas.eventbooking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tejas.eventbooking.dto.WaitingListRequest;
import com.tejas.eventbooking.dto.WaitingListResponse;
import com.tejas.eventbooking.entity.Event;
import com.tejas.eventbooking.entity.User;
import com.tejas.eventbooking.entity.WaitingList;
import com.tejas.eventbooking.exception.ResourceNotFoundException;
import com.tejas.eventbooking.repository.EventRepository;
import com.tejas.eventbooking.repository.UserRepository;
import com.tejas.eventbooking.repository.WaitingListRepository;

@Service
public class WaitingListService {

    @Autowired
    private WaitingListRepository waitingListRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public WaitingListResponse joinWaitingList(WaitingListRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Event not found with id: " + request.getEventId()));

        if (event.getAvailableSeats() >= request.getNumberOfSeatsRequested()) {
            throw new IllegalStateException(
                    "Seats are currently available. Please book directly instead of joining the waiting list.");
        }

        WaitingList entry = new WaitingList();
        entry.setUserId(user.getId());
        entry.setEventId(request.getEventId());
        entry.setNumberOfSeatsRequested(request.getNumberOfSeatsRequested());
        entry.setStatus("WAITING");
        entry.setJoinedAt(LocalDateTime.now());

        WaitingList savedEntry = waitingListRepository.save(entry);

        return new WaitingListResponse(
                savedEntry.getId(),
                savedEntry.getUserId(),
                savedEntry.getEventId(),
                savedEntry.getNumberOfSeatsRequested(),
                savedEntry.getStatus(),
                savedEntry.getJoinedAt(),
                "Added to waiting list successfully"
        );
    }

    public List<WaitingListResponse> getMyWaitingList(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        List<WaitingList> entries = waitingListRepository.findByUserId(user.getId());
        List<WaitingListResponse> responseList = new java.util.ArrayList<>();

        for (WaitingList entry : entries) {
            WaitingListResponse response = new WaitingListResponse(
                    entry.getId(),
                    entry.getUserId(),
                    entry.getEventId(),
                    entry.getNumberOfSeatsRequested(),
                    entry.getStatus(),
                    entry.getJoinedAt(),
                    null
            );
            responseList.add(response);
        }

        return responseList;
    }

}