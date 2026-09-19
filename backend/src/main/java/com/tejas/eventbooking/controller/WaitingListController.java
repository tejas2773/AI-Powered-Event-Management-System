package com.tejas.eventbooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.eventbooking.dto.WaitingListRequest;
import com.tejas.eventbooking.dto.WaitingListResponse;
import com.tejas.eventbooking.service.WaitingListService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/waitinglist")
public class WaitingListController {

    @Autowired
    private WaitingListService waitingListService;

    @PostMapping
    public ResponseEntity<WaitingListResponse> joinWaitingList(@Valid @RequestBody WaitingListRequest request) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        WaitingListResponse response = waitingListService.joinWaitingList(request, userEmail);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my-waitlist")
    public ResponseEntity<List<WaitingListResponse>> getMyWaitingList() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        List<WaitingListResponse> entries = waitingListService.getMyWaitingList(userEmail);
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

}