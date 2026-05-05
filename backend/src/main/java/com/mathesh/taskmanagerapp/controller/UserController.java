package com.mathesh.taskmanagerapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mathesh.taskmanagerapp.dto.user.*;
import com.mathesh.taskmanagerapp.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    @GetMapping
    public List<UserResponse> getUsers() {
        return service.getAllUsers();
    }
}
