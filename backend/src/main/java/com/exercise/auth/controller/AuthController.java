package com.exercise.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.auth.service.TokenProvider;
import com.exercise.database.entities.User;
import com.exercise.repository.UserRepository;
import com.exercise.responseDTO.AuthResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;
    
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value =  "/login" , method = RequestMethod.POST)
    public ResponseEntity<?> authenticateUser(@RequestParam("email")String email,@RequestParam("password") String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		email,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(email);
        String token = tokenProvider.createTokenForNormalLogin(authentication);
        return ResponseEntity.ok(new AuthResponse(token, user.getRole(), user.getName()));
    }

}
