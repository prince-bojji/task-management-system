package com.project.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.management.entity.Admin;
import com.project.management.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * Retrieves all admin from the system.
     *
     * @return List of all admin.
     */
    public List<Admin> findAllAdmin() {
        return adminRepository.findAll();
    }

     public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
