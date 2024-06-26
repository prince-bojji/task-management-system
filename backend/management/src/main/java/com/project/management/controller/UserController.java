package com.project.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.project.management.dto.ReqRes;
import com.project.management.entity.User;
import com.project.management.service.UserService;

/**
 * Controller class for handling user management related HTTP requests.
 */

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Endpoint for user registration.
     *
     * @param reg The registration request containing user details.
     * @return ResponseEntity containing the registration response.
     */
    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        return ResponseEntity.ok(userService.register(reg));
    }

    /**
     * Endpoint for user login.
     *
     * @param req The login request containing user credentials.
     * @return ResponseEntity containing the login response.
     */
    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(userService.login(req));
    }

    /**
     * Endpoint for refreshing authentication token.
     *
     * @param req The refresh token request containing user token.
     * @return ResponseEntity containing the refreshed token response.
     */
    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(userService.refreshToken(req));
    }

    /**
     * Endpoint for retrieving all users.
     *
     * @return ResponseEntity containing all users information.
     */
    @GetMapping("/admin/get-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Endpoint for retrieving a user by ID.
     *
     * @param userId The unique identifier of the user.
     * @return ResponseEntity containing the user information.
     */
    @GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<ReqRes> getUserByID(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.getUsersById(userId));
    }

    /**
     * Endpoint for updating a user's information.
     *
     * @param userId The unique identifier of the user to be updated.
     * @param reqres The updated user information.
     * @return ResponseEntity containing the updated user information.
     */
    @PutMapping("/admin/update-user/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody User reqres){
        return ResponseEntity.ok(userService.updateUser(userId, reqres));
    }

    /**
     * Endpoint for retrieving the profile of the currently logged-in user.
     *
     * @return ResponseEntity containing the profile information of the logged-in user.
     */
    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    /**
     * Endpoint for deleting a user.
     *
     * @param userId The unique identifier of the user to be deleted.
     * @return ResponseEntity indicating the success of the delete operation.
     */
    @DeleteMapping("/admin/delete-user/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }
}
