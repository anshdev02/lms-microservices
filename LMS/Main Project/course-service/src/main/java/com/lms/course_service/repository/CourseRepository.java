package com.lms.course_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.course_service.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByInstructorId(Long instructorId);
}
