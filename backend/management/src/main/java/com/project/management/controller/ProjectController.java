package com.project.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.management.entity.Project;
import com.project.management.service.ProjectService;

import java.util.List;

/**
 * Controller for managing project-related HTTP requests.
 */

@RestController
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    /**
     * Endpoint to add a new project to the system.
     *
     * @param project The project object to be added.
     * @return ResponseEntity containing the added project object and HTTP status.
     */
    @PostMapping("/admin/add-project")
    public ResponseEntity<Project> addProject(@RequestBody Project project){
        Project addedProject = projectService.addProject(project);
        return new ResponseEntity<>(addedProject, HttpStatus.CREATED);
    }

    /**
     * Endpoint to assign a project to a user.
     *
     * @param projectId The unique identifier of the project to be assigned.
     * @param userId The unique identifier of the user to whom the project will be assigned.
     * @return ResponseEntity containing the assigned project object and HTTP status.
     */
    @PostMapping("/admin/{projectId}/assign-project/{userId}")
    public ResponseEntity<Project> assignProject(@PathVariable("projectId") long projectId, @PathVariable("userId") long userId){
        Project assignedProject = projectService.assignProject(projectId, userId);
        return ResponseEntity.ok(assignedProject);
    }

    /**
     * Endpoint to retrieve all projects from the system.
     *
     * @return ResponseEntity containing a list of all projects and HTTP status.
     */
    @GetMapping("/adminuser/projects")
    public ResponseEntity<List<Project>> getAllProjects(){
        List<Project> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    /**
     * Endpoint to retrieve a project by its unique identifier.
     *
     * @param id The unique identifier of the project.
     * @return ResponseEntity containing the project object and HTTP status.
     */
    @GetMapping("/adminuser/project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") long id) {
        Project project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    } 

    /**
     * Endpoint to update an existing project's information.
     *
     * @param id The unique identifier of the project to be updated.
     * @param updatedProject The updated project object.
     * @return ResponseEntity containing the updated project object and HTTP status.
     */
    @PutMapping("/adminuser/update-project/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable("id") long id, @RequestBody  Project updatedProject) {
        Project project = projectService.updateProject(id, updatedProject);
        return ResponseEntity.ok(project);
    }

    /**
     * Endpoint to remove a collaborator from a project.
     *
     * @param id The unique identifier of the project from which the collaborator will be removed.
     * @return ResponseEntity containing the project object after removing the collaborator and HTTP status.
     */
    @PostMapping("/admin/{id}/remove-collaborator")
    public ResponseEntity<Project> removeCollaborator(@PathVariable("id") long id){
        Project updatedProject = projectService.removeCollaborator(id);
        return ResponseEntity.ok(updatedProject);
    }

    /**
     * Endpoint to delete a project from the system.
     *
     * @param id The unique identifier of the project to be deleted.
     * @return ResponseEntity containing a message indicating the success of the delete operation and HTTP status.
     */
    @DeleteMapping("/admin/delete-project/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable("id") long id){
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully.");
    }
}
