package com.Spring.Oauthdemo.repo;

import com.Spring.Oauthdemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // You can add custom query methods here if needed
}
