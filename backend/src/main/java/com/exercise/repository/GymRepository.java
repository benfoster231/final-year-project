package com.exercise.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.exercise.database.entities.Gym;
import com.exercise.responseDTO.GymResponse;

@Repository
public interface GymRepository extends CrudRepository<Gym, Long> {

	@Query(value = "select new com.exercise.responseDTO.GymResponse (b.id, b.name, b.createdDatetime, b.imagePath, b.address) from Gym b order by b.createdDatetime desc")
	List<GymResponse> findAllByDesc();

	Gym findByName(String name);
	
	@Query(value = "select * from gym cs where ( 3959 * acos ( cos ( radians(:cityCenterLatitudeSigned) ) * cos( radians( cs.latitude ) ) * cos( radians( cs.longitude ) - radians(:cityCenterLongitudeSigned) ) + sin ( radians(:cityCenterLatitudeSigned) ) * sin( radians( cs.latitude ) ) ) ) <1000 \r\n" + 
			"Order by ( 3959 * acos ( cos ( radians(:latitudeSigned) ) * cos( radians( cs.latitude ) ) * cos( radians( cs.longitude ) - radians(:longitudeSigned) ) + sin ( radians(:latitudeSigned) ) * sin( radians( cs.latitude ) ) ) )",nativeQuery=true)
	public List<Gym> findAllByLatAndLong(@Param("cityCenterLatitudeSigned") BigDecimal cityCenterLatitudeSigned,
			@Param("cityCenterLongitudeSigned")BigDecimal cityCenterLongitudeSigned,
			@Param("latitudeSigned") BigDecimal latitudeSigned,
			@Param("longitudeSigned") BigDecimal longitudeSigned);

}
