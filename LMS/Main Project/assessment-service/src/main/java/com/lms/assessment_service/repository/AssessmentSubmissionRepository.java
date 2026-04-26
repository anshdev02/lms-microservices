package com.lms.assessment_service.repository;

import com.lms.assessment_service.entity.AssessmentSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssessmentSubmissionRepository extends JpaRepository<AssessmentSubmission, Long> {
    List<AssessmentSubmission> findByStudentId(Long studentId);
    boolean existsByAssessmentIdAndStudentId(Long assessmentId, Long studentId);
}