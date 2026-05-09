package com.mathesh.taskmanagerapp.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mathesh.taskmanagerapp.dto.user.*;
import com.mathesh.taskmanagerapp.exception.BadRequestException;
import com.mathesh.taskmanagerapp.exception.ResourceNotFoundException;
import com.mathesh.taskmanagerapp.model.User;
import com.mathesh.taskmanagerapp.repository.UserRepository;
import com.mathesh.taskmanagerapp.security.JwtUtil;

@Service
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder,JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔐 REGISTER
    public UserResponse register(RegisterRequest request) {

    if (repo.existsByUsername(request.getUsername())) {
        throw new BadRequestException("Username already exists");
    }

    User user = new User(
        request.getUsername(),
        passwordEncoder.encode(request.getPassword())
    );

    User saved = repo.save(user);

    return new UserResponse(
        saved.getUserId(),
        saved.getUsername()
    );
}

    // 🔐 LOGIN
   public LoginResponse login(LoginRequest request) {

    User user = repo.findByUsername(request.getUsername())
        .orElseThrow(() ->
            new ResourceNotFoundException("User not found"));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
    )) {
        throw new BadRequestException("Invalid password");
    }

    String token = jwtUtil.generateToken(user.getUsername());

    return new LoginResponse(token);
}
    // 📄 GET ALL USERS
    public List<UserResponse> getAllUsers() {
        return repo.findAll().stream()
                .map(u -> new UserResponse(u.getUserId(), u.getUsername()))
                .toList();
    }
}