package com.lms.course_service.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lms.course_service.entity.Assignment;
import com.lms.course_service.repository.AssignmentRepository;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
    }

    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        Assignment assignment = getAssignmentById(id);
        assignment.setTitle(updatedAssignment.getTitle());
        assignment.setDescription(updatedAssignment.getDescription());
        assignment.setDueDate(updatedAssignment.getDueDate());
        assignment.setMaxPoints(updatedAssignment.getMaxPoints());
        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}