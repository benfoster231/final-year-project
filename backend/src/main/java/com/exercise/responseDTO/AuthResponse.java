package com.exercise.responseDTO;

import java.util.List;
import java.util.stream.Collectors;

import com.exercise.enums.Role;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Role roles;
    private String name;

    public AuthResponse(String accessToken, Role role, String userName) {
        this.accessToken = accessToken;
        this.roles = role;
        this.name = userName;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

	public Role getRoles() {
		return roles;
	}

	public void setRoles(Role roles) {
		this.roles = roles;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
}
