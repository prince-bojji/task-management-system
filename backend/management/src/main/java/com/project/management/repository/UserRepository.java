package com.project.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.management.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
}
