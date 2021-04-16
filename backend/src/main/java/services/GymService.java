package services;

import java.math.BigDecimal;
import java.util.List;

import com.exercise.responseDTO.GymListResponse;
import com.exercise.responseDTO.MapLocationsDetails;

public interface GymService {

	List<GymListResponse> getGymListByCity(BigDecimal lattitude, BigDecimal longittude);

	MapLocationsDetails getMapLocationDetails(Long gymId);


}
