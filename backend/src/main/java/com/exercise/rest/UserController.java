package com.exercise.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.enums.Calculation;
import com.exercise.model.ResponseGenerator;
import com.exercise.services.UserService;
import com.exercise.utils.Response;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@ApiOperation(value = "Check is user login", notes = "Check is user login")
	@RequestMapping(value = "/checkLogin", method = RequestMethod.GET)
	@ApiImplicitParams(value = {@ApiImplicitParam(name = "Authorization", value = "Authorization token", required = true, dataType = "string", paramType = "header")})
	public ResponseEntity<Response> checkLogin() {
		
		try {
			return userService.checkLogin();
		} catch (Exception e) {
			return ResponseGenerator.generateResponse(new Response("please.try.again"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/calculation-history", method = RequestMethod.POST)
	@ApiImplicitParams(value = {@ApiImplicitParam(name = "Authorization", value = "Authorization token", required = true, dataType = "string", paramType = "header")})
	public ResponseEntity<Response> history(Calculation calculation, String data) {
		
		try {
			return userService.history(calculation, data);
		} catch (Exception e) {
			return ResponseGenerator.generateResponse(new Response("please.try.again"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@RequestMapping(value = "/get-history", method = RequestMethod.GET)
	@ApiImplicitParams(value = {@ApiImplicitParam(name = "Authorization", value = "Authorization token", required = true, dataType = "string", paramType = "header")})
	public ResponseEntity<Response> getHistory(Calculation calculation) {
		
		try {
			return userService.getHistory(calculation);
		} catch (Exception e) {
			return ResponseGenerator.generateResponse(new Response("please.try.again"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
//