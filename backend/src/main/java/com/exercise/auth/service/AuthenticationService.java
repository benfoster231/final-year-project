package com.exercise.auth.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.exercise.database.entities.User;
import com.exercise.enums.Role;
import com.exercise.repository.UserRepository;

@Service("authenticationService")
public class AuthenticationService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(userId);
		if(user == null)
			throw new UsernameNotFoundException("Invalid username or password.");
		
		List<Role> roles = new ArrayList<>();
			roles.add(user.getRole());
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true, true, true, true, getAuthority(user));
	}

	private Collection<? extends GrantedAuthority> getAuthority(User user) {
		List<Role> roles = new ArrayList<>();
		roles.add(user.getRole());
		
		List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
		if(CollectionUtils.isEmpty(roles))
			return null;
		for (Role userRole : roles) {
			grantedAuths.add(new SimpleGrantedAuthority(userRole.name()));
		}
	    return grantedAuths;
	}
}
