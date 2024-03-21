/**
 * Represents a project entity.
 */

package com.project.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_details")
    private String projectDetails;

    @Column(name = "project_deadline")
    private String projectDeadline;

    @Column(name = "project_status")
    private String projectStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")

    private  User assignedUser;
}
