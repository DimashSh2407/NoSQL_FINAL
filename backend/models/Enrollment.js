const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID студента обязателен']
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'ID курса обязателен']
  },
  progress: {
    type: Number,
    default: 0,
    min: [0, 'Прогресс не может быть отрицательным'],
    max: [100, 'Прогресс не может быть больше 100']
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Уникальный индекс: один студент может быть зачислен на курс только один раз
enrollmentSchema.index({ student_id: 1, course_id: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);

