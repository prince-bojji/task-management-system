/**
 * Controller for managing project-related HTTP requests.
 */

package com.project.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.management.entity.Project;
import com.project.management.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    /**
     * Adds a new project to the system.
     *
     * @param project The project object to be added.
     * @return The added project object.
     */
    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project project){
        Project addProject = projectService.addProject(project);
        return new ResponseEntity<>(addProject, HttpStatus.CREATED);
    }

    /**
     * Assigns a project to a user.
     *
     * @param projectId The unique identifier of the project to be assigned.
     * @param userId The unique identifier of the user to whom the project will be assigned.
     * @return The assigned project object.
     */
    @PostMapping("/{projectId}/assign/{userId}")
    public ResponseEntity<Project> assignProject(@PathVariable("projectId") long projectId, @PathVariable("userId") long userId){
        Project assignedProject = projectService.assignProject(projectId, userId);
        return ResponseEntity.ok(assignedProject);
    }

    /**
     * Retrieves all projects from the system.
     *
     * @return List of all projects.
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(){
        List<Project> projects = projectService.findAllProjects();
        return ResponseEntity.ok(projects);
    }

    /**
     * Retrieves a project by its unique identifier.
     *
     * @param id The unique identifier of the project.
     * @return The project object.
     */
    @GetMapping("{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") long id) {
        Project project = projectService.findProjectById(id);
        return ResponseEntity.ok(project);
    } 

    /**
     * Updates an existing project's information.
     *
     * @param id The unique identifier of the project to be updated.
     * @param updatedProject The updated project object.
     * @return The updated project object.
     */
    @PutMapping("{id}")
    public ResponseEntity<Project> updateProject(@PathVariable("id") long id, @RequestBody  Project updatedProject) {
        Project project = projectService.updateProject(id, updatedProject);
        return ResponseEntity.ok(project);
    }

    /**
     * Removes a collaborator from a project.
     *
     * @param id The unique identifier of the project from which the collaborator will be removed.
     * @return The project object after removing the collaborator.
     */
    @PostMapping("{id}/remove")
    public ResponseEntity<Project> removeCollaborator(@PathVariable("id") long id){
        Project removeCollaborator = projectService.removeCollaborator(id);
        return ResponseEntity.ok(removeCollaborator);
    }

    /**
     * Deletes a project from the system.
     *
     * @param id The unique identifier of the project to be deleted.
     * @return A message indicating the success of the operation.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProject(@PathVariable("id") long id){
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully.");
    }
}
