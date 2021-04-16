package com.exercise.utils;

import java.math.BigDecimal;
import java.security.SecureRandom;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.RandomStringUtils;

public class Utils {

	/**
	 * Create 10 digit random number 
	 */
	public static String generateTenDigitRandomNumber() {
		char[] possibleCharacters = (new String("0123456789")).toCharArray();
		String randomStr = RandomStringUtils.random( 10, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );
		return randomStr;
	}
	
	/**
	 * 
	 * @param distence
	 * @return
	 */
	public static String getMiles(BigDecimal distence) {
		if(distence != null) {
			if(distence.doubleValue() < 1) {
				Integer d = (int) (distence.doubleValue() * 1000);
				return d + " m";
			} else {
				String s = distence.setScale(1, BigDecimal.ROUND_HALF_EVEN).toString() + " km";
				return s;
			}
		} else {
			return null;
		}
	}
	
	/**
	 * Get Root URL
	 * 
	 * @param request
	 * @return
	 */
	public static String getRootURL(HttpServletRequest request) {
		return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
	}
}
