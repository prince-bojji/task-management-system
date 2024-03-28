/**
 * Service class for admin-related operations.
 */

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
     * Retrieve admin from the system.
     *
     * @return List of admin.
     */
    public List<Admin> findAllAdmin() {
        return adminRepository.findAll();
    }

    /**
     * Adds a admin to the system.
     *
     * @param admin The admin object to be added.
     * @return The added admin object.
     */
     public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
