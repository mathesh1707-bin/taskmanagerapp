package com.mathesh.taskmanagerapp.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mathesh.taskmanagerapp.dto.task.TaskRequest;
import com.mathesh.taskmanagerapp.dto.task.TaskResponse;
import com.mathesh.taskmanagerapp.model.Task;
import com.mathesh.taskmanagerapp.service.TaskService;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<TaskResponse> getTasks() {
        return service.getAllTasks();
    }

    @PostMapping
    public TaskResponse saveTask(@RequestBody TaskRequest request) {
        return service.saveTask(request);
    }

    @GetMapping("/{taskId}")
    public TaskResponse getTask(@PathVariable Long taskId) {
        return service.findById(taskId);
    }

    @PutMapping("/{taskId}")
    public TaskResponse updateTask(@PathVariable Long taskId,@RequestBody TaskRequest request) {
        return service.updateTask(taskId, request);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        service.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
    
