// Скрипт для очистки базы данных (только для разработки/тестирования)
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

async function clearDatabase() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Подключено к MongoDB');

    // Удаление всех данных
    await Enrollment.deleteMany({});
    console.log('✅ Удалены все зачисления');

    await Course.deleteMany({});
    console.log('✅ Удалены все курсы');

    await User.deleteMany({});
    console.log('✅ Удалены все пользователи');

    console.log('\n🎉 База данных успешно очищена!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при очистке базы данных:', error);
    process.exit(1);
  }
}

clearDatabase();


