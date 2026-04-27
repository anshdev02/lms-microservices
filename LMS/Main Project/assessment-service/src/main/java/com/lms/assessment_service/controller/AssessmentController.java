package com.lms.assessment_service.controller;

import com.lms.assessment_service.entity.Assessment;
import com.lms.assessment_service.entity.AssessmentSubmission;
import com.lms.assessment_service.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return assessmentService.createAssessment(assessment);
    }

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.getAllAssessments();
    }

    @GetMapping("/{id}")
    public Assessment getAssessmentById(@PathVariable Long id) {
        return assessmentService.getAssessmentById(id);
    }

    @GetMapping("/course/{courseId}")
    public List<Assessment> getAssessmentsByCourse(@PathVariable Long courseId) {
        return assessmentService.getAssessmentsByCourse(courseId);
    }

    @GetMapping("/instructor/{instructorId}")
    public List<Assessment> getAssessmentsByInstructor(@PathVariable Long instructorId) {
        return assessmentService.getAssessmentsByInstructor(instructorId);
    }

    @PutMapping("/{id}")
    public Assessment updateAssessment(@PathVariable Long id, @RequestBody Assessment assessment) {
        return assessmentService.updateAssessment(id, assessment);
    }

    @DeleteMapping("/{id}")
    public String deleteAssessment(@PathVariable Long id) {
        assessmentService.deleteAssessment(id);
        return "Assessment deleted successfully";
    }
    
    @PostMapping("/submit")
    public AssessmentSubmission submitAssessment(@RequestBody AssessmentSubmission submission) {
        submission.setStatus("COMPLETED");
        return assessmentService.submitAssessment(submission);
    }
    
    @GetMapping("/completed/{assessmentId}/{studentId}")
    public boolean isAssessmentCompleted(@PathVariable Long assessmentId, @PathVariable Long studentId) {
        return assessmentService.isAssessmentCompleted(assessmentId, studentId);
    }
}