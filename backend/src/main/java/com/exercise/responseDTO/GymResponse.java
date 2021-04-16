package com.exercise.responseDTO;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class GymResponse {

	private Long id;
	
	private String name;
	
	private Date createdDate;
	
	private String imagePath;
	
	private String address;
	
	public GymResponse(Long id, String name, Date createdDate, String imagePath, String address) {
		this.id = id;
		this.name = name;
		this.createdDate = createdDate;
		this.imagePath = imagePath;
		this.address = address;
	}

	public GymResponse() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}