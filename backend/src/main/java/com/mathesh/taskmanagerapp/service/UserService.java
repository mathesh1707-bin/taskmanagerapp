package com.mathesh.taskmanagerapp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.mathesh.taskmanagerapp.dto.user.*;
import com.mathesh.taskmanagerapp.exception.BadRequestException;
import com.mathesh.taskmanagerapp.exception.ResourceNotFoundException;
import com.mathesh.taskmanagerapp.model.User;
import com.mathesh.taskmanagerapp.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public UserResponse register(RegisterRequest request) {

        if (repo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User(
            request.getUsername(),
            request.getPassword()
        );

        User saved = repo.save(user);

        return new UserResponse(saved.getUserId(), saved.getUsername());
    }

    public UserResponse login(LoginRequest request) {

        User user = repo.findByUsername(request.getUsername())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("Invalid password");
        }

        return new UserResponse(user.getUserId(), user.getUsername());
    }

    public List<UserResponse> getAllUsers() {
        return repo.findAll().stream()
            .map(u -> new UserResponse(u.getUserId(), u.getUsername()))
            .toList();
    }
}
