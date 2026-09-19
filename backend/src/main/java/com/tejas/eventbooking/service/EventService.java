package com.tejas.eventbooking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tejas.eventbooking.dto.EventRequest;
import com.tejas.eventbooking.dto.EventResponse;
import com.tejas.eventbooking.entity.Event;
import com.tejas.eventbooking.entity.User;
import com.tejas.eventbooking.exception.ResourceNotFoundException;
import com.tejas.eventbooking.repository.EventRepository;
import com.tejas.eventbooking.repository.UserRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private UserRepository userRepository;

    public EventResponse createEvent(EventRequest request, String organizerEmail) {

        User organizer = userRepository.findByEmail(organizerEmail).orElseThrow(() -> new ResourceNotFoundException("User not found: " + organizerEmail));

        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setVenue(request.getVenue());
        event.setEventDate(request.getEventDate());
        event.setTotalSeats(request.getTotalSeats());
        event.setAvailableSeats(request.getTotalSeats());
        event.setPrice(request.getPrice());
        event.setOrganizerId(organizer.getId());
        event.setCreatedAt(LocalDateTime.now());

        Event savedEvent = eventRepository.save(event);

        return new EventResponse(
                savedEvent.getId(),
                savedEvent.getTitle(),
                savedEvent.getDescription(),
                savedEvent.getVenue(),
                savedEvent.getEventDate(),
                savedEvent.getTotalSeats(),
                savedEvent.getAvailableSeats(),
                savedEvent.getPrice(),
                savedEvent.getOrganizerId(),
                "Event created successfully"
        );
    }

    public List<EventResponse> getAllEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventResponse> responseList = new java.util.ArrayList<>();

        for (Event event : events) {
            EventResponse response = new EventResponse(
                    event.getId(),
                    event.getTitle(),
                    event.getDescription(),
                    event.getVenue(),
                    event.getEventDate(),
                    event.getTotalSeats(),
                    event.getAvailableSeats(),
                    event.getPrice(),
                    event.getOrganizerId(),
                    null
            );
            responseList.add(response);
        }

        return responseList;
    }
    
    public EventResponse getEventById(Long id) {

        Event event = eventRepository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getVenue(),
                event.getEventDate(),
                event.getTotalSeats(),
                event.getAvailableSeats(),
                event.getPrice(),
                event.getOrganizerId(),
                null
        );
    }

    public EventResponse updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setVenue(request.getVenue());
        event.setEventDate(request.getEventDate());
        event.setTotalSeats(request.getTotalSeats());
        event.setPrice(request.getPrice());

        Event updatedEvent = eventRepository.save(event);

        return new EventResponse(
                updatedEvent.getId(),
                updatedEvent.getTitle(),
                updatedEvent.getDescription(),
                updatedEvent.getVenue(),
                updatedEvent.getEventDate(),
                updatedEvent.getTotalSeats(),
                updatedEvent.getAvailableSeats(),
                updatedEvent.getPrice(),
                updatedEvent.getOrganizerId(),
                "Event updated successfully"
        );
    }

    public void deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        eventRepository.delete(event);
    }
    
    public List<EventResponse> getMyEvents(String organizerEmail) {

        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + organizerEmail));

        List<Event> events = eventRepository.findByOrganizerId(organizer.getId());
        List<EventResponse> responseList = new java.util.ArrayList<>();

        for (Event event : events) {
            EventResponse response = new EventResponse(
                    event.getId(),
                    event.getTitle(),
                    event.getDescription(),
                    event.getVenue(),
                    event.getEventDate(),
                    event.getTotalSeats(),
                    event.getAvailableSeats(),
                    event.getPrice(),
                    event.getOrganizerId(),
                    null
            );
            responseList.add(response);
        }

        return responseList;
    }

}