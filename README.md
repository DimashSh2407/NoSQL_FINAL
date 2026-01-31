# Online Course Platform

A full-featured online course platform built with **Vanilla JavaScript, Node.js, and MongoDB**.

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (fetch API)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Project Structure

```
/online-course-platform
│
├── /backend
│   ├── /models          # MongoDB schemas (Mongoose)
│   │   ├── User.js      # User model
│   │   ├── Course.js    # Course model
│   │   └── Enrollment.js # Enrollment model
│   ├── /controllers     # Request handling logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── statsController.js
│   ├── /routes          # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   └── statsRoutes.js
│   ├── /middleware      # Authentication and role checking
│   │   └── auth.js
│   └── server.js        # Backend entry point
│
├── /frontend
│   ├── /css             # Page styles
│   │   └── style.css
│   ├── /js              # API interaction scripts
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── course-details.js
│   │   ├── my-courses.js
│   │   ├── admin.js
│   │   └── main.js
│   ├── /pages           # HTML pages
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── course-details.html
│   │   ├── my-courses.html
│   │   └── admin.html
│   └── index.html       # Main page
│
├── .env                 # Environment variables
├── package.json
└── README.md
```

## Database Architecture (MongoDB)

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'student' | 'instructor', default: 'student')
}
```

### Course Model (Reference + Embedded)
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  instructor: ObjectId (Reference to User),
  lessons: [ // Embedded documents
    {
      title: String,
      content: String,
      duration: Number
    }
  ]
}
```
- **instructor**: Reference (relationship by ID)
- **lessons**: Embedded (array of objects within the document)
- **Index**: Compound index on `title` and `instructor` for search optimization

### Enrollment Model (Reference)
```javascript
{
  student_id: ObjectId (Reference to User),
  course_id: ObjectId (Reference to Course),
  progress: Number (0-100, default: 0),
  enrolledAt: Date
}
```
- **Unique index**: `{ student_id: 1, course_id: 1 }` - ensures a student can only be enrolled in a course once

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Authenticated |

### Courses (`/api/courses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | Get all courses | Public |
| GET | `/api/courses/:id` | Get course by ID | Public |
| POST | `/api/courses` | Create course | Instructor |
| PATCH | `/api/courses/:id` | Update course | Instructor (owner) |
| DELETE | `/api/courses/:id` | Delete course | Instructor (owner) |
| POST | `/api/courses/:id/lessons` | Add lesson (uses `$push`) | Instructor (owner) |
| POST | `/api/courses/:id/enroll` | Enroll in course | Student |
| PATCH | `/api/courses/:id/progress` | Update progress (uses `$inc`) | Student |
| GET | `/api/courses/student/my-courses` | Get student's courses | Student |

### Statistics (`/api/stats`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/stats` | Course statistics (aggregation) | Instructor |

**Aggregation includes:**
- Number of students per course
- Total revenue per course
- Overall statistics (total students, revenue, courses)

## Main Features

### For Students:
- Registration and login
- Browse all available courses
- Enroll in courses
- View enrolled courses
- Track learning progress
- Update progress (demonstrates `$inc` operator)

### For Instructors:
- Registration and login
- Create courses
- Add lessons to courses (demonstrates `$push` operator)
- Edit and delete own courses
- View statistics (MongoDB aggregation)
- Dynamic course deletion from DOM without page reload

## Security

- **Password hashing**: Uses bcryptjs
- **JWT tokens**: For authentication and authorization
- **Data validation**: Backend validation before saving
- **Access control**: Middleware for role and ownership verification

## Optimization

- **MongoDB indexes**: 
  - Compound index on `Course.title` and `Course.instructor`
  - Unique index on `Enrollment.student_id` and `Enrollment.course_id`
- **Query optimization**: Using `populate()` for relationships

## MongoDB Features Demonstration

1. **Embedded documents**: Lessons (`lessons`) are embedded within the course document
2. **Reference documents**: Relationships `instructor`, `student_id`, `course_id` via ObjectId
3. **MongoDB operators**:
   - `$push` - adding a lesson to an array
   - `$inc` - incrementing progress
4. **Aggregation**: Complex queries for statistics using `$lookup`, `$group`, `$project`

## API Usage Examples

### Student Registration:
```javascript
POST /api/auth/register
{
  "name": "Aliya Nurzhan",
  "email": "aliya@example.com",
  "password": "password123",
  "role": "student"
}
```

### Create Course (requires instructor token):
```javascript
POST /api/courses
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "JavaScript for Beginners",
  "description": "Learn JavaScript fundamentals",
  "price": 15000
}
```

### Add Lesson:
```javascript
POST /api/courses/:id/lessons
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Introduction to Variables",
  "content": "Variables are used to store data...",
  "duration": 30
}
```

### Update Progress:
```javascript
PATCH /api/courses/:id/progress
Headers: { "Authorization": "Bearer <token>" }
{
  "increment": 10
}
```

## Database Seeding

To populate the database with sample data that mimics a real LMS system, use the seeding script:

```bash
npm run seed
```

**What gets created:**
- 10 instructors with ready accounts
- 20 students with enrollment examples
- 20 full courses with lessons (over 100 lessons total)
- 40-60 enrollment examples with progress tracking

**Sample credentials:**
- Instructors: `aidar.nurlan@lms.com`, `aizhan.kuanysh@lms.com`, `daniyar.askar@lms.com` (password: `instructor123`)
- Students: `aliya.student@lms.com`, `asel.student@lms.com` (password: `student123`)

**Clear database:**
```bash
npm run clear-db
```

**Check courses:**
```bash
npm run check-courses
```
This command will show the number of courses, users, and enrollments in the database.

## Troubleshooting

**Courses not showing after registration:**
- Run the database seeding script: `npm run seed`
- This will create initial data (courses, instructors, students)

**MongoDB connection error:**
- Make sure MongoDB is running
- Check the URI in `.env`

**CORS error:**
- CORS is configured for all origins (limit in production)

**Token not working:**
- Check that the token is saved in localStorage
- Make sure JWT_SECRET is set in `.env`

## License

ISC

## Authors

This project was created as part of a NoSQL databases course assignment.

### Project Contributors:

**Student 1:**
- Backend architecture development (Express.js, MongoDB, Mongoose)
- REST API endpoints implementation (13 endpoints)
- Data models creation (User, Course, Enrollment)
- Authentication and authorization implementation (JWT, bcrypt)
- Aggregation queries development for statistics
- Query optimization using indexes
- Advanced operations implementation ($push, $inc, deleteMany)
- Documentation writing (README.md, API documentation)

**Student 2:**
- Frontend interface development (Vanilla JavaScript, HTML5, CSS3)
- All 6 application pages creation
- REST API interaction implementation via Fetch API
- Modern futuristic design development
- CRUD operations implementation on frontend
- Database seeding and checking scripts creation
- Functionality testing and bug fixes
- User experience (UX) improvements
