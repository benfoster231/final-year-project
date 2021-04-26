package com.exercise.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.exercise.database.entities.CalculationHistory;
import com.exercise.database.entities.User;
import com.exercise.enums.Calculation;

public interface CalculationHistoryRepository extends CrudRepository<CalculationHistory, Long> {

	List<CalculationHistory> findByUser(User user);

	List<CalculationHistory> findByUserAndCalculation(User user, Calculation calculation);

}
