const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Получить все курсы
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name email')
      .select('-lessons.content'); // Не показываем полное содержание уроков в списке
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить курс по ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email');
    
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать курс (только инструктор)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, lessons } = req.body;

    // Валидация
    if (!title || !description || price === undefined) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    const course = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
      lessons: lessons || []
    });

    await course.save();
    await course.populate('instructor', 'name email');

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Обновить курс (только владелец-инструктор)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверка прав доступа
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Нет прав на редактирование этого курса' });
    }

    const { title, description, price } = req.body;
    if (title) course.title = title;
    if (description) course.description = description;
    if (price !== undefined) course.price = price;

    await course.save();
    await course.populate('instructor', 'name email');

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Удалить курс (только владелец-инструктор)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверка прав доступа
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Нет прав на удаление этого курса' });
    }

    // Удаление всех записей о зачислении на этот курс
    await Enrollment.deleteMany({ course_id: course._id });

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: 'Курс успешно удален' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Добавить урок к курсу (используя $push)
exports.addLesson = async (req, res) => {
  try {
    const { title, content, duration } = req.body;

    if (!title || !content || !duration) {
      return res.status(400).json({ error: 'Заполните все поля урока' });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверка прав доступа
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Нет прав на редактирование этого курса' });
    }

    // Использование $push для добавления урока
    await Course.findByIdAndUpdate(
      req.params.id,
      { $push: { lessons: { title, content, duration } } },
      { new: true }
    );

    const updatedCourse = await Course.findById(req.params.id)
      .populate('instructor', 'name email');

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Записаться на курс
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id;

    // Проверка существования курса
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверка, не записан ли уже студент
    const existingEnrollment = await Enrollment.findOne({
      student_id: studentId,
      course_id: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Вы уже записаны на этот курс' });
    }

    // Создание записи о зачислении
    const enrollment = new Enrollment({
      student_id: studentId,
      course_id: courseId,
      progress: 0
    });

    await enrollment.save();

    res.status(201).json({
      message: 'Вы успешно записались на курс',
      enrollment
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Обновить прогресс (используя $inc)
exports.updateProgress = async (req, res) => {
  try {
    const { increment } = req.body; // На сколько процентов увеличить прогресс
    const courseId = req.params.id;
    const studentId = req.user._id;

    // Проверка существования зачисления
    const enrollment = await Enrollment.findOne({
      student_id: studentId,
      course_id: courseId
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Вы не записаны на этот курс' });
    }

    // Использование $inc для обновления прогресса
    const updatedEnrollment = await Enrollment.findOneAndUpdate(
      { student_id: studentId, course_id: courseId },
      { $inc: { progress: increment || 1 } },
      { new: true }
    );

    // Ограничение прогресса до 100%
    if (updatedEnrollment.progress > 100) {
      updatedEnrollment.progress = 100;
      await updatedEnrollment.save();
    }

    res.json(updatedEnrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Получить курсы студента
exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student_id: req.user._id })
      .populate('course_id')
      .populate({
        path: 'course_id',
        populate: { path: 'instructor', select: 'name email' }
      });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

