package com.lms.course_service.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.lms.course_service.entity.Assignment;
import com.lms.course_service.service.AssignmentService;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentService.createAssignment(assignment);
    }

    @GetMapping("/course/{courseId}")
    public List<Assignment> getAssignmentsByCourse(@PathVariable Long courseId) {
        return assignmentService.getAssignmentsByCourse(courseId);
    }

    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id);
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody Assignment assignment) {
        return assignmentService.updateAssignment(id, assignment);
    }

    @DeleteMapping("/{id}")
    public String deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return "Assignment deleted successfully";
    }
}