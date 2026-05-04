package com.mathesh.taskmanagerapp;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestConrtoller {
    @GetMapping("/")
    public String home() {
        return "Task Manager Backend Running 🚀";
    }
    
}
