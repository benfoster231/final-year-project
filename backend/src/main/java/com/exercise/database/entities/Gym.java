package com.exercise.database.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="gym")
public class Gym extends BaseEntity<Serializable> {

	private static final long serialVersionUID = -4612705913154560044L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Long id;

	private String address;

	private String city;

	@Column(name="name")
	@NotBlank
	private String name;

	@Column(name="latitude", columnDefinition="Decimal(19,7)")
	@NotNull
	private BigDecimal latitude;

	@Column(name="longitude", columnDefinition="Decimal(19,7)")
	@NotNull
	private BigDecimal longitude;

	private String state;

	@Column(name="email")
	private String email;
	
	private String website;
	
	@Column(name="is_delete")
	private Boolean isDelete; 
	
	@Column(name="zipcode")
	private String zipCode; 
	
	@Column(name="country")
	private String country; 
	
	@Column(name="contact")
	private String contact; 
	
	@Column(name="video_url")
	private String videoUrl; 
	
	@Column(name = "image_path")
	private String imagePath;
	
	@Column(name = "description",columnDefinition="TEXT")
	@NotEmpty(message = "Please provide description")
	private String description;
	
	@Column(name = "aerobic")
	private boolean aerobic;
	
	@Column(name = "dance")
	private boolean dance;
	
	@Column(name = "fitness")
	private boolean fitness;
	
	@Column(name = "pilates")
	private boolean pilates;
	
	@Column(name = "weight_lifting")
	private boolean weightLifting;
	
	@Column(name = "yoga")
	private boolean yoga;
	
	public Gym() {
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
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
	public void setCreatedDatetime(Date createdDatetime) {
		this.createdDatetime = createdDatetime;
	}

	public void setModifiedDatetime(Date modifiedDatetime) {
		this.modifiedDatetime = modifiedDatetime;
	}
	public Date getCreatedDatetime() {
		return createdDatetime;
	}

	public Date getModifiedDatetime() {
		return modifiedDatetime;
	}

	public boolean isAerobic() {
		return aerobic;
	}

	public void setAerobic(boolean aerobic) {
		this.aerobic = aerobic;
	}

	public boolean isDance() {
		return dance;
	}

	public void setDance(boolean dance) {
		this.dance = dance;
	}

	public boolean isFitness() {
		return fitness;
	}

	public void setFitness(boolean fitness) {
		this.fitness = fitness;
	}

	public boolean isPilates() {
		return pilates;
	}

	public void setPilates(boolean pilates) {
		this.pilates = pilates;
	}

	public boolean isWeightLifting() {
		return weightLifting;
	}

	public void setWeightLifting(boolean weightLifting) {
		this.weightLifting = weightLifting;
	}

	public boolean isYoga() {
		return yoga;
	}

	public void setYoga(boolean yoga) {
		this.yoga = yoga;
	}
	
}