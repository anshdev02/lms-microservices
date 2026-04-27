package com.lms.enrollment_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.enrollment_service.entity.Enrollment;
import com.lms.enrollment_service.service.EnrollmentService;

@RestController
@RequestMapping("/enroll")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // STUDENT: Enroll in course
    @PostMapping
    public Enrollment enroll(@RequestParam Long studentId,
                             @RequestParam Long courseId) {
        return enrollmentService.enrollStudent(studentId, courseId);
    }

    // STUDENT: View enrolled courses
    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentService.getEnrollmentsByStudent(studentId);
    }

    // INSTRUCTOR / ADMIN: View enrolled students
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return enrollmentService.getEnrollmentsByCourse(courseId);
    }
}
