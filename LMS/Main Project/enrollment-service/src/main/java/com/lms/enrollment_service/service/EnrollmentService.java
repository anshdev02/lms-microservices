package com.lms.enrollment_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.enrollment_service.entity.Enrollment;
import com.lms.enrollment_service.repository.EnrollmentRepository;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    // Enroll student
    public Enrollment enrollStudent(Long studentId, Long courseId) {
        // Check if already enrolled
        return enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElseGet(() -> {
                    Enrollment enrollment = new Enrollment();
                    enrollment.setStudentId(studentId);
                    enrollment.setCourseId(courseId);
                    return enrollmentRepository.save(enrollment);
                });
    }

    // Get courses by student
    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    // Get students by course
    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
}
