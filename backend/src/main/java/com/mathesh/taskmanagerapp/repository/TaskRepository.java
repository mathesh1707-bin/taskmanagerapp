package com.mathesh.taskmanagerapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mathesh.taskmanagerapp.model.Task;
import com.mathesh.taskmanagerapp.model.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);
}