package com.exercise.responseDTO;

import java.math.BigDecimal;

public class GymListResponse {

	private Long id;

	private String address;

	private String city;

	private String name;

	private BigDecimal latitude;

	private BigDecimal longitude;
	
	private String imagePath;
	
	private String description;
	
	private BigDecimal distance;
	
	private String distanceInFormate;
	
	private String facilities;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getDistance() {
		return distance;
	}

	public void setDistance(BigDecimal distance) {
		this.distance = distance;
	}

	public String getDistanceInFormate() {
		return distanceInFormate;
	}

	public void setDistanceInFormate(String distanceInFormate) {
		this.distanceInFormate = distanceInFormate;
	}

	public String getFacilities() {
		return facilities;
	}

	public void setFacilities(String facilities) {
		this.facilities = facilities;
	}
	
}
