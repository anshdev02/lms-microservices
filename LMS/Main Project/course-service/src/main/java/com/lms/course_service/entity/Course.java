package com.lms.course_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    private String title;
    private String description;
    private String duration; // Changed to String to match frontend
    
    @Column(columnDefinition = "TEXT")
    private String content; // JSON string containing images, videos, notes

    private Long instructorId; // user-service instructor ID

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    // For frontend compatibility
    public Long getId() { return courseId; }
    public void setId(Long id) { this.courseId = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }
}
