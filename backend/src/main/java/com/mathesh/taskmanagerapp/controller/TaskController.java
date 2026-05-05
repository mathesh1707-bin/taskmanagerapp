package com.mathesh.taskmanagerapp.controller;

import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(service.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody Task task) {
        return ResponseEntity.status(201).body(service.saveTask(task));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        return ResponseEntity.ok(service.findById(taskId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return ResponseEntity.ok(service.updateTask(taskId, task));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        service.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
    
