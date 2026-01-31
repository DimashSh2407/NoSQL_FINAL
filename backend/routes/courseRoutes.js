const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

// Публичные маршруты
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Защищенные маршруты
router.post('/', authenticate, authorize('instructor'), courseController.createCourse);
router.patch('/:id', authenticate, authorize('instructor'), courseController.updateCourse);
router.delete('/:id', authenticate, authorize('instructor'), courseController.deleteCourse);
router.post('/:id/lessons', authenticate, authorize('instructor'), courseController.addLesson);

// Маршруты для студентов
router.post('/:id/enroll', authenticate, authorize('student'), courseController.enrollInCourse);
router.patch('/:id/progress', authenticate, authorize('student'), courseController.updateProgress);
router.get('/student/my-courses', authenticate, authorize('student'), courseController.getMyCourses);

module.exports = router;

