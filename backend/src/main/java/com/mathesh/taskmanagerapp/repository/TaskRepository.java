package com.mathesh.taskmanagerapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mathesh.taskmanagerapp.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
