// Мои курсы (для студентов)

// Используем глобальную конфигурацию из config.js

// Проверка авторизации
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!token || !user || user.role !== 'student') {
        alert('Доступ только для студентов');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Загрузка курсов студента
async function loadMyCourses() {
    if (!checkAuth()) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses/student/my-courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки курсов');
        }

        const enrollments = await response.json();
        displayMyCourses(enrollments);
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('myCoursesContainer').innerHTML = 
            '<p class="error-message">Ошибка загрузки курсов</p>';
    }
}

// Отображение курсов студента
function displayMyCourses(enrollments) {
    const container = document.getElementById('myCoursesContainer');
    
    if (!enrollments || enrollments.length === 0) {
        container.innerHTML = '<p>Вы еще не записаны ни на один курс</p>';
        return;
    }

    container.innerHTML = enrollments.map(enrollment => {
        const course = enrollment.course_id;
        const progress = enrollment.progress || 0;
        
        return `
            <div class="course-card">
                <h3>${course.title}</h3>
                <p class="instructor">Instructor: ${course.instructor?.name || 'Not specified'}</p>
                <p class="description">${course.description}</p>
                <div class="progress-section">
                    <p>Прогресс: ${progress}%</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="viewCourseDetails('${course._id}')">
                    Продолжить обучение
                </button>
                <button class="btn btn-success" onclick="updateProgress('${course._id}', 10)" style="margin-top: 0.5rem;">
                    +10% прогресса
                </button>
            </div>
        `;
    }).join('');
}

// Просмотр деталей курса
function viewCourseDetails(courseId) {
    window.location.href = `course-details.html?id=${courseId}`;
}

// Обновление прогресса
async function updateProgress(courseId, increment) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses/${courseId}/progress`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ increment })
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Прогресс обновлен! Текущий прогресс: ${data.progress}%`);
            loadMyCourses(); // Перезагружаем список
        } else {
            alert(data.error || 'Ошибка обновления прогресса');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
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
}

