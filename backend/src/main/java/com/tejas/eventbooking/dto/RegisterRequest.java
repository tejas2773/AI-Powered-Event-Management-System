package com.tejas.eventbooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegisterRequest {
	
	@NotBlank(message = "name is required")
	private String name;
	@NotBlank(message = "email is required")
	@Email(message = "Enter a valid email")
	private String email;
	@NotBlank(message = "password is required")
	@Size(min = 6, message = "Password must be at least 6 characters")
	private String password;
	@NotBlank(message = "Role is required")
	@Pattern(regexp = "ADMIN|ORGANIZER|ATTENDEE", message = "Role must be ADMIN, ORGANIZER, or ATTENDEE")
	private String role;
}
