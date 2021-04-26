package com.exercise.services.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.StringJoiner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.exercise.database.entities.Gym;
import com.exercise.database.entities.GymGallery;
import com.exercise.model.ResponseGenerator;
import com.exercise.repository.GymGalleryRepository;
import com.exercise.repository.GymRepository;
import com.exercise.responseDTO.GymDetailResponse;
import com.exercise.responseDTO.GymListResponse;
import com.exercise.responseDTO.MapLocationsDetails;
import com.exercise.services.GymService;
import com.exercise.utils.HaversineDistance;
import com.exercise.utils.Response;
import com.exercise.utils.Utils;

@Service
public class GymServiceImpl implements GymService {

	@Autowired
	GymRepository gymRepository;
	
	@Autowired
	GymGalleryRepository gymGalleryRepository;

	@Override
	public List<GymListResponse> getGymListByCity(BigDecimal lattitude, BigDecimal longittude) {
		List<GymListResponse> gymListResponses = new ArrayList<GymListResponse>();
		List<Gym> gyms = gymRepository.findAllByLatAndLong(lattitude,longittude,lattitude,longittude);
		
		if(CollectionUtils.isEmpty(gyms)) {
			return null;
		}else {
				
			for(Gym gym : gyms) {
					
				GymListResponse gymListResponse = new GymListResponse();
				gymListResponse.setCity(gym.getCity());
				gymListResponse.setDescription(gym.getDescription());
				gymListResponse.setId(gym.getId());
				gymListResponse.setImagePath(gym.getImagePath());
				gymListResponse.setName(gym.getName());
				gymListResponse.setAddress(gym.getAddress());
					
				Double distence = HaversineDistance.getDistanceBetweenTwoPoints(lattitude.doubleValue(), longittude.doubleValue(), gym.getLatitude().doubleValue(), gym.getLongitude().doubleValue());
				gymListResponse.setDistanceInFormate(Utils.getMiles(new BigDecimal(distence)));
				gymListResponse.setDistance(new BigDecimal(distence));
				
				gymListResponse.setLatitude(gym.getLatitude());
				gymListResponse.setLongitude(gym.getLongitude());
				
				StringJoiner joiner = new StringJoiner(", ");
				if(gym.isAerobic())
					joiner.add("Aerobic");
				if(gym.isDance())
					joiner.add("Dance");
				if(gym.isFitness())
					joiner.add("Fitness");
				if(gym.isPilates())
					joiner.add("Pilates");
				if(gym.isWeightLifting())
					joiner.add("Weight Lifting");
				if(gym.isYoga())
					joiner.add("Yoga");
				gymListResponse.setFacilities(joiner.toString());
					
				gymListResponses.add(gymListResponse);
			}
		}	
		gymListResponses.sort(Comparator.comparing(GymListResponse::getDistance,Comparator.nullsLast(Comparator.naturalOrder())));
		return gymListResponses;
	}

	@Override
	public MapLocationsDetails getMapLocationDetails(Long gymId) {
		MapLocationsDetails mapLocationsDetails = new MapLocationsDetails();
		
		Gym gym = gymRepository.findById(gymId).get();
		mapLocationsDetails.setAddress(gym.getAddress());
		mapLocationsDetails.setGymId(gymId);
		mapLocationsDetails.setName(gym.getName());
		
		return mapLocationsDetails;
	}

	@Override
	public ResponseEntity<Response> getGymDetails(Long gymId) {
		Optional<Gym> optional = gymRepository.findById(gymId);
		
		if(!optional.isPresent())
			return ResponseGenerator.generateResponse(new Response("gym.not.exist", null), HttpStatus.BAD_REQUEST);
		
		Gym gym = optional.get();
		GymDetailResponse gymDetailResponse = new GymDetailResponse();
		gymDetailResponse.setAddress(gym.getAddress());
		gymDetailResponse.setCity(gym.getCity());
		gymDetailResponse.setContact(gym.getContact());
		gymDetailResponse.setCountry(gym.getCountry());
		gymDetailResponse.setDescription(gym.getDescription());
		gymDetailResponse.setEmail(gym.getEmail());
		
		gymDetailResponse.setId(gym.getId());
		gymDetailResponse.setImagePath(gym.getImagePath());
		gymDetailResponse.setLatitude(gym.getLatitude());
		gymDetailResponse.setLongitude(gym.getLongitude());
		gymDetailResponse.setName(gym.getName());
		gymDetailResponse.setState(gym.getState());
		
		if(!StringUtils.isEmpty(gym.getVideoUrl())) {
			if(gym.getVideoUrl().contains("/playlist?"))
				gymDetailResponse.setVideoUrl(gym.getVideoUrl().replace("playlist", "embed/videoseries"));
			if(gym.getVideoUrl().contains("/watch?v="))
				gymDetailResponse.setVideoUrl(gym.getVideoUrl().replace("watch?v=", "embed/"));
		}
		
		gymDetailResponse.setWebsite(gym.getWebsite());
		gymDetailResponse.setZipCode(gym.getZipCode());
		
		StringJoiner joiner = new StringJoiner(", ");
		if(gym.isAerobic())
			joiner.add("Aerobic");
		if(gym.isDance())
			joiner.add("Dance");
		if(gym.isFitness())
			joiner.add("Fitness");
		if(gym.isPilates())
			joiner.add("Pilates");
		if(gym.isWeightLifting())
			joiner.add("Weight Lifting");
		if(gym.isYoga())
			joiner.add("Yoga");
		
		gymDetailResponse.setFacilities(joiner.toString());
		
		List<GymGallery> galleries = gymGalleryRepository.findByGymId(gymId);
		List<String> list = new ArrayList<>();
		if(!CollectionUtils.isEmpty(galleries)) {
			for (GymGallery gymGallery : galleries) {
				list.add(gymGallery.getImagePath());
			}
			gymDetailResponse.setGalleryImages(list);
		}
		
		return ResponseGenerator.generateResponse(new Response("gym.details", gymDetailResponse), HttpStatus.OK);
	}
	

}
