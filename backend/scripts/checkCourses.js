// Скрипт для быстрой проверки наличия курсов в базе данных
const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

async function checkCourses() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Подключено к MongoDB\n');

    // Проверка курсов
    const coursesCount = await Course.countDocuments();
    const courses = await Course.find()
      .populate('instructor', 'name email')
      .select('title price instructor lessons');

    console.log('📚 КУРСЫ:');
    console.log(`   Всего курсов: ${coursesCount}\n`);

    if (coursesCount === 0) {
      console.log('❌ Курсы не найдены!');
      console.log('💡 Запустите скрипт заполнения: npm run seed\n');
    } else {
      courses.forEach((course, index) => {
        console.log(`${index + 1}. "${course.title}"`);
        console.log(`   💰 Цена: ${course.price} ₽`);
        console.log(`   👨‍🏫 Инструктор: ${course.instructor?.name || 'Не указан'}`);
        console.log(`   📖 Уроков: ${course.lessons?.length || 0}`);
        console.log('');
      });
    }

    // Проверка пользователей
    const usersCount = await User.countDocuments();
    const instructorsCount = await User.countDocuments({ role: 'instructor' });
    const studentsCount = await User.countDocuments({ role: 'student' });

    console.log('👥 ПОЛЬЗОВАТЕЛИ:');
    console.log(`   Всего: ${usersCount}`);
    console.log(`   Инструкторов: ${instructorsCount}`);
    console.log(`   Студентов: ${studentsCount}\n`);

    // Проверка зачислений
    const enrollmentsCount = await Enrollment.countDocuments();
    console.log('📝 ЗАЧИСЛЕНИЯ:');
    console.log(`   Всего: ${enrollmentsCount}\n`);

    // Итоговая статистика
    console.log('📊 ИТОГОВАЯ СТАТИСТИКА:');
    if (coursesCount > 0) {
      const totalLessons = courses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0);
      console.log(`   ✅ База данных заполнена`);
      console.log(`   📚 Курсов: ${coursesCount}`);
      console.log(`   📖 Всего уроков: ${totalLessons}`);
      console.log(`   👥 Пользователей: ${usersCount}`);
      console.log(`   📝 Зачислений: ${enrollmentsCount}`);
    } else {
      console.log(`   ❌ База данных пуста`);
      console.log(`   💡 Запустите: npm run seed`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error.message);
    process.exit(1);
  }
}

checkCourses();

