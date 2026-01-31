// Панель управления для инструкторов

// Используем глобальную конфигурацию из config.js

// Проверка авторизации
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!token || !user || user.role !== 'instructor') {
        alert('Доступ только для инструкторов');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Загрузка курсов инструктора
async function loadMyCourses() {
    if (!checkAuth()) return;

    const token = localStorage.getItem('token');

    try {
        // Получаем все курсы и фильтруем по инструктору на клиенте
        // Или можно создать отдельный эндпоинт /api/courses/instructor/my-courses
        const response = await fetch(`${window.API_BASE_URL}/courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки курсов');
        }

        const courses = await response.json();
        const user = JSON.parse(localStorage.getItem('user'));
        const myCourses = courses.filter(course => 
            course.instructor?._id === user.id || course.instructor?._id === user._id
        );
        
        displayMyCourses(myCourses);
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('myCoursesContainer').innerHTML = 
            '<p class="error-message">Ошибка загрузки курсов</p>';
    }
}

// Отображение курсов инструктора
function displayMyCourses(courses) {
    const container = document.getElementById('myCoursesContainer');
    
    if (!courses || courses.length === 0) {
        container.innerHTML = '<p>У вас пока нет курсов</p>';
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p class="description">${course.description}</p>
            <p class="price">${course.price} ₽</p>
            <p class="lessons-count">Уроков: ${course.lessons?.length || 0}</p>
            <button class="btn btn-primary" onclick="addLesson('${course._id}')">
                Добавить урок
            </button>
            <button class="btn btn-danger" onclick="deleteCourse('${course._id}')" style="margin-top: 0.5rem;">
                Удалить курс
            </button>
        </div>
    `).join('');
}

// Создание курса
document.getElementById('createCourseForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!checkAuth()) return;

    const token = localStorage.getItem('token');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, price })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Курс успешно создан!');
            document.getElementById('createCourseForm').reset();
            loadMyCourses();
            loadStats();
        } else {
            document.getElementById('errorMessage').textContent = 
                data.error || 'Ошибка создания курса';
        }
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('errorMessage').textContent = 
            'Ошибка соединения с сервером';
    }
});

// Добавление урока
async function addLesson(courseId) {
    const title = prompt('Название урока:');
    if (!title) return;

    const content = prompt('Содержание урока:');
    if (!content) return;

    const duration = parseInt(prompt('Длительность урока (в минутах):'));
    if (!duration || isNaN(duration)) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses/${courseId}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, duration })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Урок успешно добавлен!');
            loadMyCourses();
        } else {
            alert(data.error || 'Ошибка добавления урока');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

// Удаление курса (динамическое удаление из DOM)
async function deleteCourse(courseId) {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Динамическое удаление из DOM без перезагрузки
            const courseCard = event.target.closest('.course-card');
            if (courseCard) {
                courseCard.style.transition = 'opacity 0.3s';
                courseCard.style.opacity = '0';
                setTimeout(() => {
                    courseCard.remove();
                    loadMyCourses(); // Перезагружаем список
                }, 300);
            }
            alert('Курс успешно удален!');
            loadStats();
        } else {
            alert(data.error || 'Ошибка удаления курса');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

// Загрузка статистики
async function loadStats() {
    if (!checkAuth()) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${window.API_BASE_URL}/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки статистики');
        }

        const stats = await response.json();
        displayStats(stats);
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('statsContainer').innerHTML = 
            '<p class="error-message">Ошибка загрузки статистики</p>';
    }
}

// Отображение статистики
function displayStats(stats) {
    const container = document.getElementById('statsContainer');
    
    const totalStats = stats.totalStats || {};
    
    let html = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>Всего студентов</h4>
                <div class="stat-value">${totalStats.totalStudents || 0}</div>
            </div>
            <div class="stat-card">
                <h4>Общая выручка</h4>
                <div class="stat-value">${totalStats.totalRevenue || 0} ₽</div>
            </div>
            <div class="stat-card">
                <h4>Всего курсов</h4>
                <div class="stat-value">${totalStats.totalCoursesCount || 0}</div>
            </div>
        </div>
    `;

    if (stats.courseStats && stats.courseStats.length > 0) {
        html += '<h4 style="margin-top: 2rem;">Статистика по курсам:</h4>';
        html += '<div class="courses-grid">';
        html += stats.courseStats.map(course => `
            <div class="course-card">
                <h3>${course.title}</h3>
                <p>Студентов: ${course.studentCount}</p>
                <p>Выручка: ${course.revenue} ₽</p>
                <p>Инструктор: ${course.instructorName || 'Не указан'}</p>
            </div>
        `).join('');
        html += '</div>';
    }

    container.innerHTML = html;
}

// Обработка выхода
document.getElementById('logoutLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
});

// Загрузка при открытии страницы
if (document.getElementById('myCoursesContainer')) {
    loadMyCourses();
    loadStats();
}

