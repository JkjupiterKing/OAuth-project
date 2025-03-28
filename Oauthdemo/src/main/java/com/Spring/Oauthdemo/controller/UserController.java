package com.Spring.Oauthdemo.controller;

import com.Spring.Oauthdemo.repo.UserRepo;
import com.Spring.Oauthdemo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/user")
    public User getUserDetails() {
        // This is an example; you can retrieve user details from your DB or session
        return userRepo.findById(1L).orElse(null); // Replace with proper logic
    }
}
