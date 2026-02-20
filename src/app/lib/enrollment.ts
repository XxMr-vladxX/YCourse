// lib/enrollment.ts
// Maneja la lógica de inscripción a cursos usando localStorage
// Cuando tengas backend, reemplaza las funciones con llamadas a tu API

export interface EnrollmentData {
  [courseId: number]: {
    enrolledAt: string;
    completedLessons: number[];
  };
}

const STORAGE_KEY = 'ycourse_enrollments';

export function getEnrolledCourses(): EnrollmentData {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function getEnrolledCourseIds(): number[] {
  const data = getEnrolledCourses();
  return Object.keys(data).map(Number);
}

export function isEnrolled(courseId: number): boolean {
  const data = getEnrolledCourses();
  return !!data[courseId];
}

export function enrollCourse(courseId: number): void {
  const data = getEnrolledCourses();
  if (!data[courseId]) {
    data[courseId] = {
      enrolledAt: new Date().toISOString(),
      completedLessons: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function toggleLessonComplete(courseId: number, lessonId: number): void {
  const data = getEnrolledCourses();
  if (!data[courseId]) return;

  const completed = data[courseId].completedLessons;
  const index = completed.indexOf(lessonId);

  if (index === -1) {
    completed.push(lessonId);
  } else {
    completed.splice(index, 1);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isLessonCompleted(courseId: number, lessonId: number): boolean {
  const data = getEnrolledCourses();
  if (!data[courseId]) return false;
  return data[courseId].completedLessons.includes(lessonId);
}