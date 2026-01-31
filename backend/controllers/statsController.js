const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const mongoose = require('mongoose');

// Агрегация: статистика по курсам
exports.getStats = async (req, res) => {
  try {
    // Агрегация для подсчета количества студентов на каждом курсе и общей выручки
    const stats = await Course.aggregate([
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course_id',
          as: 'enrollments'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          instructor: 1,
          studentCount: { $size: '$enrollments' },
          revenue: {
            $multiply: [
              { $size: '$enrollments' },
              '$price'
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'instructor',
          foreignField: '_id',
          as: 'instructorInfo'
        }
      },
      {
        $unwind: {
          path: '$instructorInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          instructorName: '$instructorInfo.name',
          studentCount: 1,
          revenue: 1
        }
      },
      {
        $sort: { studentCount: -1 }
      }
    ]);

    // Общая статистика
    const totalStats = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course_id',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: '$course'
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          totalRevenue: { $sum: '$course.price' },
          totalCourses: { $addToSet: '$course_id' }
        }
      },
      {
        $project: {
          totalStudents: 1,
          totalRevenue: 1,
          totalCoursesCount: { $size: '$totalCourses' }
        }
      }
    ]);

    res.json({
      courseStats: stats,
      totalStats: totalStats[0] || {
        totalStudents: 0,
        totalRevenue: 0,
        totalCoursesCount: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

