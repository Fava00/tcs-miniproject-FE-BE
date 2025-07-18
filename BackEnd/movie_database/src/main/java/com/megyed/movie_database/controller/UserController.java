package com.megyed.movie_database.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.megyed.movie_database.dao.AppUserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/me")
public class UserController {

    private AppUserRepository userRepository;

    UserController(AppUserRepository userRepo) {
        this.userRepository = userRepo;
    }

    @GetMapping("/data")
    public Map<String, Object> getCurrentUser(HttpSession session) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", session.getAttribute("currentUser"));
        userMap.put("role", session.getAttribute("currentRole"));
        return userMap;
    }
}
