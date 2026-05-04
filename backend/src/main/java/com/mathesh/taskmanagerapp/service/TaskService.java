package com.mathesh.taskmanagerapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mathesh.taskmanagerapp.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo=repo;
    }
    
}
