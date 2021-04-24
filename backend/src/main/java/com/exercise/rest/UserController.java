package com.exercise.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.model.ResponseGenerator;
import com.exercise.utils.Response;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import services.UserService;

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
}
//