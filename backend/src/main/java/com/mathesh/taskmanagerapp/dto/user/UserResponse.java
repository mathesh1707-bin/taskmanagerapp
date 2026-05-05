package com.mathesh.taskmanagerapp.dto.user;

public class UserResponse {
    private Long userId;
    private String username;

    public UserResponse(Long userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

}
