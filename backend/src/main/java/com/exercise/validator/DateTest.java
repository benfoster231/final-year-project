package com.exercise.validator;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateTest {
	
	public static void main(String[] args) throws ParseException {
		
		String testDate = "2020-03-13 15:41";
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		f.setTimeZone(TimeZone.getTimeZone("UTC"));
		Date date = f.parse(testDate);
		Timestamp timestamp = new java.sql.Timestamp(date.getTime());
		System.out.println(timestamp);
		System.out.println(timestamp.getTimezoneOffset());
	}
}
