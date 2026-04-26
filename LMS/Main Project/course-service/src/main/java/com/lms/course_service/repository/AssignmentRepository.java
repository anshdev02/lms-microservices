package com.lms.course_service.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.course_service.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(Long courseId);
}