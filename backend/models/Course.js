const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название урока обязательно'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Содержание урока обязательно']
  },
  duration: {
    type: Number,
    required: [true, 'Длительность урока обязательна'],
    min: [1, 'Длительность должна быть минимум 1 минута']
  }
}, { _id: true });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название курса обязательно'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Описание курса обязательно']
  },
  price: {
    type: Number,
    required: [true, 'Цена курса обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Инструктор обязателен']
  },
  lessons: [lessonSchema] // Embedded документы
}, {
  timestamps: true
});

// Составной индекс для оптимизации поиска
courseSchema.index({ title: 1, instructor: 1 });

module.exports = mongoose.model('Course', courseSchema);

