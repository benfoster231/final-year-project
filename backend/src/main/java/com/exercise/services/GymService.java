package com.exercise.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.exercise.responseDTO.GymListResponse;
import com.exercise.responseDTO.MapLocationsDetails;
import com.exercise.utils.Response;

public interface GymService {

	List<GymListResponse> getGymListByCity(BigDecimal lattitude, BigDecimal longittude);

	MapLocationsDetails getMapLocationDetails(Long gymId);

	ResponseEntity<Response> getGymDetails(Long gymId);


}
