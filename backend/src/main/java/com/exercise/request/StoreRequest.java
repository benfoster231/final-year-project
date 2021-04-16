package com.exercise.request;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class StoreRequest {

	private Integer id;
	
	private Integer userId;
	
	private String storeTypeCode;
	
	private String websiteUrl;
	
	private String italianDesc;
	
	private String englishDesc;
	
	private Boolean flgEnabledUpgradeShop;

	private Boolean flgSponsorLavazza;
	 
	private String pictureMimeType;
	
	@NotBlank(message = "Please provide store name italian")
	private String nameIt;
	
	@NotBlank(message = "Please provide store name english")
	private String nameEn;

	@NotNull(message = "Please select location")
	private BigDecimal latitudeSigned;

	@NotNull(message = "Please select location")
	private BigDecimal longitudeSigned;

	private String state;
	
	private String address;

	private String city;

	private String email;
	
	private String telephoneNumber;
	
	private String imagePath;
	
	private List<String> photoGallryImg;
	
	private Boolean isOff = false;
	
	private Boolean vegetarian; 
	
	private Boolean vegan; 
	
	private Boolean glutenFree; 
	
	private Boolean fish; 
	
	private Boolean meat; 
	
	private Boolean delivery; 
	
	private Boolean ig; 
	
	private Boolean fb; 
	
	private Boolean sandwichesAndKitchen; 
	
//	private String authenticatedSandwich; 
	
	private String zipCode; 
	
	private String country; 
	
	private String kitchen; 
	
	private String services; 
	
	private String ranking; 
	
//	private String promo; 
	
	private String occasione; 
	
	private Boolean soloPanini; 
	
	private String announcements; 
	
//	private String mostClicked; 
	
	private String prefix; 
	
	private Boolean vetrofaniaCensito; 
	
	private String certif2018; 
	
	private String certif2019; 
	
	private String certif2020; 
	
	private String mon;
	private String tue;
	private String wed;
	private String thu;
	private String fri;
	private String sat;
	private String sun;
	
	private String lun ; 
	private String mar ; 
	private String mer ; 
	private String gio ; 
	private String ven ; 
	private String sab ; 
	private String dom ; 
	
	public String getPictureMimeType() {
		return pictureMimeType;
	}

	public void setPictureMimeType(String pictureMimeType) {
		this.pictureMimeType = pictureMimeType;
	}

	public Integer getId() {
		return id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getStoreTypeCode() {
		return storeTypeCode;
	}

	public String getItalianDesc() {
		return italianDesc;
	}

	public String getEnglishDesc() {
		return englishDesc;
	}

	public void setStoreTypeCode(String storeTypeCode) {
		this.storeTypeCode = storeTypeCode;
	}
	
	public String getWebsiteUrl() {
		return websiteUrl;
	}

	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}

	public void setItalianDesc(String italianDesc) {
		this.italianDesc = italianDesc;
	}

	public void setEnglishDesc(String englishDesc) {
		this.englishDesc = englishDesc;
	}

	public Boolean getFlgSponsorLavazza() {
		return flgSponsorLavazza;
	}

	public void setFlgSponsorLavazza(Boolean flgSponsorLavazza) {
		this.flgSponsorLavazza = flgSponsorLavazza;
	}

	public String getNameIt() {
		return nameIt;
	}

	public void setNameIt(String nameIt) {
		this.nameIt = nameIt;
	}

	public String getNameEn() {
		return nameEn;
	}

	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}

	public BigDecimal getLatitudeSigned() {
		return latitudeSigned;
	}

	public void setLatitudeSigned(BigDecimal latitudeSigned) {
		this.latitudeSigned = latitudeSigned;
	}

	public BigDecimal getLongitudeSigned() {
		return longitudeSigned;
	}

	public void setLongitudeSigned(BigDecimal longitudeSigned) {
		this.longitudeSigned = longitudeSigned;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephoneNumber() {
		return telephoneNumber;
	}

	public void setTelephoneNumber(String telephoneNumber) {
		this.telephoneNumber = telephoneNumber;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public List<String> getPhotoGallryImg() {
		return photoGallryImg;
	}

	public void setPhotoGallryImg(List<String> photoGallryImg) {
		this.photoGallryImg = photoGallryImg;
	}

	public Boolean getIsOff() {
		return isOff;
	}

	public void setIsOff(Boolean isOff) {
		this.isOff = isOff;
	}

	public Boolean getFlgEnabledUpgradeShop() {
		return flgEnabledUpgradeShop;
	}

	public void setFlgEnabledUpgradeShop(Boolean flgEnabledUpgradeShop) {
		this.flgEnabledUpgradeShop = flgEnabledUpgradeShop;
	}

	public Boolean getVegetarian() {
		return vegetarian;
	}

	public void setVegetarian(Boolean vegetarian) {
		this.vegetarian = vegetarian;
	}

	public Boolean getVegan() {
		return vegan;
	}

	public void setVegan(Boolean vegan) {
		this.vegan = vegan;
	}

	public Boolean getGlutenFree() {
		return glutenFree;
	}

	public void setGlutenFree(Boolean glutenFree) {
		this.glutenFree = glutenFree;
	}

	public Boolean getFish() {
		return fish;
	}

	public void setFish(Boolean fish) {
		this.fish = fish;
	}

	public Boolean getMeat() {
		return meat;
	}

	public void setMeat(Boolean meat) {
		this.meat = meat;
	}

	public Boolean getDelivery() {
		return delivery;
	}

	public void setDelivery(Boolean delivery) {
		this.delivery = delivery;
	}

	public Boolean getIg() {
		return ig;
	}

	public void setIg(Boolean ig) {
		this.ig = ig;
	}

	public Boolean getFb() {
		return fb;
	}

	public void setFb(Boolean fb) {
		this.fb = fb;
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

	public String getOccasione() {
		return occasione;
	}

	public void setOccasione(String occasione) {
		this.occasione = occasione;
	}

	public Boolean getSoloPanini() {
		return soloPanini;
	}

	public void setSoloPanini(Boolean soloPanini) {
		this.soloPanini = soloPanini;
	}

	public String getAnnouncements() {
		return announcements;
	}

	public void setAnnouncements(String announcements) {
		this.announcements = announcements;
	}

	public Boolean getSandwichesAndKitchen() {
		return sandwichesAndKitchen;
	}

	public void setSandwichesAndKitchen(Boolean sandwichesAndKitchen) {
		this.sandwichesAndKitchen = sandwichesAndKitchen;
	}

	public String getKitchen() {
		return kitchen;
	}

	public void setKitchen(String kitchen) {
		this.kitchen = kitchen;
	}

	public String getServices() {
		return services;
	}

	public void setServices(String services) {
		this.services = services;
	}

	public String getRanking() {
		return ranking;
	}

	public void setRanking(String ranking) {
		this.ranking = ranking;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public Boolean getVetrofaniaCensito() {
		return vetrofaniaCensito;
	}

	public void setVetrofaniaCensito(Boolean vetrofaniaCensito) {
		this.vetrofaniaCensito = vetrofaniaCensito;
	}

	public String getCertif2018() {
		return certif2018;
	}

	public void setCertif2018(String certif2018) {
		this.certif2018 = certif2018;
	}

	public String getCertif2019() {
		return certif2019;
	}

	public void setCertif2019(String certif2019) {
		this.certif2019 = certif2019;
	}

	public String getCertif2020() {
		return certif2020;
	}

	public void setCertif2020(String certif2020) {
		this.certif2020 = certif2020;
	}

	public String getMon() {
		return mon;
	}

	public void setMon(String mon) {
		this.mon = mon;
	}

	public String getTue() {
		return tue;
	}

	public void setTue(String tue) {
		this.tue = tue;
	}

	public String getWed() {
		return wed;
	}

	public void setWed(String wed) {
		this.wed = wed;
	}

	public String getThu() {
		return thu;
	}

	public void setThu(String thu) {
		this.thu = thu;
	}

	public String getFri() {
		return fri;
	}

	public void setFri(String fri) {
		this.fri = fri;
	}

	public String getSat() {
		return sat;
	}

	public void setSat(String sat) {
		this.sat = sat;
	}

	public String getSun() {
		return sun;
	}

	public void setSun(String sun) {
		this.sun = sun;
	}

	public String getLun() {
		return lun;
	}

	public void setLun(String lun) {
		this.lun = lun;
	}

	public String getMar() {
		return mar;
	}

	public void setMar(String mar) {
		this.mar = mar;
	}

	public String getMer() {
		return mer;
	}

	public void setMer(String mer) {
		this.mer = mer;
	}

	public String getGio() {
		return gio;
	}

	public void setGio(String gio) {
		this.gio = gio;
	}

	public String getVen() {
		return ven;
	}

	public void setVen(String ven) {
		this.ven = ven;
	}

	public String getSab() {
		return sab;
	}

	public void setSab(String sab) {
		this.sab = sab;
	}

	public String getDom() {
		return dom;
	}

	public void setDom(String dom) {
		this.dom = dom;
	}

}
