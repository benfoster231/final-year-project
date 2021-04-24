package com.exercise.auth.config;

import java.util.Map;

import com.exercise.auth.exception.OAuth2AuthenticationProcessingException;
import com.exercise.auth.model.FacebookOAuth2UserInfo;
import com.exercise.auth.model.GoogleOAuth2UserInfo;
import com.exercise.auth.model.OAuth2UserInfo;
import com.exercise.auth.model.SocialMediaService;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(SocialMediaService.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialMediaService.facebook.toString())) {
        	System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>" +attributes);
            return new FacebookOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
