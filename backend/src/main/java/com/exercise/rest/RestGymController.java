package com.exercise.rest;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.model.ResponseGenerator;
import com.exercise.responseDTO.GymListResponse;
import com.exercise.responseDTO.MapLocationsDetails;
import com.exercise.services.GymService;
import com.exercise.utils.Response;

@RestController
public class RestGymController {
	
	@Autowired
	private GymService gymService;

	@RequestMapping(value="/gym/list",method=RequestMethod.GET)
	public ResponseEntity<Response> getGymList(@RequestParam (name = "lattitude",required=false) BigDecimal lattitude,
														@RequestParam (name = "longittude",required=false) BigDecimal longittude){
		try {
			List<GymListResponse> gymListResponses = gymService.getGymListByCity(lattitude,longittude);
			if(CollectionUtils.isEmpty(gymListResponses))
				return ResponseGenerator.generateResponse(new Response("gym.not.exist", null), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseGenerator.generateResponse(new Response("gym.exist",gymListResponses), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseGenerator.generateResponse(new Response("please.try.again", null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="gym/map/details",method = RequestMethod.GET)
	public ResponseEntity<Response> getGymDetailsOnMap(@RequestParam("gymId") Long gymId){
		
		try {
			MapLocationsDetails mapLocationsDetails = gymService.getMapLocationDetails(gymId);
			return ResponseGenerator.generateResponse(new Response("gym.exist", mapLocationsDetails), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseGenerator.generateResponse(new Response("please.try.again", null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/gym/detail",method = RequestMethod.GET)
	public ResponseEntity<Response> getGymDetails(@RequestParam("gymId") Long gymId){
		
		try {
			return gymService.getGymDetails(gymId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseGenerator.generateResponse(new Response("please.try.again", null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
