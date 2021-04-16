package com.exercise.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exercise.database.entities.GymGallery;

@Repository
public interface GymGalleryRepository extends CrudRepository<GymGallery, Long> {

	@Transactional
	@Modifying
	void deleteByGymId(Long id);

	List<GymGallery> findByGymId(Long id);

}
