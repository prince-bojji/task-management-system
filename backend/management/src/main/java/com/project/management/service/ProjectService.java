/**
 * Service class for project-related operations.
 */

package com.project.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.management.entity.Project;
import com.project.management.entity.User;
import com.project.management.exception.ResourceNotFoundException;
import com.project.management.repository.ProjectRepository;
import com.project.management.repository.UserRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private  UserRepository userRepository;

    /**
     * Adds a new project to the system.
     *
     * @param project The project object to be added.
     * @return The added project object.
     */
    public Project addProject(Project project){
        return projectRepository.save(project);
    }
 
    /**
     * Retrieves all projects from the system.
     *
     * @return List of all projects.
     */
    public List<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    /**
     * Retrieves a project by its unique identifier.
     *
     * @param id The unique identifier of the project.
     * @return The project object.
     * @throws ResourceNotFoundException if the project is not found.
     */
    public Project findProjectById(long id){
        return projectRepository.findById(id).orElseThrow(() -> 
               new ResourceNotFoundException("Project not found with id " + id));
    }

    /**
     * Assigns a project to a user.
     *
     * @param projectId The unique identifier of the project to be assigned.
     * @param userId The unique identifier of the user to whom the project will be assigned.
     * @return The assigned project object.
     */
    public Project assignProject(long projectId, long userId){
        Project project = findProjectById(projectId);
        User user = userRepository.findById(userId).orElseThrow(() -> 
                    new ResourceNotFoundException("User not found with id " + userId));

        project.setAssignedUser(user);
        return addProject(project);
    }

    /**
     * Updates an existing project's information.
     *
     * @param id The unique identifier of the project to be updated.
     * @param updatedProject The updated project object.
     * @return The updated project object.
     * @throws ResourceNotFoundException if the project is not found.
     */
    public Project updateProject(long id, Project updatedProject){
        Project project = projectRepository.findById(id).orElseThrow(() -> 
                new ResourceNotFoundException("Project not found with id " + id));

        project.setProjectName(updatedProject.getProjectName());
        project.setProjectDetails(updatedProject.getProjectDetails());
        project.setProjectDeadline(updatedProject.getProjectDeadline());
        project.setProjectStatus(updatedProject.getProjectStatus());

        return projectRepository.save(project);
    }

    /**
     * Removes a collaborator from a project.
     *
     * @param id The unique identifier of the project from which the collaborator will be removed.
     * @return The project object after removing the collaborator.
     * @throws ResourceNotFoundException if the project is not found.
     */
    public Project removeCollaborator(long id){
        Project project = projectRepository.findById(id).orElseThrow(() -> 
                new ResourceNotFoundException("Project not found with id " + id));

        project.setAssignedUser(null);
        return projectRepository.save(project);
    }

    /**
     * Deletes a project from the system.
     *
     * @param id The unique identifier of the project to be deleted.
     * @throws ResourceNotFoundException if the project is not found.
     */
    public void deleteProject(long id){
        @SuppressWarnings("unused")
        Project project = projectRepository.findById(id).orElseThrow(() -> 
                new ResourceNotFoundException("Project not found with id " + id));
        projectRepository.deleteById(id);
    }
}
