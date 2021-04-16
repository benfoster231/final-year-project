package com.exercise.model;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.exercise.utils.Response;

@Component
public class ResponseGenerator {

	private static MessageSource messageSource;

	@Autowired
	public void setMessageSource(MessageSource messageSource) {
		ResponseGenerator.messageSource = messageSource;
	}

	/**
	 * Generate response.
	 */
	public static ResponseEntity<Response> generateResponse(Response data, HttpStatus status) {
		Locale locale = LocaleContextHolder.getLocale();
		data.setMessage(messageSource.getMessage(data.getMessage(), new Object[] {}, locale));
		return new ResponseEntity<Response>(data, status);
	}

	public static ResponseEntity<Response> generateResponse2(Response response, HttpStatus status) {
		return new ResponseEntity<Response>(response, status);
	}

}
