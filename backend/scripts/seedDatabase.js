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

    // Очистка существующих данных
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
      },
      {
        name: 'Almat Bekzat',
        email: 'almat.bekzat@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Amina Zhanar',
        email: 'amina.zhanar@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Bekzhan Talgat',
        email: 'bekzhan.talgat@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Dana Aigerim',
        email: 'dana.aigerim@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Erasyl Nurzhan',
        email: 'erasyl.nurzhan@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Gulnara Aizhan',
        email: 'gulnara.aizhan@lms.com',
        password: 'instructor123',
        role: 'instructor'
      },
      {
        name: 'Kairat Marat',
        email: 'kairat.marat@lms.com',
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
      },
      {
        name: 'Aruzhan Damir',
        email: 'aruzhan.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Bekzat Alibek',
        email: 'bekzat.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Dana Zhanar',
        email: 'dana.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Erasyl Kuanysh',
        email: 'erasyl.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Gulnaz Aigerim',
        email: 'gulnaz.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Kairat Nurlan',
        email: 'kairat.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Madina Aliya',
        email: 'madina.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Nurzhan Askar',
        email: 'nurzhan.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Ruslan Talgat',
        email: 'ruslan.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Saltanat Aizhan',
        email: 'saltanat.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Talgat Marat',
        email: 'talgat.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Zhanar Aliya',
        email: 'zhanar.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Aigerim Dana',
        email: 'aigerim.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Bekzhan Erasyl',
        email: 'bekzhan.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Damir Kairat',
        email: 'damir.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Gulmira Aizhan',
        email: 'gulmira.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Marat Nurzhan',
        email: 'marat.student@lms.com',
        password: 'student123',
        role: 'student'
      },
      {
        name: 'Nazira Aliya',
        email: 'nazira.student@lms.com',
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
        price: 15000,
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
        price: 20000,
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
        price: 17500,
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
        price: 22500,
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
        price: 19000,
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
        price: 21500,
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
      },
      {
        title: 'Vue.js: Progressive Framework',
        description: 'Learn Vue.js from scratch. Build modern, reactive web applications with Vue 3, Composition API, and ecosystem tools.',
        price: 19500,
        instructor: createdInstructors[3]._id,
        lessons: [
          {
            title: 'Vue.js Basics',
            content: 'Introduction to Vue.js framework. Learn about reactive data, templates, directives and component structure.',
            duration: 50
          },
          {
            title: 'Components and Props',
            content: 'Master component creation, props passing, events and component communication in Vue.js applications.',
            duration: 65
          },
          {
            title: 'Vue Router',
            content: 'Learn navigation in Vue applications using Vue Router. Create single-page applications with routing.',
            duration: 70
          },
          {
            title: 'State Management with Vuex',
            content: 'Study Vuex for managing application state. Learn about store, mutations, actions and getters.',
            duration: 75
          }
        ]
      },
      {
        title: 'Angular: Enterprise Framework',
        description: 'Master Angular for building large-scale applications. Learn TypeScript, components, services, and Angular best practices.',
        price: 24000,
        instructor: createdInstructors[4]._id,
        lessons: [
          {
            title: 'Angular Fundamentals',
            content: 'Get started with Angular framework. Learn about components, modules, services and dependency injection.',
            duration: 60
          },
          {
            title: 'TypeScript for Angular',
            content: 'Master TypeScript basics needed for Angular development. Learn about types, interfaces, classes and decorators.',
            duration: 70
          },
          {
            title: 'Angular Services and HTTP',
            content: 'Learn to create services, make HTTP requests, handle responses and work with RxJS observables.',
            duration: 80
          },
          {
            title: 'Angular Routing',
            content: 'Study Angular Router for navigation. Learn about routes, guards, lazy loading and route parameters.',
            duration: 75
          }
        ]
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile applications using React Native. Learn to create native apps for iOS and Android.',
        price: 26000,
        instructor: createdInstructors[5]._id,
        lessons: [
          {
            title: 'React Native Setup',
            content: 'Set up development environment for React Native. Learn about Expo, CLI tools and running apps on devices.',
            duration: 45
          },
          {
            title: 'Components and Styling',
            content: 'Learn React Native components, styling with StyleSheet, Flexbox layout and responsive design.',
            duration: 70
          },
          {
            title: 'Navigation and State',
            content: 'Implement navigation with React Navigation. Manage app state and handle user interactions.',
            duration: 80
          },
          {
            title: 'API Integration',
            content: 'Connect your app to backend APIs. Handle authentication, data fetching and error management.',
            duration: 75
          }
        ]
      },
      {
        title: 'Machine Learning with Python',
        description: 'Introduction to machine learning using Python. Learn data preprocessing, model training, and evaluation techniques.',
        price: 28000,
        instructor: createdInstructors[6]._id,
        lessons: [
          {
            title: 'ML Fundamentals',
            content: 'Introduction to machine learning concepts: supervised and unsupervised learning, training and testing.',
            duration: 60
          },
          {
            title: 'Data Preprocessing',
            content: 'Learn to clean, transform and prepare data for machine learning models using pandas and scikit-learn.',
            duration: 75
          },
          {
            title: 'Regression Models',
            content: 'Study linear and polynomial regression. Learn to build and evaluate regression models.',
            duration: 80
          },
          {
            title: 'Classification Models',
            content: 'Master classification algorithms: logistic regression, decision trees, random forests and SVM.',
            duration: 85
          }
        ]
      },
      {
        title: 'Docker and Containerization',
        description: 'Learn Docker for containerizing applications. Master Docker Compose, images, containers and deployment strategies.',
        price: 18000,
        instructor: createdInstructors[7]._id,
        lessons: [
          {
            title: 'Docker Basics',
            content: 'Introduction to Docker, containers and images. Learn Docker commands and basic operations.',
            duration: 50
          },
          {
            title: 'Dockerfile and Images',
            content: 'Create custom Docker images using Dockerfile. Learn best practices for image optimization.',
            duration: 65
          },
          {
            title: 'Docker Compose',
            content: 'Orchestrate multi-container applications with Docker Compose. Learn about services, networks and volumes.',
            duration: 70
          },
          {
            title: 'Deployment with Docker',
            content: 'Deploy containerized applications. Learn about Docker Hub, registries and production deployment.',
            duration: 60
          }
        ]
      },
      {
        title: 'GraphQL: Modern API Development',
        description: 'Master GraphQL for building flexible APIs. Learn queries, mutations, subscriptions and schema design.',
        price: 20000,
        instructor: createdInstructors[8]._id,
        lessons: [
          {
            title: 'GraphQL Introduction',
            content: 'Learn GraphQL fundamentals: queries, mutations, schema and type system. Compare with REST API.',
            duration: 55
          },
          {
            title: 'Schema Design',
            content: 'Design GraphQL schemas. Learn about types, fields, arguments and relationships between types.',
            duration: 70
          },
          {
            title: 'Resolvers and Data Fetching',
            content: 'Implement GraphQL resolvers. Learn to fetch data from databases and external APIs.',
            duration: 75
          },
          {
            title: 'Advanced GraphQL',
            content: 'Study subscriptions, directives, fragments and advanced GraphQL features for real-time applications.',
            duration: 80
          }
        ]
      },
      {
        title: 'AWS Cloud Services',
        description: 'Learn Amazon Web Services for cloud computing. Master EC2, S3, Lambda, and other AWS services.',
        price: 30000,
        instructor: createdInstructors[9]._id,
        lessons: [
          {
            title: 'AWS Fundamentals',
            content: 'Introduction to AWS cloud platform. Learn about regions, availability zones and core services.',
            duration: 60
          },
          {
            title: 'EC2 and Compute Services',
            content: 'Work with EC2 instances, auto-scaling, load balancing and compute services in AWS.',
            duration: 80
          },
          {
            title: 'S3 and Storage',
            content: 'Master S3 for object storage. Learn about buckets, permissions, versioning and lifecycle policies.',
            duration: 70
          },
          {
            title: 'Lambda and Serverless',
            content: 'Build serverless applications with AWS Lambda. Learn about functions, triggers and event-driven architecture.',
            duration: 75
          }
        ]
      },
      {
        title: 'Cybersecurity Fundamentals',
        description: 'Learn cybersecurity basics: threats, vulnerabilities, encryption, and security best practices for developers.',
        price: 22000,
        instructor: createdInstructors[0]._id,
        lessons: [
          {
            title: 'Security Threats',
            content: 'Understand common security threats: SQL injection, XSS, CSRF, and other vulnerabilities.',
            duration: 65
          },
          {
            title: 'Encryption and Hashing',
            content: 'Learn encryption algorithms, hashing, digital signatures and secure data transmission.',
            duration: 70
          },
          {
            title: 'Authentication and Authorization',
            content: 'Implement secure authentication systems. Learn about OAuth, JWT, and access control.',
            duration: 75
          },
          {
            title: 'Security Best Practices',
            content: 'Study security best practices for application development and deployment.',
            duration: 60
          }
        ]
      },
      {
        title: 'DevOps and CI/CD',
        description: 'Master DevOps practices: continuous integration, continuous deployment, and infrastructure as code.',
        price: 25000,
        instructor: createdInstructors[1]._id,
        lessons: [
          {
            title: 'DevOps Introduction',
            content: 'Learn DevOps culture and practices. Understand CI/CD pipelines and automation.',
            duration: 55
          },
          {
            title: 'Git and Version Control',
            content: 'Master Git workflows, branching strategies, and collaborative development practices.',
            duration: 65
          },
          {
            title: 'CI/CD with Jenkins',
            content: 'Set up continuous integration and deployment pipelines using Jenkins.',
            duration: 80
          },
          {
            title: 'Infrastructure as Code',
            content: 'Learn Terraform and Ansible for managing infrastructure as code.',
            duration: 75
          }
        ]
      },
      {
        title: 'Data Science with Python',
        description: 'Comprehensive data science course covering data analysis, visualization, and statistical modeling.',
        price: 27000,
        instructor: createdInstructors[2]._id,
        lessons: [
          {
            title: 'Data Analysis with Pandas',
            content: 'Master pandas for data manipulation, cleaning, and analysis. Work with DataFrames and Series.',
            duration: 70
          },
          {
            title: 'Data Visualization',
            content: 'Create compelling visualizations using Matplotlib, Seaborn, and Plotly for data storytelling.',
            duration: 65
          },
          {
            title: 'Statistical Analysis',
            content: 'Learn statistical concepts: hypothesis testing, correlation, regression analysis.',
            duration: 75
          },
          {
            title: 'Data Science Projects',
            content: 'Complete real-world data science projects from data collection to insights.',
            duration: 80
          }
        ]
      },
      {
        title: 'Blockchain Development',
        description: 'Learn blockchain technology and smart contract development using Solidity and Ethereum.',
        price: 32000,
        instructor: createdInstructors[3]._id,
        lessons: [
          {
            title: 'Blockchain Basics',
            content: 'Understand blockchain technology, distributed ledgers, and consensus mechanisms.',
            duration: 60
          },
          {
            title: 'Smart Contracts',
            content: 'Learn Solidity programming language for writing smart contracts on Ethereum.',
            duration: 85
          },
          {
            title: 'DApp Development',
            content: 'Build decentralized applications (DApps) using Web3.js and interact with blockchain.',
            duration: 90
          },
          {
            title: 'DeFi and NFTs',
            content: 'Explore DeFi protocols and NFT development. Learn about token standards and marketplaces.',
            duration: 75
          }
        ]
      },
      {
        title: 'iOS Development with Swift',
        description: 'Build native iOS applications using Swift and SwiftUI. Learn Apple development ecosystem.',
        price: 29000,
        instructor: createdInstructors[4]._id,
        lessons: [
          {
            title: 'Swift Fundamentals',
            content: 'Learn Swift programming language: syntax, types, functions, and object-oriented programming.',
            duration: 70
          },
          {
            title: 'SwiftUI Basics',
            content: 'Master SwiftUI for building modern iOS interfaces. Learn views, modifiers, and state management.',
            duration: 75
          },
          {
            title: 'iOS App Architecture',
            content: 'Design iOS app architecture. Learn about MVVM pattern, data flow, and app lifecycle.',
            duration: 80
          },
          {
            title: 'Core Data and Persistence',
            content: 'Implement data persistence using Core Data. Learn about data models and relationships.',
            duration: 70
          }
        ]
      },
      {
        title: 'Android Development with Kotlin',
        description: 'Create Android applications using Kotlin and Jetpack Compose. Master modern Android development.',
        price: 27500,
        instructor: createdInstructors[5]._id,
        lessons: [
          {
            title: 'Kotlin Basics',
            content: 'Learn Kotlin programming language: syntax, null safety, coroutines, and functional programming.',
            duration: 65
          },
          {
            title: 'Jetpack Compose',
            content: 'Build modern Android UIs with Jetpack Compose. Learn composables, state, and navigation.',
            duration: 80
          },
          {
            title: 'Android Architecture',
            content: 'Design Android app architecture using MVVM, LiveData, ViewModel, and Room database.',
            duration: 75
          },
          {
            title: 'Android Services and APIs',
            content: 'Work with Android services, background tasks, and integrate REST APIs in Android apps.',
            duration: 70
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

    // Создание зачислений (реалистичное распределение)
    console.log('\n📝 Создание зачислений...');
    
    const enrollments = [];
    const now = Date.now();
    
    // Функция для случайного выбора элемента из массива
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Каждый студент записывается на 2-4 курса
    for (const student of createdStudents) {
      const numEnrollments = randomInt(2, 4);
      const selectedCourses = [];
      
      // Выбираем случайные курсы
      while (selectedCourses.length < numEnrollments) {
        const course = randomItem(createdCourses);
        if (!selectedCourses.find(c => c._id.toString() === course._id.toString())) {
          selectedCourses.push(course);
        }
      }
      
      // Создаем зачисления с разным прогрессом и датами
      for (const course of selectedCourses) {
        const daysAgo = randomInt(1, 60); // От 1 до 60 дней назад
        const progress = randomInt(0, 85); // Прогресс от 0 до 85%
        
        enrollments.push({
          student_id: student._id,
          course_id: course._id,
          progress: progress,
          enrolledAt: new Date(now - daysAgo * 24 * 60 * 60 * 1000)
        });
      }
    }
    
    // Сохраняем все зачисления
    for (const enrollmentData of enrollments) {
      try {
        const enrollment = new Enrollment(enrollmentData);
        await enrollment.save();
        const student = createdStudents.find(s => s._id.toString() === enrollmentData.student_id.toString());
        const course = createdCourses.find(c => c._id.toString() === enrollmentData.course_id.toString());
        console.log(`✅ ${student.name} записан на "${course.title}" (прогресс: ${enrollmentData.progress}%)`);
      } catch (error) {
        // Игнорируем дубликаты (уникальный индекс)
        if (error.code !== 11000) {
          console.error(`❌ Ошибка при создании зачисления: ${error.message}`);
        }
      }
    }

    console.log('\n🎉 База данных успешно заполнена!');
    console.log('\n📊 Статистика:');
    console.log(`   - Инструкторов: ${createdInstructors.length}`);
    console.log(`   - Студентов: ${createdStudents.length}`);
    console.log(`   - Курсов: ${createdCourses.length}`);
    console.log(`   - Всего уроков: ${createdCourses.reduce((sum, c) => sum + c.lessons.length, 0)}`);
    console.log(`   - Зачислений: ${enrollments.length}`);
    
    console.log('\n🔑 Учетные данные для входа:');
    console.log('\n   Инструкторы (первые 3):');
    instructors.slice(0, 3).forEach(inst => {
      console.log(`   - ${inst.email} / instructor123`);
    });
    console.log('\n   Студенты (первые 3):');
    students.slice(0, 3).forEach(st => {
      console.log(`   - ${st.email} / student123`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
}

seedDatabase();
