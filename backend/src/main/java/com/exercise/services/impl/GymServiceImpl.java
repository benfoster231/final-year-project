package com.exercise.services.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.exercise.database.entities.Gym;
import com.exercise.repository.GymRepository;
import com.exercise.responseDTO.GymListResponse;
import com.exercise.responseDTO.MapLocationsDetails;
import com.exercise.utils.HaversineDistance;
import com.exercise.utils.Utils;

import services.GymService;

@Service
public class GymServiceImpl implements GymService {

	@Autowired
	GymRepository gymRepository;

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
	

}
