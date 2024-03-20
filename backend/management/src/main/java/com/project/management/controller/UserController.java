/**
 * Controller for managing user-related HTTP requests.
 */

package com.project.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.management.entity.User;
import com.project.management.service.UserService;

@RestController
@RequestMapping("api/users")
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private  UserService  userService;

    /**
     * Adds a new user to the system.
     *
     * @param user The user object to be added.
     * @return The added user object.
     */
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        User savedUser  = userService.addUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

     /**
     * Retrieves all users from the system.
     *
     * @return List of all users.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users= userService.findAllUser();
        return ResponseEntity.ok(users);
    }

    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id The unique identifier of the user.
     * @return The user object.
     */
    @GetMapping("{id}")
    public  ResponseEntity<User> getUserByID(@PathVariable("id") long id){
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Updates an existing user's information.
     *
     * @param id The unique identifier of the user to be updated.
     * @param updatedUser The updated user object.
     * @return The updated user object.
     */
    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id , @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    /**
     * Deletes a user from the system.
     *
     * @param id The unique identifier of the user to be deleted.
     * @return A message indicating the success of the operation.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
