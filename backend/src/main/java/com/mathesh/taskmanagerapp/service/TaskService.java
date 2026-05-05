package com.mathesh.taskmanagerapp.service;

import java.util.List;


import org.springframework.stereotype.Service;

import com.mathesh.taskmanagerapp.model.Task;
import com.mathesh.taskmanagerapp.repository.TaskRepository;

@Service
public class TaskService {
    
    private TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }
    
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task saveTask(Task task) {
        return repo.save(task);
    }

    public Task findById(Long taskId) {
        return repo.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task updateTask(Long taskId, Task task) {
        Task existing = repo.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found for updating"));
        existing.setDescription(task.getDescription());
        existing.setStatus(task.getStatus());
        existing.setTitle(task.getTitle());
        return repo.save(existing);
    }
    
    public void deleteTask(Long taskId) {
        if (!repo.existsById(taskId)){
            throw new RuntimeException("Task not found");
        }
        repo.deleteById(taskId); 
    }

}
