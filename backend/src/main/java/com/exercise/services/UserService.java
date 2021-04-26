package com.exercise.services;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;

import com.exercise.database.entities.User;
import com.exercise.enums.Calculation;
import com.exercise.request.SignupRequest;
import com.exercise.utils.Response;

public interface UserService {

	ResponseEntity<Response> saveUser(@Valid SignupRequest signupRequest);

	Collection<? extends GrantedAuthority> getUserRoleList(String username);

	ResponseEntity<Response> checkLogin();
	
	User findLoginUser();

	ResponseEntity<Response> history(Calculation calculation, String data);

	ResponseEntity<Response> getHistory(Calculation calculation);

}
