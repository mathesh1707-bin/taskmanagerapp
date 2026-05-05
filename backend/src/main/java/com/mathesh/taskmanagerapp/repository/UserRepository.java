package com.mathesh.taskmanagerapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mathesh.taskmanagerapp.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
