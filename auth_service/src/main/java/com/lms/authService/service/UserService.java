package com.lms.authService.service;

import com.lms.authService.entity.User;

public interface UserService {

    User register(User user);

    User findByUsername(String username);
}