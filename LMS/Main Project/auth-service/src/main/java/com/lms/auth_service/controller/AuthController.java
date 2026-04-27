package com.lms.auth_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.auth_service.dto.LoginRequest;
import com.lms.auth_service.dto.LoginResponse;
import com.lms.auth_service.entity.User;
import com.lms.auth_service.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public LoginResponse register(@RequestBody User user) {
        return authService.register(user);
    }
}
