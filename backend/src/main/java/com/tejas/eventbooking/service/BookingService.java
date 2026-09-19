package com.tejas.eventbooking.service;

import com.tejas.eventbooking.repository.WaitingListRepository;
import java.time.LocalDateTime;
import com.tejas.eventbooking.entity.User;
import com.tejas.eventbooking.entity.WaitingList;
import com.tejas.eventbooking.repository.UserRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tejas.eventbooking.dto.BookingRequest;
import com.tejas.eventbooking.dto.BookingResponse;
import com.tejas.eventbooking.entity.Booking;
import com.tejas.eventbooking.entity.Event;
import com.tejas.eventbooking.exception.ResourceNotFoundException;
import com.tejas.eventbooking.repository.BookingRepository;
import com.tejas.eventbooking.repository.EventRepository;

@Service
public class BookingService {

    private final WaitingListRepository waitingListRepository;
	@Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;

	BookingService(WaitingListRepository waitingListRepository) {
		this.waitingListRepository = waitingListRepository;
	}

    public BookingResponse createBooking(BookingRequest request, String userEmail) {
    	
    	User user = userRepository.findByEmail(userEmail)
    	        .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Event not found with id: " + request.getEventId()));

        if (event.getAvailableSeats() < request.getNumberOfSeats()) {
            throw new IllegalStateException("Not enough seats available. Only "
                    + event.getAvailableSeats() + " seats left.");
        }

        event.setAvailableSeats(event.getAvailableSeats() - request.getNumberOfSeats());
        eventRepository.save(event);

        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setEventId(request.getEventId());
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setStatus("CONFIRMED");
        booking.setBookingDate(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        return new BookingResponse(
                savedBooking.getId(),
                savedBooking.getUserId(),
                savedBooking.getEventId(),
                savedBooking.getNumberOfSeats(),
                savedBooking.getStatus(),
                savedBooking.getBookingDate(),
                "Booking confirmed successfully"
        );
    }

    public List<BookingResponse> getMyBookings(String userEmail) {
    	
    	User user = userRepository.findByEmail(userEmail)
    	        .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));

    	List<Booking> bookings = bookingRepository.findByUserId(user.getId());
        List<BookingResponse> responseList = new java.util.ArrayList<>();

        for (Booking booking : bookings) {
            BookingResponse response = new BookingResponse(
                    booking.getId(),
                    booking.getUserId(),
                    booking.getEventId(),
                    booking.getNumberOfSeats(),
                    booking.getStatus(),
                    booking.getBookingDate(),
                    null
            );
            responseList.add(response);
        }

        return responseList;
    }

    public BookingResponse cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Booking not found with id: " + bookingId));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Event not found with id: " + booking.getEventId()));

        event.setAvailableSeats(event.getAvailableSeats() + booking.getNumberOfSeats());
        eventRepository.save(event);
        
        promoteFromWaitingList(event);

        return new BookingResponse(
                booking.getId(),
                booking.getUserId(),
                booking.getEventId(),
                booking.getNumberOfSeats(),
                booking.getStatus(),
                booking.getBookingDate(),
                "Booking cancelled successfully"
        );
    }
    
    private void promoteFromWaitingList(Event event) {

        List<WaitingList> waitingEntries = waitingListRepository
                .findByEventIdAndStatusOrderByJoinedAtAsc(event.getId(), "WAITING");

        for (WaitingList entry : waitingEntries) {

            if (event.getAvailableSeats() >= entry.getNumberOfSeatsRequested()) {

                event.setAvailableSeats(event.getAvailableSeats() - entry.getNumberOfSeatsRequested());
                eventRepository.save(event);

                Booking newBooking = new Booking();
                newBooking.setUserId(entry.getUserId());
                newBooking.setEventId(entry.getEventId());
                newBooking.setNumberOfSeats(entry.getNumberOfSeatsRequested());
                newBooking.setStatus("CONFIRMED");
                newBooking.setBookingDate(LocalDateTime.now());
                bookingRepository.save(newBooking);

                entry.setStatus("PROMOTED");
                waitingListRepository.save(entry);
            } else {
                break;
            }
        }
    }
}