package com.project.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.management.repository.UserRepository;

/**
 * Service class implementing Spring Security's UserDetailsService interface.
 * This class is responsible for loading user details from the database based on the username (email).
 */

@Service
public class UserDetailsAuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves user details from the database based on the username (email).
     *
     * @param username The username (email) of the user to load.
     * @return UserDetails object containing user information.
     * @throws UsernameNotFoundException If no user with the given username is found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return userRepository.findByEmail(username)
               .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
