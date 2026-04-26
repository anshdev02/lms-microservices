package com.lms.user_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.user_service.entity.User;   // ✅ THIS IMPORT IS REQUIRED

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
