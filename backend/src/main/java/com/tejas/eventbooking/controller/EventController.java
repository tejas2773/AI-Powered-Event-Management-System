package com.tejas.eventbooking.controller;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.eventbooking.dto.EventRequest;
import com.tejas.eventbooking.dto.EventResponse;
import com.tejas.eventbooking.service.EventService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        String organizerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        EventResponse response = eventService.createEvent(request, organizerEmail);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        List<EventResponse> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(	@PathVariable Long id) {
        EventResponse response = eventService.getEventById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long id,@Valid @RequestBody EventRequest request) {
        EventResponse response = eventService.updateEvent(id, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/my-events")
    public ResponseEntity<List<EventResponse>> getMyEvents() {
        String organizerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        List<EventResponse> events = eventService.getMyEvents(organizerEmail);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

}