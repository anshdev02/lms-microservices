package com.lms.assessment_service.service;

import com.lms.assessment_service.entity.Assessment;
import com.lms.assessment_service.entity.AssessmentSubmission;
import com.lms.assessment_service.repository.AssessmentRepository;
import com.lms.assessment_service.repository.AssessmentSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;
    
    @Autowired
    private AssessmentSubmissionRepository submissionRepository;

    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public Assessment getAssessmentById(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
    }

    public List<Assessment> getAssessmentsByCourse(Long courseId) {
        return assessmentRepository.findByCourseId(courseId);
    }

    public List<Assessment> getAssessmentsByInstructor(Long instructorId) {
        return assessmentRepository.findByInstructorId(instructorId);
    }

    public Assessment updateAssessment(Long id, Assessment updatedAssessment) {
        Assessment assessment = getAssessmentById(id);
        assessment.setTitle(updatedAssessment.getTitle());
        assessment.setDescription(updatedAssessment.getDescription());
        assessment.setQuestions(updatedAssessment.getQuestions());
        return assessmentRepository.save(assessment);
    }

    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }
    
    public AssessmentSubmission submitAssessment(AssessmentSubmission submission) {
        return submissionRepository.save(submission);
    }
    
    public boolean isAssessmentCompleted(Long assessmentId, Long studentId) {
        return submissionRepository.existsByAssessmentIdAndStudentId(assessmentId, studentId);
    }
}