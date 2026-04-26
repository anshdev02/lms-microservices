package com.lms.assessment_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assessmentId;

    private String title;
    private String description;
    private Long courseId;
    private Long instructorId;
    
    @Column(columnDefinition = "TEXT")
    private String questions; // JSON string containing questions

    public Long getAssessmentId() { return assessmentId; }
    public void setAssessmentId(Long assessmentId) { this.assessmentId = assessmentId; }

    public Long getId() { return assessmentId; }
    public void setId(Long id) { this.assessmentId = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }

    public String getQuestions() { return questions; }
    public void setQuestions(String questions) { this.questions = questions; }
}