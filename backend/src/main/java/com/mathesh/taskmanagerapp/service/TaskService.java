package com.mathesh.taskmanagerapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mathesh.taskmanagerapp.dto.task.TaskRequest;
import com.mathesh.taskmanagerapp.dto.task.TaskResponse;
import com.mathesh.taskmanagerapp.exception.ResourceNotFoundException;
import com.mathesh.taskmanagerapp.model.Task;
import com.mathesh.taskmanagerapp.model.User;
import com.mathesh.taskmanagerapp.repository.TaskRepository;
import com.mathesh.taskmanagerapp.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository repo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // 🔁 ENTITY → DTO
    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
            task.getTaskId(),
            task.getTitle(),
            task.getDescription(),
            task.getStatus(),
            task.getUser().getUserId()
        );
    }

    // 📥 GET ALL
    public List<TaskResponse> getAllTasks() {
        return repo.findAll()
                   .stream()
                   .map(this::mapToResponse)
                   .toList();
    }

    // 📥 GET BY ID
    public TaskResponse findById(Long taskId) {
        Task task = repo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        return mapToResponse(task);
    }

    // ➕ CREATE
    public TaskResponse saveTask(TaskRequest request, String username) {

        User user = userRepo.findByUsername(username)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setUser(user);

        return mapToResponse(repo.save(task));
    }

    // 🔄 UPDATE
    public TaskResponse updateTask(Long taskId,TaskRequest request,String username) {

        Task existing = repo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setStatus(request.getStatus());
        existing.setUser(user);

        return mapToResponse(repo.save(existing));
    }

    // ❌ DELETE
    public void deleteTask(Long taskId) {
        if (!repo.existsById(taskId)) {
            throw new ResourceNotFoundException("Task not found");
        }
        repo.deleteById(taskId);
    }
}