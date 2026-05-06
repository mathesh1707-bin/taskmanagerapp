package com.mathesh.taskmanagerapp.dto.task;

public class TaskResponse {

    private Long taskId;
    private String title;
    private String description;
    private String status;
    private Long userId;

    public TaskResponse(Long taskId, String title, String description, String status, Long userId) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.userId = userId;
    }

    public Long getTaskId() { return taskId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public Long getUserId() { return userId; }
}