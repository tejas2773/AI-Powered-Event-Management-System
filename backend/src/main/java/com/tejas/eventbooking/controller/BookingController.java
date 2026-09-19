package com.tejas.eventbooking.controller;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.eventbooking.dto.BookingRequest;
import com.tejas.eventbooking.dto.BookingResponse;
import com.tejas.eventbooking.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        BookingResponse response = bookingService.createBooking(request, userEmail);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        List<BookingResponse> bookings = bookingService.getMyBookings(userEmail);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long bookingId) {
        BookingResponse response = bookingService.cancelBooking(bookingId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}