package com.mathesh.taskmanagerapp.dto.task;

public class TaskRequest {

    private String title;
    private String description;
    private String status;
    private Long userId;

    public TaskRequest() {}

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public Long getUserId() { return userId; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setUserId(Long userId) { this.userId = userId; }
}