export interface Assignment {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  courseId: number;
}

export interface Course {
  id?: number;
  title: string;
  description: string;
  instructorId: number;
  duration: string;
  content?: string;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  completionPercentage?: number;
  course?: Course;
  student?: User;
}

export interface User {
  id?: number;
  userId?: number;
  username: string;
  role: string;
  password?: string;
}