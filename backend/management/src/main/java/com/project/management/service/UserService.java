// /**
//  * Service class for user-related operations.
//  */

// package com.project.management.service;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.project.management.entity.User;
// import com.project.management.exception.ResourceNotFoundException;
// import com.project.management.repository.UserRepository;

// @Service
// public class UserService {
    
//     @Autowired
//     private UserRepository userRepository;

//     /**
//      * Adds a new user to the system.
//      *
//      * @param user The user object to be added.
//      * @return The added user object.
//      */
//     public User addUser(User user) {
//         return userRepository.save(user);
//     }

//     /**
//      * Retrieves all users from the system.
//      *
//      * @return List of all users.
//      */
//     public List<User> findAllUser() {
//         return userRepository.findAll();
//     }

//     /**
//      * Retrieves a user by their id.
//      *
//      * @param id The unique identifier of the user.
//      * @return The user object.
//      * @throws ResourceNotFoundException if the user is not found.
//      */
//     public  User getUserById(long id) {
//         return userRepository.findById(id).orElseThrow(() -> 
//                new ResourceNotFoundException("User not found with id " + id));
//     }

//     /**
//      * Updates an existing user's information.
//      *
//      * @param id The unique identifier of the user to be updated.
//      * @param updatedUser The updated user object.
//      * @return The updated user object.
//      * @throws ResourceNotFoundException if the user is not found.
//      */
//     public User updateUser(long id, User updatedUser){
//         User user = userRepository.findById(id).orElseThrow(() -> 
//                     new ResourceNotFoundException("User not found with id " + id));

//         user.setName(updatedUser.getName());
//         user.setContact(updatedUser.getContact());
//         user.setEmail(updatedUser.getEmail());
//         user.setPassword(updatedUser.getPassword());

//         return  userRepository.save(user);
//     }

//     /**
//      * Deletes a user from the system.
//      *
//      * @param id The unique identifier of the user to be deleted.
//      * @throws ResourceNotFoundException if the user is not found.
//      */
//     public void deleteUser(long id) {
//         @SuppressWarnings("unused")
//         User user = userRepository.findById(id).orElseThrow(() -> 
//                     new ResourceNotFoundException("User not found with id " + id));
//         userRepository.deleteById(id);
//     }
// }
