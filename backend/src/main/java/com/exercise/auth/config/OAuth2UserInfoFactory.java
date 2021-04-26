package com.exercise.auth.config;

import java.util.Map;

import com.exercise.auth.exception.OAuth2AuthenticationProcessingException;
import com.exercise.auth.model.OAuth2UserInfo;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
    	throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
    }
}
