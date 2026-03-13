package com.lms.courseService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.courseService.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
