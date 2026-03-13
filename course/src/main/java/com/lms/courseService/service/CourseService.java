package com.lms.courseService.service;

import java.util.List;
import com.lms.courseService.entity.Course;

public interface CourseService {

    Course saveCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseById(Long id);
}
