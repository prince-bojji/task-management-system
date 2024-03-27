package com.project.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.management.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{
}

