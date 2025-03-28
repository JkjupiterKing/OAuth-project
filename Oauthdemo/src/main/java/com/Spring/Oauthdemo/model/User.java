package com.Spring.Oauthdemo.model;

import jakarta.persistence.*;
import lombok.*;

import java.security.SecureRandom;

@Entity
@Table(name = "User")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
    public String getEmail() {
        return email;
    }

}
