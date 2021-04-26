package com.exercise.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.model.ResponseGenerator;
import com.exercise.request.SignupRequest;
import com.exercise.services.UserService;
import com.exercise.utils.Response;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/public")
public class PublicController {
	
	@Autowired
	private UserService userService;
	
	/**
	 * Save UserDetails
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "Save User", notes = "Save signup")
	@PostMapping("/signup")
	public ResponseEntity<Response> saveUser(@RequestBody SignupRequest signupRequest) {
		
		try {
			return userService.saveUser(signupRequest);
		} catch (Exception e) {
			return ResponseGenerator.generateResponse(new Response("please.try.again", null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

