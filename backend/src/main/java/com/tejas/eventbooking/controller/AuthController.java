package com.tejas.eventbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tejas.eventbooking.dto.LoginRequest;
import com.tejas.eventbooking.dto.LoginResponse;
import com.tejas.eventbooking.dto.RegisterRequest;
import com.tejas.eventbooking.dto.RegisterResponse;
import com.tejas.eventbooking.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = userService.registerUser(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.loginUser(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>("You are logged in as: " + email, HttpStatus.OK);
    }

}