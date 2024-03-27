package com.project.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.management.entity.Admin;
import com.project.management.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    
     /**
     * Retrieves all admin from the system.
     *
     * @return List of all admin.
     */
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmin(){
        List<Admin> admin = adminService.findAllAdmin();
        return ResponseEntity.ok(admin);
    }

    @PostMapping
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin){
        Admin savedAdmin  = adminService.addAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }
}
