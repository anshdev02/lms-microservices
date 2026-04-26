package com.lms.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.auth_service.dto.LoginRequest;
import com.lms.auth_service.dto.LoginResponse;
import com.lms.auth_service.entity.User;
import com.lms.auth_service.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByUsernameAndPassword(
                        request.getUsername(),
                        request.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        return new LoginResponse(
                user.getId(),
                user.getRole(),
                "LOGIN SUCCESS");
    }

    public LoginResponse register(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        
        User savedUser = userRepository.save(user);
        
        return new LoginResponse(
                savedUser.getId(),
                savedUser.getRole(),
                "REGISTRATION SUCCESS");
    }
}
