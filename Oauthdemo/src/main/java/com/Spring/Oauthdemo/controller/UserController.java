package com.Spring.Oauthdemo.controller;

import com.Spring.Oauthdemo.model.User;
import com.Spring.Oauthdemo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.ok("User already exists");
        }
        userRepo.save(user);
        return ResponseEntity.ok("User saved successfully");
    }
}
