package com.exercise.utils;

/**
 * This is the implementation Haversine Distance Algorithm between two places
 * 
 * @author ananth R = earth’s radius (mean radius = 6,371km) Δlat = lat2− lat1
 *         Δlong = long2− long1 a = sin²(Δlat/2) +
 *         cos(lat1).cos(lat2).sin²(Δlong/2) c = 2.atan2(√a, √(1−a)) d = R.c
 */
public class HaversineDistance {

	/**
	 * @param args
	 * arg 1- latitude 1 arg 2 — latitude 2 arg 3 — longitude 1 arg 4 —
	 * longitude 2
	 */
	public static Double getDistanceBetweenTwoPoints(Double lat1, Double lon1, Double lat2, Double lon2) {
		final int R = 6371; // Radious of the earth
		/*
		Double lat1 = Double.parseDouble("45.4796745");
		Double lon1 = Double.parseDouble("9.2110328");
		Double lat2 = Double.parseDouble("45.4790947");
		Double lon2 = Double.parseDouble("9.2026022");
		*/
		Double latDistance = toRad(lat2 - lat1);
		Double lonDistance = toRad(lon2 - lon1);
		Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
				+ Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
		Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		Double distance = R * c;
		return distance;

	}

	/**
	 * To rad
	 */
	private static Double toRad(Double value) {
		return value * Math.PI / 180;
	}

}