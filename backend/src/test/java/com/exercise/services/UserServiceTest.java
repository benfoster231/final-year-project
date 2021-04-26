package com.exercise.services;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.exercise.database.entities.User;
import com.exercise.enums.Role;
import com.exercise.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
	
	@Autowired
	UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void shoudCheckUserSave() {
		User exist = userRepository.findByEmail("benfoster231@gmail.com");
		if(exist == null) {
			User user = new User();
			user.setEmail("benfoster231@gmail.com");
			user.setRole(Role.ROLE_USER);
			user.setName("benfoster");
			user.setPassword(bcryptEncoder.encode("Ben12345"));
			
			userRepository.save(user);
			System.out.println("Save user");
			System.out.println(user);
		} else {
			Assert.assertNotNull(exist);
			System.out.println("User already exist");
		}
	}
	
	@Test
	public void findUserByEmail() {
		User user = userRepository.findByEmail("benfoster231@gmail.com");
		Assert.assertNotNull(user);
	}
	
	
}
