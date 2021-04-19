package com.exercise.responseDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.StringJoiner;

public class GymDetailResponse {

	private Long id;

	private String address;

	private String city;

	private String name;

	private BigDecimal latitude;

	private BigDecimal longitude;

	private String state;

	private String email;
	
	private String website;
	
	private String zipCode; 
	
	private String country; 
	
	private String contact; 
	
	private String videoUrl; 
	
	private String imagePath;
	
	private String description;	
	
	private String facilities;
	
	private List<String> galleryImages;
	
	public GymDetailResponse() {
		
	}
	
	public GymDetailResponse(Long id, String address, String city, String name, BigDecimal latitude,
			BigDecimal longitude, String state, String email, String website, String zipCode, String country,
			String contact, String videoUrl, String imagePath, String description, boolean aerobic, boolean dance, boolean fitness, boolean pilates, boolean weightLifting, boolean yoga) {
		super();
		this.id = id;
		this.address = address;
		this.city = city;
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.state = state;
		this.email = email;
		this.website = website;
		this.zipCode = zipCode;
		this.country = country;
		this.contact = contact;
		this.videoUrl = videoUrl;
		this.imagePath = imagePath;
		this.description = description;
		
		StringJoiner joiner = new StringJoiner(", ");
		if(aerobic)
			joiner.add("Aerobic");
		if(dance)
			joiner.add("Dance");
		if(fitness)
			joiner.add("Fitness");
		if(pilates)
			joiner.add("Pilates");
		if(weightLifting)
			joiner.add("Weight Lifting");
		if(yoga)
			joiner.add("Yoga");
		
		this.facilities = joiner.toString();
	}

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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
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

	public String getFacilities() {
		return facilities;
	}

	public void setFacilities(String facilities) {
		this.facilities = facilities;
	}

	public List<String> getGalleryImages() {
		return galleryImages;
	}

	public void setGalleryImages(List<String> galleryImages) {
		this.galleryImages = galleryImages;
	}
	
}
