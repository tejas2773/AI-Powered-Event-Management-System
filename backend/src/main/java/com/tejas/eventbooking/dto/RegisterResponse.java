package com.tejas.eventbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterResponse {
	private Long id;
    private String name;
    private String email;
    private String role;
    private String message;
}
