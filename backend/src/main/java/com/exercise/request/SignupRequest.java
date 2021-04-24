package com.exercise.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class SignupRequest {

	@NotBlank(message = "enter.username")
	private String name;
	
	@Email(message = "Please provide a valid Email")
	@NotBlank(message = "Email may not be empty")
	private String email;
	
	@NotBlank(message = "Password may not be empty")
	private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
