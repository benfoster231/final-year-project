package com.exercise.services.impl;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.exercise.database.entities.CalculationHistory;
import com.exercise.database.entities.User;
import com.exercise.enums.Calculation;
import com.exercise.enums.Role;
import com.exercise.model.ResponseGenerator;
import com.exercise.repository.CalculationHistoryRepository;
import com.exercise.repository.UserRepository;
import com.exercise.request.SignupRequest;
import com.exercise.services.UserService;
import com.exercise.utils.Response;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CalculationHistoryRepository calculationHistoryRepository;
	
	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;
	
	@Autowired
	private HttpServletRequest request;
	
	/**
	 * Save user to database
	 */
	@Override
	public ResponseEntity<Response> saveUser(@Valid SignupRequest signupRequest) {
		
		User userExists = userRepository.findByEmail(signupRequest.getEmail());
	    if(userExists != null) 
	    	return ResponseGenerator.generateResponse(new Response("user.already.exist"), HttpStatus.BAD_REQUEST);
		
		User user = new User();
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(bcryptEncoder.encode(signupRequest.getPassword()));
		user.setRole(Role.ROLE_USER);
		userRepository.save(user);
		
		return ResponseGenerator.generateResponse(new Response("signup.successfully"),HttpStatus.OK);
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getUserRoleList(String username) {
		
		User user = userRepository.findByEmail(username);
		List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
		if(user == null)
			return null;
		grantedAuths.add(new SimpleGrantedAuthority(user.getRole().name()));
	    return grantedAuths;
	}

	@Override
	public ResponseEntity<Response> checkLogin() {
		
		User user = findLoginUser();
		
		if (user==null) 
			return ResponseGenerator.generateResponse(new Response("account.deleted"), HttpStatus.NOT_FOUND);
		else 
			return ResponseGenerator.generateResponse(new Response("login", user), HttpStatus.OK);
	}
	
	@Override
	public User findLoginUser() {
		
		Principal principal = request.getUserPrincipal();
		User user = null;
		user = principal == null ? null : userRepository.findByEmail(principal.getName());
		return user;
	}

	/**
	 * save history
	 */
	@Override
	public ResponseEntity<Response> history(Calculation calculation, String data) {
		User user = findLoginUser();
		
		CalculationHistory calculationHistory = new CalculationHistory();
		calculationHistory.setCalculation(calculation);
		calculationHistory.setData(data);
		calculationHistory.setUser(user);
		calculationHistory.setDate(new Date());
		calculationHistoryRepository.save(calculationHistory);
		
		
		return ResponseGenerator.generateResponse(new Response("signup.successfully",calculationHistory),HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Response> getHistory(Calculation calculation) {
		User user = findLoginUser();
		List<CalculationHistory> calculationHistory = new ArrayList<CalculationHistory>();
		if(calculation == Calculation.ALL) {
			calculationHistory = calculationHistoryRepository.findByUser(user);
		} else {
			calculationHistory = calculationHistoryRepository.findByUserAndCalculation(user, calculation);
		}
		return ResponseGenerator.generateResponse(new Response("signup.successfully",calculationHistory),HttpStatus.OK);
	}
}
