// Скрипт для заполнения базы данных начальными данными (имитация реальной LMS)
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

async function seedDatabase() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Подключено к MongoDB');

    // Очистка существующих данных (опционально)
    console.log('🧹 Очистка существующих данных...');
    await Enrollment.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});
    console.log('✅ База данных очищена');

    // Создание инструкторов (казахские имена на английском)
    console.log('\n👨‍🏫 Создание инструкторов...');
    const instructors = [
      {
        name: 'Aidar Nurlan',
        email: 'aidar.nurlan@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Aizhan Kuanysh',
        email: 'aizhan.kuanysh@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Daniyar Askar',
        email: 'daniyar.askar@lms.com',
        password: 'instructor123',
        role: 'instructor'
      }
    ];

    const createdInstructors = [];
    for (const instructorData of instructors) {
      const instructor = new User(instructorData);
      await instructor.save();
      createdInstructors.push(instructor);
      console.log(`✅ Создан инструктор: ${instructor.name}`);
    }

    // Создание студентов (казахские имена на английском)
    console.log('\n👨‍🎓 Создание студентов...');
    const students = [
      {
        name: 'Aliya Nurzhan',
        email: 'aliya.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Asel Temir',
        email: 'asel.student@lms.com',
        password: 'student123',
        role: 'student'
      }
    ];

    const createdStudents = [];
    for (const studentData of students) {
      const student = new User(studentData);
      await student.save();
      createdStudents.push(student);
      console.log(`✅ Создан студент: ${student.name}`);
    }

    // Создание курсов с уроками (описания на английском, цены в тенге)
    console.log('\n📚 Создание курсов...');
    
    const coursesData = [
      {
        title: 'JavaScript for Beginners',
        description: 'Complete course on JavaScript fundamentals. Learn variables, functions, objects and much more. Perfect for those just starting their programming journey.',
        price: 15000, // тенге (примерно 2999 * 5)
        instructor: createdInstructors[0]._id,
        lessons: [
          {
            title: 'Introduction to JavaScript',
            content: 'In this lesson you will learn what JavaScript is, its history and main features. We will explore how JavaScript is used in web development and why it is so popular.',
            duration: 45
          },
          {
            title: 'Variables and Data Types',
            content: 'Learn the basics of working with variables in JavaScript. Discover different data types: numbers, strings, booleans, objects and arrays. Practical examples will help reinforce the material.',
            duration: 60
          },
          {
            title: 'Functions in JavaScript',
            content: 'Functions are the foundation of JavaScript. In this lesson you will learn to create functions, pass parameters, use return values and work with closures.',
            duration: 75
          },
          {
            title: 'Working with DOM',
            content: 'Learn how JavaScript interacts with HTML documents. Master finding elements, changing their content, adding event handlers and creating dynamic interfaces.',
            duration: 90
          },
          {
            title: 'Asynchronous JavaScript',
            content: 'Study Promises, async/await and working with asynchronous code. Learn how to make HTTP requests, work with timers and handle errors in asynchronous operations.',
            duration: 80
          }
        ]
      },
      {
        title: 'Python: From Basics to Advanced',
        description: 'Comprehensive Python course for all levels. From basic syntax to working with databases and web frameworks. Practical projects included.',
        price: 20000, // тенге
        instructor: createdInstructors[1]._id,
        lessons: [
          {
            title: 'Python Installation and Setup',
            content: 'Start by installing Python on your system. Learn about different Python versions, installing packages via pip and setting up virtual environments for project isolation.',
            duration: 30
          },
          {
            title: 'Python Syntax Basics',
            content: 'Learn basic Python syntax: variables, operators, conditionals, loops. Discover Python philosophy and its features compared to other languages.',
            duration: 50
          },
          {
            title: 'Working with Collections',
            content: 'Deep dive into lists, tuples, dictionaries and sets. Learn about collection methods, list comprehensions and efficient data processing techniques.',
            duration: 65
          },
          {
            title: 'Object-Oriented Programming',
            content: 'Study classes, objects, inheritance, polymorphism and encapsulation in Python. Learn to create custom classes and use built-in language features.',
            duration: 90
          },
          {
            title: 'File Handling and Databases',
            content: 'Learn to read and write files, work with CSV and JSON. Study database basics through SQLite and the sqlite3 library.',
            duration: 70
          },
          {
            title: 'Web Development with Flask',
            content: 'Create your first web application with Flask. Learn about routing, templates, forms and database work in web context.',
            duration: 100
          }
        ]
      },
      {
        title: 'Web Design and UI/UX',
        description: 'Modern web design course. Learn UI/UX principles, color work, typography, creating responsive layouts and using modern design tools.',
        price: 17500, // тенге
        instructor: createdInstructors[2]._id,
        lessons: [
          {
            title: 'Web Design Fundamentals',
            content: 'Introduction to web design: composition principles, working with space, element balance. Learn about the difference between UI and UX and their importance for successful products.',
            duration: 40
          },
          {
            title: 'Color in Web Design',
            content: 'Study color theory, color schemes, color psychology and its impact on users. Learn to create harmonious color palettes for websites.',
            duration: 55
          },
          {
            title: 'Typography',
            content: 'Learn about font selection, text hierarchy, readability and accessibility. Study typography rules in web design and creating effective text blocks.',
            duration: 50
          },
          {
            title: 'Responsive Design',
            content: 'Learn to create designs that look great on all devices. Study mobile-first principles, breakpoints, flexible grids and media queries.',
            duration: 75
          },
          {
            title: 'Designer Tools',
            content: 'Overview of modern tools: Figma, Adobe XD, Sketch. Learn to create prototypes, work with components and hand off designs to developers.',
            duration: 60
          }
        ]
      },
      {
        title: 'React: Modern Development',
        description: 'Master React - the most popular library for creating user interfaces. From components to state management and API integration.',
        price: 22500, // тенге
        instructor: createdInstructors[0]._id,
        lessons: [
          {
            title: 'Introduction to React',
            content: 'Get acquainted with React: what it is, why it is needed and how it works. Set up your development environment and create your first component.',
            duration: 45
          },
          {
            title: 'Components and JSX',
            content: 'Learn the basics of creating components, JSX syntax, props and their usage. Learn to create reusable components and structure applications.',
            duration: 60
          },
          {
            title: 'State and Hooks',
            content: 'Learn about component state, useState hook, useEffect and other important hooks. Master managing application state and handling side effects.',
            duration: 80
          },
          {
            title: 'Routing with React Router',
            content: 'Study navigation in React applications using React Router. Create a multi-page application with protected routes and dynamic parameters.',
            duration: 70
          },
          {
            title: 'Working with API',
            content: 'Learn to fetch data from APIs, handle loading and errors. Study best practices for working with asynchronous requests in React applications.',
            duration: 65
          },
          {
            title: 'State Management with Redux',
            content: 'Study Redux for managing global application state. Learn about actions, reducers, store and Redux integration with React.',
            duration: 90
          }
        ]
      },
      {
        title: 'Databases and SQL',
        description: 'Complete course on working with databases. Learn SQL, database design, normalization and working with MongoDB. Practical examples and real projects.',
        price: 19000, // тенге
        instructor: createdInstructors[1]._id,
        lessons: [
          {
            title: 'Introduction to Databases',
            content: 'Learn about database types, their advantages and disadvantages. Study basic concepts: tables, records, relationships and indexes.',
            duration: 40
          },
          {
            title: 'SQL Basics',
            content: 'Learn basic SQL commands: SELECT, INSERT, UPDATE, DELETE. Master filtering data, sorting results and using aggregate functions.',
            duration: 60
          },
          {
            title: 'JOINs and Table Relationships',
            content: 'Learn about different JOIN types: INNER, LEFT, RIGHT, FULL. Master combining data from multiple tables and working with complex queries.',
            duration: 75
          },
          {
            title: 'Database Design',
            content: 'Study the database design process: ER diagrams, normalization, data type selection. Learn to create efficient and scalable schemas.',
            duration: 80
          },
          {
            title: 'NoSQL and MongoDB',
            content: 'Get acquainted with NoSQL databases using MongoDB as an example. Learn about documents, collections, queries and aggregation. Compare SQL and NoSQL approaches.',
            duration: 70
          }
        ]
      },
      {
        title: 'Node.js and Server Development',
        description: 'Learn Node.js for creating server applications. From basics to creating REST APIs, working with databases and deploying applications.',
        price: 21500, // тенге
        instructor: createdInstructors[2]._id,
        lessons: [
          {
            title: 'Introduction to Node.js',
            content: 'Get acquainted with Node.js, its architecture and event loop. Learn about Node.js advantages for server development and set up your environment.',
            duration: 35
          },
          {
            title: 'Modules and NPM',
            content: 'Study Node.js module system, CommonJS and ES6 modules. Learn to work with NPM: install packages, create package.json and manage dependencies.',
            duration: 50
          },
          {
            title: 'Express.js and API Creation',
            content: 'Create your first server with Express.js. Study routing, middleware, request handling and creating REST API endpoints.',
            duration: 75
          },
          {
            title: 'Working with Databases',
            content: 'Learn to connect and work with MongoDB through Mongoose. Study creating models, schemas, data validation and executing queries.',
            duration: 80
          },
          {
            title: 'Authentication and Security',
            content: 'Implement authentication system with JWT tokens. Learn about password hashing, route protection, CORS and security best practices.',
            duration: 85
          },
          {
            title: 'Application Deployment',
            content: 'Study the Node.js application deployment process. Learn about hosting platforms, environment variables, logging and monitoring.',
            duration: 60
          }
        ]
      }
    ];

    const createdCourses = [];
    for (const courseData of coursesData) {
      const course = new Course(courseData);
      await course.save();
      createdCourses.push(course);
      console.log(`✅ Создан курс: "${course.title}" (${course.lessons.length} уроков)`);
    }

    // Создание зачислений (примеры)
    console.log('\n📝 Создание зачислений...');
    
    // Студент 1 записан на 2 курса
    const enrollment1 = new Enrollment({
      student_id: createdStudents[0]._id,
      course_id: createdCourses[0]._id,
      progress: 30,
      enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 дней назад
    });
    await enrollment1.save();
    console.log(`✅ ${createdStudents[0].name} записан на "${createdCourses[0].title}" (прогресс: 30%)`);

    const enrollment2 = new Enrollment({
      student_id: createdStudents[0]._id,
      course_id: createdCourses[1]._id,
      progress: 15,
      enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 дня назад
    });
    await enrollment2.save();
    console.log(`✅ ${createdStudents[0].name} записан на "${createdCourses[1].title}" (прогресс: 15%)`);

    // Студент 2 записан на 1 курс
    const enrollment3 = new Enrollment({
      student_id: createdStudents[1]._id,
      course_id: createdCourses[2]._id,
      progress: 50,
      enrolledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 дней назад
    });
    await enrollment3.save();
    console.log(`✅ ${createdStudents[1].name} записана на "${createdCourses[2].title}" (прогресс: 50%)`);

    console.log('\n🎉 База данных успешно заполнена!');
    console.log('\n📊 Статистика:');
    console.log(`   - Инструкторов: ${createdInstructors.length}`);
    console.log(`   - Студентов: ${createdStudents.length}`);
    console.log(`   - Курсов: ${createdCourses.length}`);
    console.log(`   - Всего уроков: ${createdCourses.reduce((sum, c) => sum + c.lessons.length, 0)}`);
    console.log(`   - Зачислений: 3`);
    
    console.log('\n🔑 Учетные данные для входа:');
    console.log('\n   Инструкторы:');
    instructors.forEach(inst => {
      console.log(`   - ${inst.email} / instructor123`);
    });
    console.log('\n   Студенты:');
    students.forEach(st => {
      console.log(`   - ${st.email} / student123`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
}

seedDatabase();
